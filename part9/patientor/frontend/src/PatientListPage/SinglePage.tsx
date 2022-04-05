import React, { useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Patient, Gender } from "../types";
import { useParams } from "react-router-dom";

const Person = async () => {
  const [person, setPerson] = useState<Patient>({
    name: "",
    dateOfBirth: "",
    id: "",
    occupation: "",
    gender: Gender.Female,
  });

  try {
    const { id } = useParams<{ id: string }>();
    const result = await axios.get(`${apiBaseUrl}/patients/id/${id}`);
    setPerson(result.data);
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      console.error(e?.response?.data || "Unrecognized axios error");
    } else {
      console.error("Unknown error", e);
    }
  }

  return (
    <div>
      <Button component={Link} to="/">
        home
      </Button>
      <p>{`${person.name} is born on ${person.dateOfBirth} and is a ${person.gender}`}</p>
    </div>
  );
};

export default Person;
