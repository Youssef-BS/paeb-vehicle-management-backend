import { User } from "../models/User";
import type { Request, Response } from 'express';
import jwt from "jsonwebtoken";

export const Login = async (req : Request, res: Response) => { 
    const {email , password} = req.body ; 
    try {

        const user = await User.findOne({email : email}) ;
        if(!user)
            return res.status(404).json({message : "User not found"}) ;

        if(user.password !== password)
            return res.status(401).json({message : "Invalid password"}) ;

        const token = jwt.sign(
            {id : user._id , role : user.role},
            process.env.JWT_SECRET as string,
            {expiresIn : "5d"}
        )

        res.status(200).json({
            message : "Login successful",
            user : {
                id : user._id,
                firstName : user.firstName,
                lastName : user.lastName,
                email : user.email,
                role : user.role,
            } , 
            
            token
        })

    }catch(error) {
        res.status(500).json({message : "Internal serer Error"})
    }
}

export const register = async (req: Request, res: Response) => {

    const { firstName, lastName, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            role
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {   
        res.status(500).json({ message: "Internal server error" });
    }
    
}
