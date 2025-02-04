import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

export const registration = async(request, response) => {
    {
        try {
            const password = request.body.password;
            const salt = await bcrypt.genSalt(12);
            const hash = await bcrypt.hash(password, salt);
            const doc = new User ({
                email: request.body.email,
                fullName: request.body.fullName,
                avatarUrl: request.body.avatarUrl,
                passwordHash: hash
            });
            const user = await doc.save();
            const token = jwt.sign({
                _id: user._id
            }, 'secretkey', {expiresIn: '24h'});
            const { passwordHash, ...userData } = user._doc
            return response.status(200).json({
                ...userData, token
            });
        } catch (error) {
            console.log(error);
            return response.status(500).json({
                message: 'Authentication failured'
            })
        }
    }
}

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
