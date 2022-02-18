require("dotenv").config();
const phoneModel = require("./services/mongooseService");
const { response, json } = require("express");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// getting app constant and using the json parser
const app = express();
app.use(cors());
app.use(express.static("build"));
app.use(express.json());

// morgan configuration

morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :response-time[digits] ms - :res[content-length] :body"
  )
);

// main get application
app.get("/api/persons", (req, res, next) => {
  phoneModel.find({}).then((returnedArray) => {
    res.json(returnedArray).end();
  });
});

// info get
app.get("/info", (req, res, next) => {
  phoneModel.find({}).then((response) => {
    res.send(
      `Phonebook has info for ${response.length} people <br>${new Date(
        Date.now()
      ).toDateString()}`
    );
    res.end();
  });
});

// individual people get
app.get("/api/persons/:id", (req, res, next) => {
  const number = req.params.id;
  phoneModel
    .findById(number)
    .then((response) => {
      if (response) {
        res.json(response).end();
      } else {
        next(e);
        return res.end();
      }
    })
    .catch((e) => {
      next(e);
    });
});

// individual people delete
app.delete("/api/persons/:id", (req, res, next) => {
  const number = req.params.id;
  const castedNum = Number(number);
  phoneModel
    .findByIdAndDelete(number)
    .then(() => res.status(204).send("Deleted").end())
    .catch((e) => next(e));
});

// post request
app.post("/api/persons", (req, res, next) => {
  const jsonObj = req.body;

  if (!(jsonObj.name && jsonObj.number)) {
    return res.status(400).json({ error: "invalid format." }).end();
  }

  /*
  let found = false; 
  phoneModel
    .find({ name: jsonObj.name })
    .then((resp) => {
      found = true;
      phoneModel
        .updateOne(jsonObj.id, jsonObj, { new: true })
        .then((response) => res.json(response))
        .catch((e) => {
          found = true;
          next(e);
        });
    })
    .catch((e) => next(e));

  else if (phoneBook.find((val) => val.name === jsonObj.name)) {
    return res.status(400).json({ error: "already exists." }).end();
  } */

  const phoneObj = phoneModel(jsonObj);

  phoneObj
    .save()
    .then(() => {
      res.status(201).json(phoneObj).end();
    })
    .catch((e) => next(e));
});

// put request
app.put("/api/persons/:id", (req, res, next) => {
  const jsonObj = req.body;
  if (!(jsonObj.name && jsonObj.number)) {
    return res.status(400).json({ error: "invalid format." }).end();
  }

  phoneModel
    .validate(jsonObj)
    .then(() => {
      phoneModel
        .findByIdAndUpdate(req.params.id, jsonObj, { new: true })
        .then((response) => res.json(response))
        .catch((e) => next(e));
    })
    .catch((e) => next(e));
});

// error handling middleware
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// starting server
const PORT = process.env.PORT || 3001;
app.listen(PORT);
