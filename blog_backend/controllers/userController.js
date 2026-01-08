import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import fs from 'fs';

import User from '../models/User.js';

export const login = async(request, response) => {
    {
        try {
            const user = await User.findOne({ email: request.body.email });
    
            if(!user) {
                return response.status(404).json({
                    message: 'User not found'
                })
            }
            const token = jwt.sign({
                _id: user._id
            }, 'secretkey', {expiresIn: '7d'});
            const { passwordHash, ...userData } = user._doc
            return response.status(200).json({
                ...userData, token
            });
        } catch(error) {
            console.log(error);
            return response.status(500).json({
                message: 'Authentication failured'
            })
        }
        
    }
}

export const registration = async (req, res) => {
    try {
      // ✅ 1. Проверяем ошибки валидации
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }
  
      // ✅ 2. Хешируем пароль
      const salt = await bcrypt.genSalt(12);
      const hash = await bcrypt.hash(req.body.password, salt);
  
      // ✅ 3. Создаём пользователя
      const doc = new User({
        email: req.body.email,
        fullName: req.body.fullName,
        passwordHash: hash,
        avatarUrl: req.file ? `/uploads/${req.file.filename}` : null,
      });
  
      const user = await doc.save();
  
      // ✅ 4. Генерируем токен
      const token = jwt.sign(
        { _id: user._id },
        'secretkey',
        { expiresIn: '24h' }
      );
  
      const { passwordHash, ...userData } = user._doc;
  
      return res.status(200).json({
        ...userData,
        token,
      });
    } catch (error) {
      console.error(error);
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error('Ошибка удаления файла:', err);
        });
      }
      return res.status(500).json({
        message: 'Authentication failed',
      });
    }
  };

export const profile = async(request, response) => {
    {
        try{
            const user = await User.findById(request.userId);
            if (!user) {
                response.status(404).json({ message: 'User not found' });
            }
            const { passwordHash, ...userData } = user._doc;
            return response.json(userData);
        } catch(error){
            response.status(403).json({ message: 'No access' });
        }
    }
}
