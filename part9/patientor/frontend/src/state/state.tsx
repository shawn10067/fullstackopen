import React, { createContext, useContext, useReducer } from "react";
import { Patient, Diagnosis } from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  diagnoses: Diagnosis[];
};

const initialState: State = {
  patients: {},
  diagnoses: [],
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({ reducer, children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const setPatientList = (patients: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload: patients };
};

export const addPatient = (patient: Patient): Action => {
  return { type: "ADD_PATIENT", payload: patient };
};

export const setDiagnosisList = (diagnoses: Diagnosis[]): Action => {
  return { type: "SET_DIAGNOSIS_LIST", payload: diagnoses };
};

export const addDiagnosis = (diagnosis: Diagnosis): Action => {
  return { type: "ADD_DIAGNOSIS", payload: diagnosis };
};

export const useStateValue = () => useContext(StateContext);
