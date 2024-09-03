import { body } from 'express-validator';

export const createProductValidation = [
    body('plu')
        .notEmpty().withMessage('PLU не должен быть пустым.')
        .isInt().withMessage('PLU должен быть числом.'), // Проверяет, что это целое число
    body('name')
        .notEmpty().withMessage('Название не должно быть пустым.')
        .isString().withMessage('Название должно быть строкой.')
        .isLength({ max: 255 }).withMessage('Название не должно превышать 255 символов.'),
];