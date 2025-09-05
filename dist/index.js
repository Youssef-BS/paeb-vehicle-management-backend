"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const Auth_1 = __importDefault(require("./routes/Auth"));
const User_1 = __importDefault(require("./routes/User"));
const Vehicle_1 = __importDefault(require("./routes/Vehicle"));
const Maintenance_1 = __importDefault(require("./routes/Maintenance"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
}));
(0, db_1.connectDB)();
app.use('/api/auth', Auth_1.default);
app.use('/api/users', User_1.default);
app.use('/api/vehicles', Vehicle_1.default);
app.use('/api/maintenances', Maintenance_1.default);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
