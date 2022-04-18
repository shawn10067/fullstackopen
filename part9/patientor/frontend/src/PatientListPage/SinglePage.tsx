import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient, Gender } from "../types";
import { useParams } from "react-router-dom";
import ManIcon from "@mui/icons-material/Man";
import GirlIcon from "@mui/icons-material/Girl";
import SvgIcon from "@mui/material/SvgIcon";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Person = (): JSX.Element => {
  // holding the patient data
  const [person, setPerson] = useState<Patient>({
    name: " ",
    dateOfBirth: " ",
    id: " ",
    occupation: " ",
    gender: Gender.Female,
    entries: [],
  });

  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    axios
      .get(`${apiBaseUrl || ""}/patients/id/${id || ""}`)
      .then((result) => {
        setPerson(result.data as Patient);
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

      {person.entries?.length != 0 ? <h3>Entries</h3> : null}
      <div>
        {person.entries?.map((val) => {
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
    </div>
  );
};

export default Person;
