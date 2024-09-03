import { AppDataSource } from "../../config/ormconfig.js";
import { ShopEntity } from "../../database/entities/ShopEntity.js";
export const createShop = async (data, res)=>{
    try {
        const shopRepository = AppDataSource.getRepository(ShopEntity);
        const shop = new ShopEntity();
        shop.name = data.name;
        shop.stocks = data.stocks;
        return await shopRepository.save(shop);
    } catch (e) {
        res.status(500).json({
            message: e
        });
    }
};
