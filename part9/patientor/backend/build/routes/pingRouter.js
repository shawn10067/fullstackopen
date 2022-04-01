"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pingRouter = express_1.default.Router();
pingRouter.get("/", (_req, res) => {
    console.log("someone pinged");
    res.send("pong").end();
    return;
});
exports.default = pingRouter;
