import diagnosisData from "../data/diagnoses";
import { Diagnosis } from "../types";

const getDiagnosisData = (): Diagnosis[] => diagnosisData;

/* Implement in the future
const addDiagnosisData = (data: Diagnosis): null => {
    return null;
}
*/

export default {
  getDiagnosisData,
};
