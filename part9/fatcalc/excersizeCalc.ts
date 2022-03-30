interface excersizeReturn {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface argReturnArray {
  workout: Array<number>;
  target: number;
}

const parseArgument = (proc: Array<string>): argReturnArray => {
  // destructuring the array
  const [location, command, ...inputs] = proc;

  // if there are not enough inputs
  if (inputs.length < 2) {
    throw new Error("not enough arguments");
  }

  // if not every element is a number
  if (!inputs.every((val) => !isNaN(Number(val)))) {
    throw new Error("some elements are not numbers");
  }

  // getting values
  const workout: Array<number> = inputs.slice(1).map((val) => Number(val));
  const target: number = Number(inputs[0]);

  // returning the values
  return {
    workout,
    target,
  };
};

const calculateExcersize = (
  workout: Array<number>,
  target: number
): excersizeReturn => {
  // determined values
  const daysWorked: Array<number> = workout.filter((val) => val !== 0);
  const periodLength: number = workout.length;
  const trainingDays: number = daysWorked.length;
  const average: number = daysWorked.reduce((a, b) => a + b, 0) / periodLength;
  const success: boolean = average >= target;

  // conditional values
  let rating: number = 0;
  let ratingDescription: string = "";

  // conditions
  if (average / target >= 1) {
    rating = 1;
    ratingDescription = "good";
  } else if (average / target >= 0.5) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "unsatisfactory";
  }

  // returning the value
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { workout, target } = parseArgument(process.argv);
  console.log(calculateExcersize(workout, target));
} catch (e) {
  console.log("Something went wrong:");
  if (e instanceof Error) {
    console.log("error:", e.message);
  }
}
