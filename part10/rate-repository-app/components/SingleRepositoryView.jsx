import { View, Pressable, Text, Linking, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router-native";
import { useState } from "react";
import { getSingleRep } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const styles = StyleSheet.create({
  openButton: {
    alignSelf: "center",
    width: "40%",
    backgroundColor: "#1E90FF",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  openButtonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});

const SingleRepository = () => {
  const [repoInfo, setRepoInfo] = useState();
  const [done, setDone] = useState(false);
  const { id } = useParams();

  // getting the url query data
  const { data, error, loading } = useQuery(getSingleRep, {
    variables: {
      userId: id,
    },
  });

  if (!loading && !done) {
    setDone(true);
    console.log(data.repository);
    setRepoInfo(data.repository);
  }

  if (repoInfo) {
    const {
      id,
      fullName,
      description,
      language,
      forksCount,
      stargazersCount,
      ratingAverage,
      reviews,
      ownerAvatarUrl,
      url,
    } = repoInfo;
    // TODO: Make button with URL
    return (
      <View style={{ margin: 5 }}>
        <RepositoryItem
          id={id}
          fullName={fullName}
          description={description}
          language={language}
          forksCount={forksCount}
          stargazersCount={stargazersCount}
          ratingAverage={ratingAverage}
          reviewCount={reviews.totalCount}
          imageURL={ownerAvatarUrl}
        ></RepositoryItem>
        <Pressable
          onPress={() => Linking.openURL(url)}
          style={styles.openButton}
        >
          <Text style={styles.openButtonText}>Open In Github</Text>
        </Pressable>
      </View>
    );
  } else {
    return <></>;
  }
};

export default SingleRepository;
