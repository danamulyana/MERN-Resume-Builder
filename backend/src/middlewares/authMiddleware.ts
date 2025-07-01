import jwt from 'jsonwebtoken'
import User, { IUser } from '../models/User'
import { NextFunction, Request, Response } from 'express';

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

const protect = async (req : AuthenticatedRequest, res : Response, next : NextFunction) => {
    try{
        let token : string | undefined;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
            
            if (!process.env.JWT_SECRET) {
                console.error('JWT_SECRET is not defined in environment variables.');
                res.status(500).json({ status: 500, message: 'Server configuration error.' });
                return;
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };

            const user = await User.findById(decoded.id).select("-password");

            if (!user) {
                res.status(404).json({ status: 404, message: 'User not found.' });
                return;
            }

            req.user = user;
            next()
        }else{
            res.status(401).json({ status: 401, message: "Not authorized, no token"});
        }
    }catch(error){
        res.status(401).json({ status: 401, message: "Token Failed", error: error});
    }
}

export { protect }