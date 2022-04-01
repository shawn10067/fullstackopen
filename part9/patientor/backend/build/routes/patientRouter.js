"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patientService_1 = __importDefault(require("../services/patientService"));
const express_1 = __importDefault(require("express"));
const patientRouter = express_1.default.Router();
patientRouter.get("/", (_req, res) => {
    const data = patientService_1.default.getNonSensitivePatientData();
    return res.json(data).end();
});
exports.default = patientRouter;
