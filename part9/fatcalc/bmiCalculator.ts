// Defining the interface
interface argReturn {
  one: number;
  two: number;
}

// Parsing the values
const parseArguement = (firstArg: string, secondArg: string): argReturn => {
  // if there's not enough arguments
  if (process.argv.length !== 4) {
    throw new Error("not enough arguments");
  }

  // assigning number counterparts
  const firstNum: number = Number(firstArg);
  const secondNum: number = Number(secondArg);

  // if the numbers aren't valid
  if (isNaN(firstNum) || isNaN(secondNum)) {
    throw new Error("Not numbers");
  }

  // returning the arguments
  return {
    one: firstNum,
    two: secondNum,
  };
};

// Actual value
const calculateBMI = (height: number, weight: number): string => {
  // declaring metres and calculating BMI
  const metres: number = height / 100;
  const BMI = weight / Math.pow(metres, 2);

  // returning appropriate sentence
  if (BMI < 18.5) {
    return "Underweight (not healthy weight - gain some)";
  } else if (BMI >= 25 && BMI < 30) {
    return "Overweight (could be better weight)";
  } else if (BMI >= 30) {
    return "Obese (not healthy weight)";
  } else {
    return "Normal (healthy weight)";
  }
};

try {
  // Getting the argument
  const arg1 = process.argv[2];
  const arg2 = process.argv[3];

  // getting the parsed info
  const { one, two } = parseArguement(arg1, arg2);
  console.log(one, two);
  // printing the output
  console.log(calculateBMI(one, two));
} catch (e) {
  console.log("Something went wrong");
  if (e instanceof Error) {
    console.log("Error", e.message);
  }
}
