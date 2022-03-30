// Getting the argument
const arg1 = process.argv[2];
const arg2 = process.argv[3];

// Defining the interface
interface argReturn {
  one: number;
  two: number;
}

// Parsing the values
const parseArguement = (firstArg: string, secondArg: string): argReturn {
    
}

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

console.log(calculateBMI(183, 100));
