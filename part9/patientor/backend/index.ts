import express from "express";
const cors = require("cors");
import pingRouter from "./routes/pingRouter";
import diagnosisRouter from "./routes/diagnosisRouter";
import patientRouter from "./routes/patientRouter";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/ping", pingRouter);
app.use("/api/diagnosis", diagnosisRouter);
app.use("/api/patients", patientRouter);

const PORT = 3001;

app.listen(PORT, () => console.log(`app listening on ${PORT}.`));
