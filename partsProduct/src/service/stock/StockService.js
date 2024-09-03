import {StockEntity} from "../../database/entities/StockEntity.js";
import {AppDataSource} from "../../config/ormconfig.js";
import {ProductEntity} from "../../database/entities/ProductEntity.js";

export const createStock = async (data, res) => {
    try {
        const stock = new StockEntity(data);
        stock.shopId = data.shop.id
        stock.productId = data.product.id
        stock.quantityInOrder = data.quantityInOrder
        stock.quantityOnShelf = data.quantityOnShelf

        return await AppDataSource.getRepository(StockEntity).save(stock)
    } catch (error) {
        res.status(500).json({message: "Ошибка при создании остатка", error: error.message});
    }
}

export const IncrementStock = async (id, quantityInOrder, quantityOnShelf, res) => {
    try {
        const stock = await AppDataSource.getRepository(StockEntity).findOne({where: {id}, transaction: false});

        if (!stock) {
            return res.status(400).json({message: "неправильный id"});
        }

        // Update stock quantities
        await AppDataSource.getRepository(StockEntity).update({id}, {
            quantityInOrder: stock.quantityInOrder + quantityInOrder,
            quantityOnShelf: stock.quantityOnShelf + quantityOnShelf,
        });

        return res.status(200).json({message: "успешно обновлено"})
    } catch (error) {
        console.error("Error occurred during stock update:", error);
        return res.status(500).json({message: "Ошибка при обновлении остатков", error: error.message});
    }
}

export const DecrementStock = async (id, quantityInOrder, quantityOnShelf, res) => {
    try {
        const stock = await AppDataSource.getRepository(StockEntity).findOne({where: {id}, transaction: false})
        console.log(stock)
        if (!stock) res.status(400).json({message: "неправильный id"})
        await AppDataSource.getRepository(StockEntity).update({id}, {
            quantityInOrder: stock.quantityInOrder - quantityInOrder < 0 ? 0 : stock.quantityInOrder - quantityInOrder,
            quantityOnShelf: stock.quantityOnShelf - quantityOnShelf < 0 ? 0 : stock.quantityOnShelf - quantityOnShelf,
        })
        return res.status(200).json({message: "успешно обновлено"})
    } catch (error) {
        return res.status(500).json({message: "Ошибка при обновлении остатков", error: error.message});
    }
}

export const getWithFiltersStock = async (req, res) => {
    try {
        const {
            plu,
            shopId,
            quantityOnShelfMin,
            quantityOnShelfMax,
            quantityInOrderMin,
            quantityInOrderMax
        } = req.query;

        const stockRepository = AppDataSource.getRepository(StockEntity);
        const queryBuilder = stockRepository.createQueryBuilder("stock");

        // Фильтрация по PLU
        if (plu) {
            const product = await AppDataSource.getRepository(ProductEntity).findOne({ where: { plu }, transaction: false });
            if (product) {
                queryBuilder.andWhere("stock.productId = :productId", { productId: product.id });
            } else {
                return res.status(400).json({ message: "Товар не найден" });
            }
        }

        // Фильтрация по shopId
        if (shopId) {
            queryBuilder.andWhere("stock.shopId = :shopId", { shopId });
        }

        // Фильтрация по диапазону quantityOnShelf
        if (quantityOnShelfMin) {
            queryBuilder.andWhere("stock.quantityOnShelf >= :quantityOnShelfMin", { quantityOnShelfMin: Number(quantityOnShelfMin) });
        }
        if (quantityOnShelfMax) {
            queryBuilder.andWhere("stock.quantityOnShelf <= :quantityOnShelfMax", { quantityOnShelfMax: Number(quantityOnShelfMax) });
        }

        // Фильтрация по диапазону quantityInOrder
        if (quantityInOrderMin) {
            queryBuilder.andWhere("stock.quantityInOrder >= :quantityInOrderMin", { quantityInOrderMin: Number(quantityInOrderMin) });
        }
        if (quantityInOrderMax) {
            queryBuilder.andWhere("stock.quantityInOrder <= :quantityInOrderMax", { quantityInOrderMax: Number(quantityInOrderMax) });
        }

        const stocks = await queryBuilder.getMany();

        res.status(200).json(stocks);
    } catch (error) {
        res.status(500).json({ message: "Ошибка при получении остатков", error: error.message });
    }
};