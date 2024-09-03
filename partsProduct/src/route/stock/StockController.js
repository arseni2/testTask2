import {createStockValidation} from "../../validation/createStockValidation.js";
import {createStock, DecrementStock, getWithFiltersStock, IncrementStock} from "../../service/stock/StockService.js";
import {validationResult} from "express-validator";


const CreateStock = (app) => {
    app.post("/stocks", createStockValidation, async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const stock = await createStock({
                quantityOnShelf: req.body.quantityOnShelf,
                quantityInOrder: req.body.quantityInOrder,
                product: {id: req.body.productId},
                shop: {id: req.body.shopId},
            })
            res.status(201).json(stock)
        } catch (e) {
            return res.json(e)
        }
    })
}

const getStocks = async (app) => {
    app.get("/stocks", async (req, res) => {
        return await getWithFiltersStock(req, res)
    })
}

const incrementStock = (app) => {
    app.patch("/stocks/:id/increment", async (req, res) => {
        return await IncrementStock(Number(req.params.id), req.body.quantityInOrder, req.body.quantityOnShelf, res)
    })
}
const decrementStock = (app) => {
    app.patch("/stocks/:id/decrement", async (req, res) => {
        return await DecrementStock(Number(req.params.id), req.body.quantityInOrder, req.body.quantityOnShelf, res)
    })
}

export const StockController = async (app) => {
    CreateStock(app)
    await getStocks(app)
    incrementStock(app)
    decrementStock(app)
}