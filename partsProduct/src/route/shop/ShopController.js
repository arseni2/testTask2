import {createShop} from "../../service/shop/ShopService.js";
import {createShopValidation} from "../../validation/createShopValidation.js";
import {validationResult} from "express-validator";

const CreateShop = (app) => {
    app.post("/shops", createShopValidation, async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const shop = await createShop({
            name: req.body.name,
            stocks: req.body.stocks
        })

        res.status(201).json(shop)
    })
}

export const ShopController = (app) => {
    CreateShop(app)
}