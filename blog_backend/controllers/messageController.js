import { Message } from '../models/Post.js';

export const createMessage = async (request, response) => {
    try {
        const { firstName, lastName, email, phoneNumber, message } = request.body;

        if (!firstName || !lastName || !email || !message) {
            return response.status(400).json({
                message: 'firstName, lastName, email и message обязательны',
            });
        }

        const doc = new Message({
            firstName,
            lastName,
            email,
            phoneNumber,
            message,
        });

        const savedMessage = await doc.save();

        return response.status(201).json({
            message: 'Сообщение успешно сохранено',
            data: savedMessage,
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            message: 'Ошибка при сохранении сообщения',
        });
    }
};