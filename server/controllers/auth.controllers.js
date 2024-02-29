import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        // Hash the password asynchronously to avoid any blocking issues
        const saltRounds = 10;
        const hashedPassword = await bcryptjs.hash(password, saltRounds);

        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();
        
        res.status(201).json('User created successfully');
    } catch (error) {
        // Handle errors, log them, and pass them to the next middleware
        next(error);
    }
};
