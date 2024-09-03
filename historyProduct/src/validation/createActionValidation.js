import { body } from 'express-validator';

export const createProductValidation = [
    body('shopId')
        .notEmpty().withMessage('shopId не должен быть пустым.')
        .isInt().withMessage('shopId должен быть числом.'),
    body('action')
        .notEmpty().withMessage('action не должно быть пустым.')
        .isString().withMessage('action должно быть строкой.')
        .isLength({ max: 255 }).withMessage('Название не должно превышать 255 символов.'),
    body('productId')
        .notEmpty().withMessage('productId не должен быть пустым.')
        .isInt().withMessage('productId должен быть числом.'),
];