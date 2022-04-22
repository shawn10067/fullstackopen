import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { OccupationalHealthcareEntry } from "../types";
import { useStateValue } from "../state";
import { isValid } from "date-fns";

/*
 * use type Health, but omit id and entries,
 */
export type OccupationalEntryFormValues = Omit<
  OccupationalHealthcareEntry,
  "id" | "type"
>;

interface Props {
  onSubmit: (values: OccupationalEntryFormValues) => void;
  onCancel: () => void;
}

export const AddOccupationEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        let errors: { [field: string]: string | object } = {};
        if (!values.date) {
          errors.date = requiredError;
        } else if (!isValid(values.date)) {
          errors.date = "Format date correctly";
        } else {
          errors.date = "";
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if (!values.sickLeave.startDate) {
          errors = Object.assign(errors, {
            sickLeave: {
              startDate: requiredError,
            },
          });
        } else if (!isValid(values.sickLeave.startDate)) {
          errors = Object.assign(errors, {
            sickLeave: {
              startDate: "Format date correctly.",
            },
          });
        }
        if (!values.sickLeave.endDate) {
          errors = Object.assign(errors, {
            sickLeave: {
              endDate: requiredError,
            },
          });
        } else if (!isValid(values.sickLeave.endDate)) {
          errors = Object.assign(errors, {
            sickLeave: {
              endDate: "Format date correctly.",
            },
          });
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
              label="Employer Name"
              placeholder="Employer"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick Leave Start Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick Leave End Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
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

export default AddOccupationEntryForm;
