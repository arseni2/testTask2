import express from 'express';
import { AppDataSource } from "./config/ormconfig.js";
import { ProductController } from "./route/product/ProductController.js";
import { StockController } from "./route/stock/StockController.js";
import { ShopController } from "./route/shop/ShopController.js";
const app = express();
app.use(express.json());
ProductController(app);
await StockController(app);
ShopController(app);
const PORT = 3000;
app.listen(PORT, async ()=>{
    await AppDataSource.initialize();
    console.log(`Server is running on http://localhost:${PORT}`);
});
