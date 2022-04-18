import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient, Gender } from "../types";
import { useParams } from "react-router-dom";

const Person = (): JSX.Element => {
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

  return (
    <div>
      <p>{`${person.name || ""} is born on ${
        person.dateOfBirth || ""
      } and is a ${person.gender || ""}`}</p>
      <p>{"Entries"}</p>
      {person.entries?.map((val, i) => {
        switch (val.type) {
          case "HealthCheck":
            return (
              <div key={i}>
                {`type is health check. health check rating is ${val.healthCheckRating}`}
              </div>
            );
            break;
          case "OccupationalHealthcare":
            return (
              <div key={i}>
                {`type is health check. employer name is ${val.employerName}`}
              </div>
            );
            break;
          case "Hospital":
            return (
              <div key={i}>
                {`type is health check. discharge date is ${val.discharge.date}`}
              </div>
            );
            break;
          default:
            break;
        }
      })}
    </div>
  );
};

export default Person;
