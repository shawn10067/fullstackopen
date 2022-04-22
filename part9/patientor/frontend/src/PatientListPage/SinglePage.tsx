import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient, Gender, Entry } from "../types";
import { useParams } from "react-router-dom";
import ManIcon from "@mui/icons-material/Man";
import GirlIcon from "@mui/icons-material/Girl";
import SvgIcon from "@mui/material/SvgIcon";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddEntryModal from "../AddEntryModal";
import AddHealthEntryModal from "../AddHealthModal";
import { Button } from "@material-ui/core";
import { HospitalEntryFormValues } from "../AddEntryModal/AddHealthEntryForm";
import { HealthEntryFormValues } from "../AddHealthModal/AddEntryForm";
import AddOccupationEntryModal from "../AddOccupationalHealthModal";
import { OccupationalEntryFormValues } from "../AddOccupationalHealthModal/AddOccupationEntryForm";

const Person = (): JSX.Element => {
  // getting the id of the patient
  const { id } = useParams<{ id: string }>();

  // holding the patient data
  const [person, setPerson] = useState<Patient>({
    name: " ",
    dateOfBirth: " ",
    id: " ",
    occupation: " ",
    gender: Gender.Female,
    entries: [],
  });
  const [entries, setEntries] = useState<Entry[]>([]);

  // holding modal state (hospital)
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  // holding modal state (health)
  const [healthModalOpen, setHealthModalOpen] = React.useState<boolean>(false);
  const [healthError, setHealthError] = React.useState<string>();

  const openHealthModal = (): void => setHealthModalOpen(true);

  const closeHealthModal = (): void => {
    setHealthModalOpen(false);
    setHealthError(undefined);
  };

  // holding modal state (occupation)
  const [occupationModalOpen, setOccupationModalOpen] =
    React.useState<boolean>(false);
  const [occupationError, setOccupationError] = React.useState<string>();

  const openOccupationModal = (): void => setOccupationModalOpen(true);

  const closeOccupationModal = (): void => {
    setOccupationModalOpen(false);
    setOccupationError(undefined);
  };

  // defining function to submit new entry
  const submitNewHospitalEntry = async (values: HospitalEntryFormValues) => {
    console.log("Hospital submitted", values);
    const entry = {
      ...values,
      type: "Hospital",
      diagnosisCodes: [],
    };
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/id/${id || ""}/entries`,
        entry
      );
      if (person.entries !== undefined) {
        setEntries(entries.concat(newEntry));
      } else {
        setEntries([newEntry]);
      }
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  // defining function to submit new entry
  const submitNewHealthEntry = async (values: HealthEntryFormValues) => {
    console.log("Health submitted", values);
    const entry = {
      ...values,
      type: "HealthCheck",
      diagnosisCodes: [],
    };
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/id/${id || ""}/entries`,
        entry
      );
      if (person.entries !== undefined) {
        setEntries(entries.concat(newEntry));
      } else {
        setEntries([newEntry]);
      }
      closeHealthModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  // defining function to submit new entry
  const submitNewOccupationalEntry = async (
    values: OccupationalEntryFormValues
  ) => {
    console.log("Occupation submitted", values);
    const entry = {
      ...values,
      type: "OccupationalHealthcare",
      diagnosisCodes: [],
    };
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/id/${id || ""}/entries`,
        entry
      );
      if (person.entries !== undefined) {
        setEntries(entries.concat(newEntry));
      } else {
        setEntries([newEntry]);
      }
      closeOccupationModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  // getting the patient data
  useEffect(() => {
    axios
      .get(`${apiBaseUrl || ""}/patients/id/${id || ""}`)
      .then((result) => {
        const patientData = result.data as Patient;
        //console.log(patientData);
        setEntries(patientData.entries || []);
        setPerson(patientData);
      })
      .catch((e: unknown) => {
        if (axios.isAxiosError(e)) {
          console.error(e?.response?.data || "Unrecognized axios error");
        } else {
          console.error("Unknown error", e);
        }
      });
  }, []);

  // defining the entry style
  const entryStyle = {
    border: "3px dotted lightblue",
    borderRadius: "10px",
    margin: "15px",
    padding: "8px",
  };

  return (
    <div>
      <h2>
        {`${person.name ? person.name : "NAME"}`}
        {person.gender == "male" ? (
          <SvgIcon component={ManIcon}></SvgIcon>
        ) : (
          <SvgIcon component={GirlIcon}></SvgIcon>
        )}
      </h2>
      <h3>{`${person.dateOfBirth ? person.dateOfBirth : "N/A"}`}</h3>
      <h4>{`Occupation: ${person.occupation}`}</h4>
      <h4>{`ssn: ${person.ssn ? person.ssn : "N/A"}`}</h4>

      {entries.length != 0 ? <h3>Entries</h3> : null}
      <div>
        {entries.map((val) => {
          const diag =
            !val.diagnosisCodes || val.diagnosisCodes?.length == 0 ? null : (
              <div>
                <h4>Diagnosis Codes</h4>
                <ul>
                  {val.diagnosisCodes?.map((code, i) => (
                    <li key={i}>{code}</li>
                  ))}
                </ul>
              </div>
            );
          switch (val.type) {
            case "HealthCheck":
              let statusIcon = "";
              switch (val.healthCheckRating) {
                case 0:
                  statusIcon = "lightblue";
                  break;
                case 1:
                  statusIcon = "green";
                  break;
                case 2:
                  statusIcon = "yellow";
                  break;
                default:
                  statusIcon = "red";
                  break;
              }
              return (
                <div key={val.id} style={entryStyle}>
                  <h3>
                    {`${val.date} `}
                    <SvgIcon component={LocalHospitalIcon}></SvgIcon>
                  </h3>
                  <p>{val.description}</p>
                  {diag}
                  <SvgIcon
                    sx={{ color: statusIcon }}
                    component={FavoriteIcon}
                  ></SvgIcon>
                  <p>
                    <em>{`Specialist provided by: ${val.specialist}`}</em>
                  </p>
                </div>
              );
              break;
            case "OccupationalHealthcare":
              return (
                <div key={val.id} style={entryStyle}>
                  <h3>
                    {`${val.date} `}
                    <SvgIcon component={BusinessCenterIcon}></SvgIcon>
                    {` ${val.employerName}`}
                  </h3>
                  <p>{val.description}</p>
                  {val.sickLeave ? (
                    <p>{`Sick leave between ${val.sickLeave.startDate} and ${val.sickLeave.endDate}`}</p>
                  ) : (
                    ""
                  )}
                  {diag}
                  <p>
                    <em>{`Specialist provided by: ${val.specialist}`}</em>
                  </p>
                </div>
              );
              break;
            case "Hospital":
              return (
                <div key={val.id} style={entryStyle}>
                  <h3>
                    {`${val.date} `}
                    <SvgIcon component={LocalHospitalIcon}></SvgIcon>
                  </h3>
                  <p>{val.description}</p>
                  <p>{`Discharge on ${val.discharge.date} under conditions such that: ${val.discharge.criteria}`}</p>
                  {diag}
                  <p>
                    <em>{`Specialist provided by: ${val.specialist}`}</em>
                  </p>
                </div>
              );
              break;
            default:
              break;
          }
        })}
      </div>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewHospitalEntry}
        error={error}
        onClose={closeModal}
      />
      <AddHealthEntryModal
        modalOpen={healthModalOpen}
        onSubmit={submitNewHealthEntry}
        error={healthError}
        onClose={closeHealthModal}
      />
      <AddOccupationEntryModal
        modalOpen={occupationModalOpen}
        onSubmit={submitNewOccupationalEntry}
        error={occupationError}
        onClose={closeOccupationModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Hospital Entry
      </Button>
      <Button variant="contained" onClick={() => openHealthModal()}>
        Add New Health Entry
      </Button>
      <Button variant="contained" onClick={() => openOccupationModal()}>
        Add New Occupation Entry
      </Button>
    </div>
  );
};

export default Person;
