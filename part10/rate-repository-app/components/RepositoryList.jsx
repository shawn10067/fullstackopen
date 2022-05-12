import { FlatList, View, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useNavigate } from "react-router-native";
import useRepositories from "../utils/UseRepositories";
import RepositoryItem from "./RepositoryItem";
import { Menu, Button, Searchbar } from "react-native-paper";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  list: {
    display: "flex",
  },
});

export class RepositoryListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      input: "",
    };
  }

  setVisible = (condition) => {
    this.setState({
      ...this.state,
      visible: condition,
    });
  };

  setText = (val) => {
    this.setState({
      ...this.state,
      input: val,
    });
  };

  renderHeader = () => {
    const { setDirection, setOrder, setDone, refetch, debounced } = this.props;
    const openMenu = () => this.setVisible(true);
    const closeMenu = () => this.setVisible(false);

    return (
      <View>
        <Searchbar
          value={this.state.input}
          placeholder="Search"
          onChangeText={(text) => {
            this.setText(text);
            debounced(text);
          }}
          style={{ width: "100%" }}
        ></Searchbar>
        <Menu
          visible={this.state.visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>Show menu</Button>}
        >
          <Menu.Item
            title="Latest Repositories"
            onPress={() => {
              setOrder("CREATED_AT");
              setDirection("DESC");
              setDone(false);
            }}
          ></Menu.Item>
          <Menu.Item
            title="Highest Rated"
            onPress={() => {
              setOrder("RATING_AVERAGE");
              setDirection("DESC");
              setDone(false);
            }}
          ></Menu.Item>
          <Menu.Item
            title="Lowest Rated"
            onPress={() => {
              setOrder("RATING_AVERAGE");
              setDirection("ASC");
              setDone(false);
              refetch({
                orderBy: "RATING_AVERAGE",
                orderDirection: "ASC",
              });
            }}
          ></Menu.Item>
        </Menu>
      </View>
    );
  };

  render() {
    const { repositories, onEndReach } = this.props;
    // For test runs
    //const repositoryNodes = repositories
    //  ? repositories.edges.map((edge) => edge.node)
    //  : [];

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
      return (
        <Pressable
          onPress={() =>
            this.props.navigation(`/singleRepo/${item.id}`, {
              replace: true,
            })
          }
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
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const navigation = useNavigate();
  const [order, setOrder] = useState("CREATED_AT");
  const [direction, setDirection] = useState("DESC");
  const [searchTerm, setSearchTerm] = useState("");
  const { repositories, refetch, setDone, fetchMore } = useRepositories({
    order,
    direction,
    searchTerm,
  });

  const onEndReach = () => {
    console.log("end reached");
    fetchMore();
  };

  // Debounce callback
  const debounced = useDebouncedCallback((value) => {
    setSearchTerm(value);
    setDone(false);
  }, 500);

  return (
    <RepositoryListContainer
      repositories={repositories}
      setOrder={setOrder}
      setDirection={setDirection}
      refetch={refetch}
      setDone={setDone}
      navigation={navigation}
      debounced={debounced}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
