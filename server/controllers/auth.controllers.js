import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
import errorHandler from '../utils/error.js'
import jwt from 'jsonwebtoken'



//Signup controller
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




//sign-in controller

export const signin = async(req, res,next) =>{
        const{email, password} = req.body;
        try{
        const validUser = await User.findOne({email});
        if (!validUser) {
           return next(errorHandler(404, 'User not found')) ;   
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
        const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET);
        const {password: pass, ...rest} = validUser._doc;
        res
        .cookie('access_token', token, {httpOnly: true})
        .status(200)
        .json(rest);
} catch (error){
        next(error)
}
}