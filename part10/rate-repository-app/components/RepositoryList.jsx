import { FlatList, View, StyleSheet } from "react-native";
import useRepositories from "../utils/UseRepositories";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  list: {
    display: "flex",
  },
});
/*
const repositories = [
  {
    id: "jaredpalmer.formik",
    fullName: "jaredpalmer/formik",
    description: "Build forms in React, without the tears",
    language: "TypeScript",
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
  },
  {
    id: "rails.rails",
    fullName: "rails/rails",
    description: "Ruby on Rails",
    language: "Ruby",
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/4223?v=4",
  },
  {
    id: "django.django",
    fullName: "django/django",
    description:
      "The Web framework for perfectionists with deadlines and things to do.",
    language: "Python",
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/27804?v=4",
  },
  {
    id: "reduxjs.redux",
    fullName: "reduxjs/redux",
    description: "Predictable state container for JavaScript apps",
    language: "TypeScript",
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: "https://avatars3.githubusercontent.com/u/13142323?v=4",
  },
  {
    id: "randomPerson",
    fullName: "sanaLehal/Remax",
    description: "Best realtor in GTA.",
    language: "Real Estate Agent",
    forksCount: 5455,
    stargazersCount: 4455,
    ratingAverage: 100,
    reviewCount: 5,
    ownerAvatarUrl: "http://38797.alserver18.com/userfiles/images/top-img.jpg",
  },
];*/

const ItemSeparator = () => <View style={styles.separator} />;
const ItemRenderer = ({ item }) => {
  return (
    <RepositoryItem
      id={item.id}
      fullName={item.fullName}
      description={item.description}
      language={item.language}
      forksCount={item.forksCount}
      stargazersCount={item.stargazersCount}
      ratingAverage={item.ratingAverage}
      reviewCount={item.reviewCount}
      imageURL={item.ownerAvatarUrl}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges
        .map((edge) => edge.node)
        .map((val) => {
          return {
            ...val,
            reviewCount: val.reviews.totalCount,
          };
        })
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={ItemRenderer}
      style={styles.list}
    />
  );
};

export default RepositoryList;
