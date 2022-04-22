import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { HospitalEntry } from "../types";
import { useStateValue } from "../state";
import { isValid } from "date-fns";
/*
 * use type Hospital Entry, but omit id and type,
 */
export type HospitalEntryFormValues = Omit<HospitalEntry, "id" | "type">;

interface Props {
  onSubmit: (values: HospitalEntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        discharge: {
          criteria: "",
          date: "",
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        let errors: { [field: string]: string | object } = {};
        if (!values.date) {
          errors.date = requiredError;
        } else if (!isValid(new Date(values.date))) {
          errors.date = "Format date correctly.";
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.discharge.date) {
          errors = {
            discharge: {
              date: requiredError,
            },
          };
        } else if (!isValid(new Date(values.discharge.date))) {
          console.log("discharge date not correct");
          errors = {
            ...errors,
            discharge: {
              date: "Format date correctly.",
            },
          };
        }
        if (!values.discharge.criteria) {
          errors = {
            ...errors,
            discharge: {
              criteria: requiredError,
            },
          };
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Discharge Criteria"
              placeholder="Criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <DiagnosisSelection
              diagnoses={Object.values(diagnoses)}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
