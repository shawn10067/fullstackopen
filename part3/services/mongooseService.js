const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

// connecting mongoose
mongoose
  .connect(url)
  .then(() => console.log("Connected"))
  .catch((e) => console.log("Failure connecting", e));

// creating a schema
const phoneScheme = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        let digits = 0;
        for (let char of v) {
          if (/\d/g.test(char)) {
            digits++;
          }
        }
        return digits > 7;
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
});

phoneScheme.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// creating a model
const phoneModel = mongoose.model("Book", phoneScheme);

// exporting the model
module.exports = phoneModel;
