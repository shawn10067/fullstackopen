import {
  View,
  Pressable,
  Text,
  Linking,
  StyleSheet,
  FlatList,
} from "react-native";
import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router-native";
import { useState } from "react";
import { getSingleRep } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { parseISO } from "date-fns";

const styles = StyleSheet.create({
  mainView: {
    margin: 10,
    flex: 1,
  },
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
  review: {
    margin: 10,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 20,
    display: "flex",
    width: "91%",
    flexDirection: "row",
    alignContent: "flex-end",
    justifyContent: "flex-end",
    alignSelf: "center",
  },
  numberReview: {
    flexGrow: 1,
    alignItems: "center",
  },
  numberReviewText: {
    padding: 20,
    textAlignVertical: "bottom",
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 25,
    color: "skyblue",
    borderRadius: "50%",
    borderColor: "lightblue",
    borderWidth: 5,
  },
  reviewContent: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    flexGrow: 2,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "flex-start",
  },
  reviewComment: {
    width: "70%",
    margin: 7,
    fontSize: 17,
    fontWeight: "normal",
  },
  reviewDate: {
    width: "15%",
    margin: 7,
    fontSize: 15,
    fontStyle: "italic",
    color: "grey",
  },
  reviewUser: {
    width: "15%",
    margin: 7,
    fontSize: 15,
    fontWeight: "bold",
  },
});

const RepositoryInfo = ({ repository }) => {
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
  } = repository;
  return (
    <View style={{ alignSelf: "center" }}>
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
      <Pressable onPress={() => Linking.openURL(url)} style={styles.openButton}>
        <Text style={styles.openButtonText}>Open In Github</Text>
      </Pressable>
    </View>
  );
};

const ReviewItem = ({ review }) => {
  const parsedDate = parseISO(review.createdAt);
  const date = parsedDate.toDateString();
  return (
    <View style={styles.review}>
      <View style={styles.numberReview}>
        <Text style={styles.numberReviewText}>{review.rating}</Text>
      </View>
      <View style={styles.reviewContent}>
        <Text style={styles.reviewComment}>{review.text}</Text>
        <Text style={styles.reviewDate}>{date}</Text>
        <Text style={styles.reviewUser}>{review.user.username}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const [repoInfo, setRepoInfo] = useState();
  const [reviews, setReviews] = useState();
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
    const gotReviews = data.repository.reviews.edges.map((val) => val.node);
    console.log(gotReviews);
    setReviews(gotReviews);
  }

  if (repoInfo) {
    return (
      <View style={styles.mainView}>
        <FlatList
          style={{
            display: "flex",
            flexDirection: "column",
          }}
          data={reviews}
          renderItem={({ item }) => <ReviewItem review={item} />}
          keyExtractor={({ id }) => id}
          ListHeaderComponent={() => <RepositoryInfo repository={repoInfo} />}
        />
      </View>
    );
  } else {
    return <></>;
  }
};

export default SingleRepository;
