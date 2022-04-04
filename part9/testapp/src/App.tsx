const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const App = () => {
  // new types
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

  interface CoursePartDescription extends CoursePartBase {
    description: string;
  }

  interface CourseNormalPart extends CoursePartDescription {
    type: "normal";
  }
  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }

  interface CourseSubmissionPart extends CoursePartDescription {
    type: "submission";
    exerciseSubmissionLink: string;
  }

  interface CourseRequirementPart extends CoursePartDescription {
    type: "special";
    requirements: Array<string>;
  }

  type CoursePart =
    | CourseNormalPart
    | CourseProjectPart
    | CourseSubmissionPart
    | CourseRequirementPart;

  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal",
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special",
    },
  ];

  // components
  // header
  const Header = ({ title }: { title: string }) => {
    return <h2>{title}</h2>;
  };

  // part
  const Part = ({ element }: { element: CoursePart }): JSX.Element => {
    switch (element.type) {
      case "normal":
        return (
          <p key={element.name}>
            {element.name}
            <ul>
              <li>{element.exerciseCount}</li>
              <li>{element.description}</li>
            </ul>
          </p>
        );
      case "groupProject":
        return (
          <p key={element.name}>
            {element.name}
            <ul>
              <li>{element.exerciseCount}</li>
              <li>{element.groupProjectCount}</li>
            </ul>
          </p>
        );
      case "submission":
        return (
          <p key={element.name}>
            {element.name}
            <ul>
              <li>{element.exerciseCount}</li>
              <li>{element.description}</li>
              <li>{`Submittion link: ${element.exerciseSubmissionLink}`}</li>
            </ul>
          </p>
        );
      case "special":
        return (
          <p key={element.name}>
            {element.name}
            <ul>
              <li>{element.exerciseCount}</li>
              <li>{element.description}</li>
              <li>{`Requirements: ${element.requirements.join(", ")}`}</li>
            </ul>
          </p>
        );
      default:
        return assertNever(element);
    }
  };

  // content
  const Content = ({ courses }: { courses: Array<CoursePart> }) => {
    const mappedCourses = courses.map((val) => {
      return <Part element={val} />;
    });
    console.log(mappedCourses);
    return <div>{mappedCourses}</div>;
  };

  // total
  const Total = ({ courses }: { courses: Array<CoursePart> }) => {
    return (
      <p>
        Number of exercises{" "}
        {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    );
  };

  return (
    <div>
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

export default App;
