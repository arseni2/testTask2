import { body } from 'express-validator';
// Валидация маршрута создания стока
export const createStockValidation = [
    body('quantityOnShelf').isInt({
        min: 0
    }).withMessage('Количество на полке должно быть целым числом и больше или равно 0'),
    body('quantityInOrder').isInt({
        min: 0
    }).withMessage('Количество в заказе должно быть целым числом и больше или равно 0'),
    body('productId').isInt().withMessage('ID продукта должен быть целым числом'),
    body('shopId').isInt().withMessage('ID магазина должен быть целым числом')
];
