import { View, Text, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  item: {
    padding: 20,
    backgroundColor: "white",
    width: Dimensions.get("window").width,
    paddingBottom: 10,
  },
  picture: {
    height: 20,
    width: 20,
  },
});

const RepositoryItem = ({
  id,
  fullName,
  description,
  language,
  forksCount,
  stargazersCount,
  ratingAverage,
  reviewCount,
  imageURL,
}) => {
  console.log(imageURL);
  return (
    <View key={id} style={styles.item}>
      <Image style={styles.picture} source={{ uri: imageURL }}></Image>
      <Text>
        {`Name: ${fullName}\nForks = ${forksCount}\nStar Gazers = ${stargazersCount}\nDescription = ${description}\nLanguage = ${language}\nAverage Rating = ${ratingAverage}\nReview Count = ${reviewCount}\n`}
      </Text>
    </View>
  );
};

export default RepositoryItem;
