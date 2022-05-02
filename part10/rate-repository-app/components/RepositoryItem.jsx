import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  item: {
    margin: 5,
    padding: 10,
    backgroundColor: "white",
    width: Dimensions.get("window").width * 0.9,
    borderRadius: 15,
  },
  picture: {
    height: 60,
    width: 60,
    borderRadius: 10,
    margin: 3,
  },
  displayView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
  },
  otherContentView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  infoView: {
    margin: 4,
    width: "70%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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
  return (
    <View key={id} style={styles.item}>
      <View style={styles.displayView}>
        <Image style={styles.picture} source={{ uri: imageURL }}></Image>
        <View style={styles.infoView}>
          <Text
            style={{
              fontFamily: "sans-serif",
              fontWeight: "bold",
              fontSize: 20,
              margin: 4,
            }}
          >
            {fullName}
          </Text>
          <Text style={{ margin: 4 }}>{description}</Text>
          <Text>
            <View>
              <Text
                style={{
                  backgroundColor: "#0366d6",
                  padding: 10,
                  borderRadius: 15,
                  color: "white",
                  margin: 4,
                }}
              >
                {language}
              </Text>
            </View>
          </Text>
        </View>
      </View>
      <View>
        <View style={styles.otherContentView}>
          <Text>{ratingAverage}</Text>
          <Text>{reviewCount}</Text>
          <Text>{stargazersCount}</Text>
          <Text>{forksCount}</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
