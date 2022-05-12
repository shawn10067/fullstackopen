import { useMutation, useQuery } from "@apollo/client";
import { getMe } from "../graphql/queries";
import { deleteReview } from "../graphql/mutations";
import { ReviewItem } from "./SingleRepositoryView";
import { FlatList, View } from "react-native";
import { useNavigate } from "react-router-native";
import { Button } from "react-native-paper";

const UserReviews = () => {
  const { loading, error, data, refetch } = useQuery(getMe, {
    variables: {
      includeReviews: true,
    },
  });

  let reviews = [];

  if (!loading && data.me != null) {
    console.log("me data", data.me);
    reviews = data.me.reviews.edges.map((val) => val.node);
  }
  return (
    <FlatList
      style={[
        {
          display: "flex",
          flexDirection: "column",
          margin: 10,
        },
      ]}
      data={reviews}
      renderItem={({ item }) => (
        <MyReviewItem review={item} refetch={refetch} />
      )}
      keyExtractor={({ id }) => id}
    />
  );
};

const MyReviewItem = ({ review, refetch }) => {
  console.log("my review item", review.id);
  const navigate = useNavigate();

  const [mutation] = useMutation(deleteReview, {
    variables: {
      deleteReviewId: review.id,
    },
  });

  const removeReview = async () => {
    await mutation();
    refetch();
  };

  const goToLink = (id) => {
    navigate(`/singleRepo/${id}`, { replace: true });
  };
  return (
    <View>
      <ReviewItem review={review}></ReviewItem>
      <Button onPress={() => removeReview(review.id, refetch)}>
        Remove Review
      </Button>
      <Button onPress={() => goToLink(review.repositoryId)}>
        Go to Repository
      </Button>
    </View>
  );
};

export default UserReviews;
