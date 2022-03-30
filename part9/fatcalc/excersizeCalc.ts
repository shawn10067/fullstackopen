interface excersizeReturn {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

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

console.log(calculateExcersize([3, 0, 2, 4.5, 0, 3, 1], 2));
