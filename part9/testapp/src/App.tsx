const App = () => {
  // new types
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

  interface CourseNormalPart extends CoursePartBase {
    type: "normal";
    description: string;
  }
  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }

  interface CourseSubmissionPart extends CoursePartBase {
    type: "submission";
    description: string;
    exerciseSubmissionLink: string;
  }

  type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;

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
  ];

  // components

  // header
  const Header = ({ title }: { title: string }) => {
    return <h2>{title}</h2>;
  };

  //  content
  const Content = ({ courses }: { courses: Array<CoursePartBase> }) => {
    const mappedCourses = courses.map((val) => {
      return (
        <p>
          {val.name} {val.exerciseCount}
        </p>
      );
    });
    console.log(mappedCourses);
    return (
      <div>
        <p>{mappedCourses}</p>
      </div>
    );
  };

  // total
  const Total = ({ courses }: { courses: Array<CoursePartBase> }) => {
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
