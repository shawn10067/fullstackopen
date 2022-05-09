import "@testing-library/jest-native/extend-expect";
import { render, toHaveTextContent } from "@testing-library/react-native";
import { RepositoryListContainer } from "../components/RepositoryList";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };
      const { getAllByTestId } = render(
        <RepositoryListContainer
          repositories={repositories}
        ></RepositoryListContainer>
      );

      // overall render length
      const renderedRepositories = getAllByTestId("repositoryItem");
      expect(renderedRepositories).toHaveLength(2);

      // repository names
      const renderedNames = getAllByTestId("repositoryItemName");
      const [firstName, secondName] = renderedNames;
      expect(firstName).toHaveTextContent("jaredpalmer/formik");
      expect(secondName).toHaveTextContent("async-library/react-async");

      // repository languages
      const renderedLanguages = getAllByTestId("repositoryItemLanguage");
      const [firstLanguage, secondLanguage] = renderedLanguages;
      expect(firstLanguage).toHaveTextContent("TypeScript");
      expect(secondLanguage).toHaveTextContent("JavaScript");

      // repository attribute
      const renderedAttributes = getAllByTestId("repositoryItemAttr");
      const [firstAttribute, secondAttribute] = renderedAttributes;
      expect(firstAttribute).toHaveTextContent(
        "22kStars1.6kForks3Reviews88Ratings"
      );
      expect(secondAttribute).toHaveTextContent(
        "1.8kStars69Forks3Reviews72Ratings"
      );
    });
  });
});
