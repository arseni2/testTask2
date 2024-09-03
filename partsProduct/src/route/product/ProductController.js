import {getAllProducts, createProduct, GetProductDetail} from "../../service/Product/ProductService.js";
import {createProductValidation} from "../../validation/createProductValidation.js";
import {validationResult} from "express-validator";

const GetAllProducts = (app) => {
    app.get("/products", async (req, res) => {
        const { name, plu } = req.query;
        const products = await getAllProducts(name, plu, res)
        res.json(products);
    });
};

const CreateProduct = (app) => {
    app.post("/products", createProductValidation, async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const product = await createProduct({
                name: req.body.name,
                plu: req.body.plu,
            })
            res.status(201).json(product)
        } catch (e) {
            return res.json(e)
        }
    })
}

const getProductDetail = (app) => {
    app.get("/products/:id", async (req, res) => {
        const productDetail = await GetProductDetail(Number(req.params.id))
        res.status(200).json(productDetail)
    })
}

export const ProductController = (app) => {
    GetAllProducts(app)
    CreateProduct(app)
    getProductDetail(app)
}