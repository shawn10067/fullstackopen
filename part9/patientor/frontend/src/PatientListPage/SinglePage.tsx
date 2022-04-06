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
    </div>
  );
};

export default Person;
