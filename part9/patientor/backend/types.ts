export enum Gender {
  Male = "male",
  Female = "female",
}

export interface PatientData {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NewPatientData = Omit<PatientData, "id">;

export type NonSensitivePatientData = Omit<PatientData, "ssn">;

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}
