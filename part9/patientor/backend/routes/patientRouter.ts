import patientService from "../services/patientService";
import express from "express";
const patientRouter = express.Router();
import { toNewPatientData } from "../utils";

patientRouter.get("/", (_req, res) => {
  const data = patientService.getNonSensitivePatientData();
  return res.json(data).end();
});

patientRouter.get("/id/:id", (req, res) => {
  const num: String = req.params.id;
  console.log("tried to get", num);
  const data = patientService.getOnePatientData(num);
  return res.json(data).end();
});

patientRouter.post("/", (req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  try {
    const newPatient = toNewPatientData(req.body);
    patientService.addPatientData(newPatient);
    res
      .status(201)
      .json({
        message: "File was created",
      })
      .end();
  } catch (e) {
    if (e instanceof Error) {
      res
        .status(400)
        .json({
          error: `Something went wrong: ${e.message}`,
        })
        .end();
    }
  }
});

export default patientRouter;
