const App = () => {
  const courseName = "Half Stack application development";
  interface CourseAttributes {
    name: string;
    exerciseCount: number;
  }
  const courseParts: Array<CourseAttributes> = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  // components

  // header
  const Header = ({ title }: { title: string }) => {
    return <h2>{title}</h2>;
  };

  //  content
  const Content = ({ courses }: { courses: Array<CourseAttributes> }) => {
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
  const Total = ({ courses }: { courses: Array<CourseAttributes> }) => {
    return (
      <p>
        Number of exercises{" "}
        {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    );
  };

  return (
    <div>
      <Header title={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

export default App;
