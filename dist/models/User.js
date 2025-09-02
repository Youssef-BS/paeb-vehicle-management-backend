"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, "First name must be at least 2 characters long"],
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, "Last name must be at least 2 characters long"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password must be at least 8 characters long"],
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "user"
    }
});
exports.User = (0, mongoose_1.model)("User", userSchema);
