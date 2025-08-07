import type { Request, Response } from 'express';
import {User} from '../models/User.ts';

export const getUsers = async (req : Request , res : Response) => {
try {
  const users = await User.find();
  res.status(200).json(users);
}catch(error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.id ; 
    try {
        const user = await User.findById(userId) ; 
        if(!user)
            return res.status(404).json({ message: "User not found" });
        res.status(200).json(user); 
    }catch(error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { firstName, lastName, email, role } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            userId , {
                firstName,
                lastName,
                email,
                role
            },
            { new: true }
        )
        if (!user) 
            return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) 
            return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {   
        res.status(500).json({ message: "Internal server error" });
    }
}