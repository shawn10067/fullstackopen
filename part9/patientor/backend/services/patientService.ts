import patientData from "../data/patients";
import { NonSensitivePatientData, PatientData, NewPatientData } from "../types";
import { nanoid } from "nanoid";

const getPatientData = (): PatientData[] => patientData;

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

const addPatientData = ({
  name,
  dateOfBirth,
  gender,
  occupation,
  ssn,
}: NewPatientData): PatientData => {
  const newPatient = {
    id: nanoid(),
    name,
    dateOfBirth,
    gender,
    occupation,
    ssn,
  };

  patientData.push(newPatient);
  return newPatient;
};

export default {
  getPatientData,
  getNonSensitivePatientData,
  addPatientData,
};
