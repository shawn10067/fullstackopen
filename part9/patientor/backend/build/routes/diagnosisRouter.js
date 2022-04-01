"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnosisService_1 = __importDefault(require("../services/diagnosisService"));
const express_1 = __importDefault(require("express"));
const diagnosisRouter = express_1.default.Router();
diagnosisRouter.get("/", (_req, res) => {
    const data = diagnosisService_1.default.getDiagnosisData();
    return res.json(data).end();
});
exports.default = diagnosisRouter;
