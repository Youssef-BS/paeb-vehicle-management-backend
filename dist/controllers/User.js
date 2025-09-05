"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = void 0;
const User_ts_1 = require("../models/User");
const getUsers = async (req, res) => {
    try {
        const users = await User_ts_1.User.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User_ts_1.User.findById(userId);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { firstName, lastName, email, role } = req.body;
    try {
        const user = await User_ts_1.User.findByIdAndUpdate(userId, {
            firstName,
            lastName,
            email,
            role
        }, { new: true });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User updated successfully", user });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User_ts_1.User.findByIdAndDelete(userId);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteUser = deleteUser;
