import { NewPatientData } from "./types";
import { Gender } from "./types";

// string parsers
const parseString = (inputString: unknown): string => {
  if (!inputString || !isString(inputString)) {
    throw new Error("Incorrect or missing field");
  }

  return inputString;
};
const isString = (text: unknown): text is string => {
  return typeof text === "string";
};

// date parsers
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

// gender parsers
const isGender = (inputGender: any): inputGender is Gender => {
  return Object.values(Gender).includes(inputGender);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect gender");
  }
  return gender;
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

export const toNewPatientData = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): NewPatientData => {
  const newPatient = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
  };
  return newPatient;
};
