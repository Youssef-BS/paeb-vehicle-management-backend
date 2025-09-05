"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_ts_1 = require("../controllers/Auth");
const router = express_1.default.Router();
router.post("/login", Auth_ts_1.Login);
router.post("/add-user", Auth_ts_1.register);
exports.default = router;
