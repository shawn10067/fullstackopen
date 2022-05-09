import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
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

export const RepositoryListContainer = ({ repositories }) => {
  const navigator = useNavigate();
  // Get the nodes from the edges array

  /*
  // For test runs
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  */

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
  const ItemSeparator = () => <View style={styles.separator} />;
  const ItemRenderer = ({ item }) => {
    console.log(item.id);
    return (
      <Pressable
        onPress={() => navigator(`/singleRepo/${item.id}`, { replace: true })}
      >
        <View style={{ margin: 5 }}>
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
        </View>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={ItemRenderer}
      style={styles.list}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
