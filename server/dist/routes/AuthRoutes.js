"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const validation_1 = require("../middlewares/validation");
const router = express_1.default.Router();
router.post("/register", (0, validation_1.ValidateSchema)(validation_1.Schemas.user.create), AuthController_1.default.handleRegister);
exports.default = router;
