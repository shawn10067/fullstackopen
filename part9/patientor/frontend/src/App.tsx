import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container } from "@material-ui/core";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList, setDiagnosisList } from "./state";
import { Patient } from "./types";

import PatientListPage from "./PatientListPage";
import Person from "./PatientListPage/SinglePage";
import { Typography } from "@material-ui/core";

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );

        // creating diagnosis data
        const arrayOfDiag = patientListFromApi
          .flatMap((people) => people.entries)
          .flatMap((entry) => entry?.diagnosisCodes)
          .filter((diag) => diag !== undefined)
          .map((diag) => {
            if (diag === undefined) {
              return {
                code: "",
                name: "",
              };
            }
            return {
              code: diag,
              name: diag,
            };
          });

        // setting diagnosis and patient list
        dispatch(setDiagnosisList(arrayOfDiag));
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route path="/id/:id" element={<Person />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
