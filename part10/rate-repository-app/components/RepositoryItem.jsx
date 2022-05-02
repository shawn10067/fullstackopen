import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";

const styles = StyleSheet.create({
  item: {
    margin: 5,
    padding: 10,
    backgroundColor: "white",
    width: Dimensions.get("window").width * 0.9,
    borderRadius: 14,
  },
  picture: {
    height: 70,
    width: 70,
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
    alignItems: "center",
    width: "100%",
  },
  infoView: {
    margin: 4,
    width: "70%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  attributeView: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  subHeadingAtr: {
    fontSize: 19,
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    margin: 2,
  },
  numericalAtr: {
    fontSize: 16,
    flex: 1,
    textAlign: "center",
    margin: 2,
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
        <View style={{ borderRadius: 10 }}>
          <Image style={styles.picture} source={{ uri: imageURL }}></Image>
        </View>
        <View style={styles.infoView}>
          <Text
            style={{
              fontFamily: Platform.OS === "ios" ? "Helvetica" : "Roboto",
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
          <View style={styles.attributeView}>
            <Text style={styles.subHeadingAtr}>
              {stargazersCount > 1000
                ? (stargazersCount / 1000).toPrecision(2) + "k"
                : stargazersCount}
            </Text>
            <Text style={styles.numericalAtr}>Stars</Text>
          </View>
          <View style={styles.attributeView}>
            <Text style={styles.subHeadingAtr}>
              {forksCount > 1000
                ? (forksCount / 1000).toPrecision(2) + "k"
                : forksCount}
            </Text>
            <Text style={styles.numericalAtr}>Forks</Text>
          </View>
          <View style={styles.attributeView}>
            <Text style={styles.subHeadingAtr}>{reviewCount}</Text>
            <Text style={styles.numericalAtr}>Reviews</Text>
          </View>
          <View style={styles.attributeView}>
            <Text style={styles.subHeadingAtr}>{ratingAverage}</Text>
            <Text style={styles.numericalAtr}>Ratings</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
