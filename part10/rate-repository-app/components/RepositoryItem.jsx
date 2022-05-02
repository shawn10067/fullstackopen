import { View, Text } from "react-native";

const RepositoryItem = ({
  id,
  fullName,
  description,
  language,
  forksCount,
  stargazersCount,
  ratingAverage,
  reviewCount,
}) => {
  return (
    <View key={id}>
      <Text>
        {`Name = ${fullName}\nForks = ${forksCount}\nStar Gazers = ${stargazersCount}\nDescription = ${description}\nLanguage = ${language}\nAverage Rating = ${ratingAverage}\nReview Count = ${reviewCount}\n`}
      </Text>
    </View>
  );
};

export default RepositoryItem;
