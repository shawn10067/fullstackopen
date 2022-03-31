// getting the server
import express from "express";
import { parseArguement, calculateBMI } from "../fatcalc/bmiCalculator";
import {
  parseArgumentArray,
  calculateExcersize,
} from "../fatcalc/excersizeCalc";
import bodyParser from "body-parser";

// creating the server
const app = express();
app.use(bodyParser.json());

// hello endpoint
app.get("/hello", (_req, res) => {
  res.send("hello world").end();
});

// bmi endpoint
app.get("/bmi", (req, res) => {
  // getting the query
  const query = req.query;
  const height = String(query.height);
  const weight = String(query.weight);

  // inputting the arguments
  try {
    const { one, two } = parseArguement(height, weight);
    const bmi = calculateBMI(one, two);
    res
      .json({
        height: one,
        weight: two,
        bmi,
      })
      .end();
  } catch (e) {
    if (e instanceof Error) {
      res
        .json({
          Error: `Malformatted arguments: ${e.message}`,
        })
        .end();
    }
  }
});

// excersize endpoint
app.post("/excersize", (req, res) => {
  let requestBody = req.body;
  try {
    console.log(req.body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  } catch (e) {
    if (e instanceof Error) {
      return res
        .json({
          error: "Malformatted parameters in body JSON",
          output: e.message,
        })
        .end();
    } else {
      return;
    }
  }

  if (!requestBody.target) {
    return res
      .json({
        error: "Malformatted parameters in target",
      })
      .end();
  }

  if (isNaN(Number(requestBody.target))) {
    return res
      .json({
        error: "Malformatted parameters in body target",
      })
      .end();
  }

  //console.log(requestBody);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const fullArray = [
    "root",
    "excersize",
    Number(requestBody.target),
    ...requestBody.daily_exercises,
  ];
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const { workout, target } = parseArgumentArray(fullArray);
    const result = calculateExcersize(workout, target);
    return res.json(result).end();
  } catch (e) {
    console.log("something went wrong");
    if (e instanceof Error) {
      return res
        .json({
          error: "Malformatted parameters",
        })
        .end();
    } else {
      return;
    }
  }
});

// starting server
const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
