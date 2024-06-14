import { body } from 'express-validator';

export const registerValidation = [
    body('email', 'Incorrect format').isEmail(),
    body('password', 'Password must contain at least 5 symbols').isLength({min: 5}),
    body('fullName', 'Enter your full name containing at least 3 characters').isLength({min: 3}),
    body('avatarUrl', 'Incorrect link').optional().isURL(),
];

export const loginValidation = [
    body('email', 'Incorrect format').isEmail(),
    body('password', 'Password must contain at least 5 symbols').isLength({min: 5})
];

export const postValidation = [
    body('title', 'Enter title').isLength({min: 1}),
    body('text', 'Enter text').isLength({min: 3}),
    body('tags', 'Incorrect format for tags').optional(),
    body('imgae', 'Incorrect link').optional()
];