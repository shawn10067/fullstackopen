import patientData from "../data/patients";
import {
  NonSensitivePatientData,
  PatientData,
  NewPatientData,
  PublicPatient,
} from "../types";
import { nanoid } from "nanoid";

const getPatientData = (): PatientData[] => patientData;

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
  return patientData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => {
      return {
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
      };
    }
  );
};

const getOnePatientData = (id: String): PatientData | undefined => {
  return patientData.find((val) => val.id === id);
};

const getPublicPatientData = (): PublicPatient[] => {
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
    entries: [],
  };

  patientData.push(newPatient);
  return newPatient;
};

export default {
  getPatientData,
  getNonSensitivePatientData,
  getPublicPatientData,
  getOnePatientData,
  addPatientData,
};
