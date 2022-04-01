"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const getPatientData = () => patients_1.default;
const getNonSensitivePatientData = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => {
        return {
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
        };
    });
};
/* Implement in the future
const addPatientData = (data: PatientData): null => {
    return null;
}
*/
exports.default = {
    getPatientData,
    getNonSensitivePatientData,
};
