import { FlatList, View, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useNavigate } from "react-router-native";
import useRepositories from "../utils/UseRepositories";
import RepositoryItem from "./RepositoryItem";
import { Menu, Button, Searchbar } from "react-native-paper";
import { useState } from "react";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  list: {
    display: "flex",
  },
});

/*
const SortMenu = ({ setOrder, setDirection, refetch, setDone }) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<Button onPress={openMenu}>Show menu</Button>}
    >
      <Menu.Item
        title="Latest Repositories"
        onPress={() => {
          setOrder("CREATED_AT");
          setDirection("DESC");
          setDone(false);
          refetch({
            orderBy: "CREATED_AT",
            orderDirection: "DESC",
          });
        }}
      ></Menu.Item>
      <Menu.Item
        title="Highest Rated"
        onPress={() => {
          setOrder("RATING_AVERAGE");
          setDirection("DESC");
          setDone(false);
          refetch({
            orderBy: "RATING_AVERAGE",
            orderDirection: "DESC",
          });
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
  );
};
*/

export class RepositoryListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      input: "",
      value: "",
    };
  }

  setVisible = (condition) => {
    this.setState({
      ...this.state,
      visible: condition,
    });
  };

  setInput = (text) => {
    this.setState({
      ...this.state,
      input: text,
    });
  };

  renderHeader = () => {
    const { setDirection, setOrder, setDone, refetch } = this.props;
    const openMenu = () => this.setVisible(true);
    const closeMenu = () => this.setVisible(false);

    return (
      <View>
        <Searchbar
          value=""
          placeholder="Search"
          onChangeText={(text) => {
            this.props.setSearchTerm(text);
          }}
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
              refetch({
                orderBy: "CREATED_AT",
                orderDirection: "DESC",
              });
            }}
          ></Menu.Item>
          <Menu.Item
            title="Highest Rated"
            onPress={() => {
              setOrder("RATING_AVERAGE");
              setDirection("DESC");
              setDone(false);
              refetch({
                orderBy: "RATING_AVERAGE",
                orderDirection: "DESC",
              });
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
    const { repositories } = this.props;
    // Get the nodes from the edges array

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
      console.log(item.id);
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
      />
    );
  }
}

/*
export const RepositoryListContainer = ({
  repositories,
  setDirection,
  setOrder,
  refetch,
  setDone,
}) => {
  const navigator = useNavigate();
  // Get the nodes from the edges array
  
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
      ListHeaderComponent={() => {
        return (
          <SortMenu
            setOrder={setOrder}
            setDirection={setDirection}
            refetch={refetch}
            setDone={setDone}
          ></SortMenu>
        );
      }}
    />
  );
};

*/
const RepositoryList = () => {
  console.log("restarted list");
  const navigation = useNavigate();
  const [order, setOrder] = useState("CREATED_AT");
  const [direction, setDirection] = useState("DESC");
  const [searchTerm, setSearchTerm] = useState("");
  const [value] = useDebounce(searchTerm, 500);
  const { repositories, refetch, setDone } = useRepositories({
    order,
    direction,
  });

  let prevValue = value;

  setInterval(() => {
    if (prevValue !== value) {
      refetch({
        searchKeyword: searchTerm,
      });
    }
    prevValue = value;
  }, 500);

  return (
    <RepositoryListContainer
      repositories={repositories}
      setOrder={setOrder}
      setDirection={setDirection}
      refetch={refetch}
      setDone={setDone}
      navigation={navigation}
      value={value}
      setSearchTerm={setSearchTerm}
    />
  );
};

export default RepositoryList;
