import express from "express";
import { AppDataSource } from "./config/ormconfig.js";
import { ActionEntity } from "./database/entities/ActionEntity.js";
import { createProductValidation } from "./validation/createActionValidation.js";
import { validationResult } from "express-validator";
import axios from "axios";
const app = express();
app.use(express.json());
const PORT = 3001;
app.listen(PORT, async ()=>{
    await AppDataSource.initialize();
    console.log(`Server is running on http://localhost:${PORT}`);
});
app.get("/actions", async (req, res)=>{
    try {
        const { shopId, plu, startDate, endDate, action, page = 1, limit = 10 } = req.query;
        const actionRepository = AppDataSource.getRepository(ActionEntity);
        const queryBuilder = actionRepository.createQueryBuilder("action");
        if (shopId) {
            queryBuilder.andWhere("action.shopId = :shopId", {
                shopId
            });
        }
        if (startDate) {
            queryBuilder.andWhere("action.createdAt >= :startDate", {
                startDate: new Date(startDate)
            });
        }
        if (endDate) {
            queryBuilder.andWhere("action.createdAt <= :endDate", {
                endDate: new Date(endDate)
            });
        }
        if (action) {
            queryBuilder.andWhere("action.action LIKE :action", {
                action: `%${action}%`
            });
        }
        const [actions, total] = await queryBuilder.skip((page - 1) * limit).take(limit).getManyAndCount();
        const idList = [
            ...new Set(actions.map((action)=>action.productId))
        ];
        let products = [];
        for(let i = 0; i < idList.length; i++){
            if (idList[i]) {
                let data = await axios.get(`http://localhost:3000/products/${idList[i]}`).then((data)=>data.data);
                console.log(data);
                products.push(data);
            }
        }
        const sortedProducts = products.sort((a, b)=>{
            if (plu === 'desc') {
                return b.plu - a.plu; // Сортировка по убыванию
            }
            return a.plu - b.plu; // Сортировка по возрастанию
        });
        res.status(200).json({
            total,
            page,
            totalPages: Math.ceil(total / limit),
            actions,
            products
        });
    } catch (error) {
        res.status(500).json({
            message: "Ошибка при получении данных",
            error: error.message
        });
    }
});
app.post("/actions", createProductValidation, async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const repo = AppDataSource.getRepository(ActionEntity);
    res.json(await repo.save({
        action: req.body.action,
        shopId: req.body.shopId,
        productId: req.body.productId
    }));
});
