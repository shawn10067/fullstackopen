import { useQuery } from "@apollo/client";
import { getMe } from "../graphql/queries";
import { ReviewItem } from "./SingleRepositoryView";
import { FlatList } from "react-native";

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
  return <ReviewItem review={review}></ReviewItem>;
};

export default UserReviews;
