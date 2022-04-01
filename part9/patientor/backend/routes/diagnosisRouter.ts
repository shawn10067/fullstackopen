import diagnosisService from "../services/diagnosisService";
import express from "express";
const diagnosisRouter = express.Router();

diagnosisRouter.get("/", (_req, res) => {
  const data = diagnosisService.getDiagnosisData();
  return res.json(data).end();
});

export default diagnosisRouter;
