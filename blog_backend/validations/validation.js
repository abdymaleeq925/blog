import { body } from 'express-validator';

export const registerValidation = [
    body('email', 'Incorrect format').isEmail(),
    body('password', 'Password must contain at least 5 symbols').isLength({min: 5}),
    body('fullName', 'Enter your full name containing at least 3 characters').isLength({min: 3}),
];

export const loginValidation = [
    body('email', 'Incorrect e-mail format').isEmail(),
    body('password', 'Password must contain at least 5 symbols').isLength({min: 5})
];

export const postValidation = [
    body('title', 'Title must contain maximum 150 characters').isLength({min: 1, max: 150}),
    body('description', 'Description must contain maximum 300 characters').isLength({min: 1, max: 300}),
    body('text', 'Text must contain at least 3 characters').isLength({min: 3}),
    body('category', 'Category must be a string').isString(),
    body('imageUrl', 'Incorrect image link').isString()
];