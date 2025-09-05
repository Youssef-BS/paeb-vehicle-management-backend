"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.Login = void 0;
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User_1.User.findOne({ email: email });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        if (user.password !== password)
            return res.status(401).json({ message: "Invalid password" });
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "5d" });
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
            },
            token
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal serer Error" });
    }
};
exports.Login = Login;
const register = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
    try {
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User_1.User({
            firstName,
            lastName,
            email,
            password,
            role
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.register = register;
