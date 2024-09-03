import { body } from 'express-validator';
export const createShopValidation = [
    body('name').notEmpty().withMessage('name не должен быть пустым.').isString().withMessage('name должен быть числом.'),
    body('stocks').optional().isArray({
        min: 1
    }).withMessage('stocks должен быть массивом с хотя бы одним элементом.').custom((value)=>{
        if (!value.every((id)=>typeof id === 'number')) {
            throw new Error('Каждый элемент в stocks должен быть числом.');
        }
        return true;
    })
];
