"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnoses_1 = __importDefault(require("../data/diagnoses"));
const getDiagnosisData = () => diagnoses_1.default;
/* Implement in the future
const addDiagnosisData = (data: Diagnosis): null => {
    return null;
}
*/
exports.default = {
    getDiagnosisData,
};
