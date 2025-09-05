"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_ts_1 = require("./config/db.ts");
const Auth_ts_1 = __importDefault(require("./routes/Auth.ts"));
const User_ts_1 = __importDefault(require("./routes/User.ts"));
const Vehicle_ts_1 = __importDefault(require("./routes/Vehicle.ts"));
const Maintenance_ts_1 = __importDefault(require("./routes/Maintenance.ts"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
}));
(0, db_ts_1.connectDB)();
app.use('/api/auth', Auth_ts_1.default);
app.use('/api/users', User_ts_1.default);
app.use('/api/vehicles', Vehicle_ts_1.default);
app.use('/api/maintenances', Maintenance_ts_1.default);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
