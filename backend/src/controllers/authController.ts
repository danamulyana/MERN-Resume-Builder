import User, { IUser } from '../models/User';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const generateToken = (userId : string) => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        console.error('JWT_SECRET is not defined in environment variables. Token generation failed.');
        throw new Error('Server configuration error: JWT secret missing.');
    }
    return jwt.sign({ id: userId }, jwtSecret, { expiresIn: "7d" });
}

// @desc Regis a new user
// @route POST /api/auth/register
// @access Public
export const registerUser = async (req : Request, res : Response) => {
    const { name, email, password, profileImageUrl } = req.body;

    try{
        if (!name || !email || !password) {
            res.status(400).json({ message: 'Please enter all required fields: name, email, and password.' });
            return;
        }

        const userExists : IUser | null = await User.findOne({ email });

        if (userExists) {
            res.status(409).json({ message: 'User with that email already exists.' }); // 409 Conflict
            return;
        }

        const user: IUser = await User.create({
            name,
            email,
            password,
            profilePicture: profileImageUrl || null,
        });

        if (user) {
            res.status(201).json({ // 201 Created
                _id: user._id,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture,
                token: generateToken(user._id.toString()), // Convert ObjectId to string for token
            });
        } else {
            res.status(400).json({ message: 'Invalid user data.' }); // This might happen if Mongoose creation fails unexpectedly
        }

    }catch(error : any){
        console.error('Error during user registration:', error);
        // Handle Mongoose validation errors or other database errors
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: 'Server error during registration.' });
    }
}

// @desc Regis a new user
// @route POST /api/auth/login
// @access Public
export const loginUser = async (req : Request, res : Response) => {

}

// @desc Regis a new user
// @route POST /api/auth/profile
// @access Private (Requires JWT)
export const getUserProfile = async (req : Request, res : Response) => {

}

module.exports = { registerUser, loginUser, getUserProfile }