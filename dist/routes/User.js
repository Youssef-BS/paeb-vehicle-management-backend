"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../controllers/User");
const router = express_1.default.Router();
router.get("/", User_1.getUsers);
router.get("/:id", User_1.getUserById);
router.put("/:id", User_1.updateUser);
router.delete("/:id", User_1.deleteUser);
exports.default = router;
