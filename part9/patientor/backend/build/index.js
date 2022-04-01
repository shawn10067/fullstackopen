"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const pingRouter_1 = __importDefault(require("./routes/pingRouter"));
const diagnosisRouter_1 = __importDefault(require("./routes/diagnosisRouter"));
const patientRouter_1 = __importDefault(require("./routes/patientRouter"));
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json());
app.use("/api/ping", pingRouter_1.default);
app.use("/api/diagnosis", diagnosisRouter_1.default);
app.use("/api/patients", patientRouter_1.default);
const PORT = 3001;
app.listen(PORT, () => console.log(`app listening on ${PORT}.`));
