const mongoose = require("mongoose");

// ensuring that there are a correct number of arguments
if (process.argv.length < 3) {
  console.log("You don't have enough arguements");
  process.exit(1);
}

const variables = process.argv;

// holding the variables
const password = variables[2];
const name = variables[3];
const number = variables[4];

// connecting mongoose
mongoose.connect(
  `mongodb+srv://shawn10067:${password}@cluster0.5jgpy.mongodb.net/phonebook?retryWrites=true&w=majority`
);

// creating a schema
const phoneScheme = mongoose.Schema({
  name: String,
  number: String,
});

// creating a model
const phoneModel = mongoose.model("Book", phoneScheme);

// adding to the phonebook
if (process.argv.length > 3) {
  let newBook = phoneModel({
    name,
    number,
  });

  newBook.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log("phonebook:");

  phoneModel
    .find({})
    .then((result) => {
      result.forEach((element) => {
        console.log(element.name, element.number);
      });
    })
    .then(() => mongoose.connection.close());
}
