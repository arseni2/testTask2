import { ProductEntity } from "../../database/entities/ProductEntity.js";
import { AppDataSource } from "../../config/ormconfig.js";
export const getAllProducts = async (name, plu, res)=>{
    try {
        const productRepository = AppDataSource.getRepository(ProductEntity);
        const query = productRepository.createQueryBuilder('product');
        if (name) {
            query.andWhere('LOWER(product.name) LIKE LOWER(:name)', {
                name: `%${name.toLowerCase()}%`
            });
        }
        if (plu) {
            query.orderBy('product.plu', 'DESC'); // или 'DESC' для обратного порядка
        }
        return await query.getMany();
    } catch (error) {
        res.status(500).json({
            message: 'Ошибка при получении товаров: ' + error.message
        });
    }
};
export const createProduct = async (data)=>{
    const productRepository = AppDataSource.getRepository(ProductEntity);
    const product = new ProductEntity();
    product.plu = data.plu;
    product.name = data.name;
    return await productRepository.save(product);
};
export const GetProductDetail = async (id)=>{
    const repo = AppDataSource.getRepository(ProductEntity);
    return await repo.findOne({
        where: {
            id
        },
        transaction: false
    });
};
