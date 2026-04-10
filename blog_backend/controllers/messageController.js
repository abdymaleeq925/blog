import Message from '../models/Message.js';

/**
 * Creates a new contact message.
 * Expects: firstName, lastName, email, message (required), phoneNumber (optional).
 */
export const createMessage = async (request, response) => {
  try {
    const { firstName, lastName, email, phoneNumber, message } = request.body;

    if (!firstName || !lastName || !email || !message) {
      return response.status(400).json({
        message: 'firstName, lastName, email, and message are required',
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
      message: 'Message saved successfully',
      data: savedMessage,
    });
  } catch (error) {
    console.error('Message creation error:', error);
    return response.status(500).json({
      message: 'Failed to save message',
    });
  }
};