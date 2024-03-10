"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("./config");
const routes_1 = require("./routes");
dotenv_1.default.config();
const PORT = config_1.config.server.port;
const app = (0, express_1.default)();
//-------Middleware 
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(function startUp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //-------CONNECTING TO DB
            yield mongoose_1.default.connect(config_1.config.mongo.url, {
                w: "majority",
                retryWrites: true,
                authMechanism: "DEFAULT"
            });
            console.log("Database connected successfully....");
            //-------ROUTES
            (0, routes_1.registerRoutes)(app);
            app.listen(PORT, () => {
                console.log(`Server is running on port: ${PORT}`);
            });
        }
        catch (err) {
            console.log("Database not connected");
        }
    });
})();
