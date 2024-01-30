import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
} from "react-native";

import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/colors";
import { useEffect } from "react";

const deviceWidth = Dimensions.get("window").width;

function GameOverScreen({ roundsNumber, userNumber, onRestartGame }) {
  const { width, height } = useWindowDimensions();

  let content = (
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={require("../assets/images/success.png")}
      />
    </View>
  );

  if(width > 400) {
    content =     
        <View style={styles.imageContainerWide}>
            <Image
            style={styles.image}
            source={require("../assets/images/success.png")}
            />
        </View>
  }

  return (
    <View style={styles.rootContainer}>
      <Title>GAME OVER!</Title>
        {content}
      <Text style={styles.summaryText}>
        Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
        rounds to guess the number{" "}
        <Text style={styles.highlight}>{userNumber}</Text>.
      </Text>
      <PrimaryButton onPress={onRestartGame}>Start New Game</PrimaryButton>
    </View>
  );
}

export default GameOverScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: deviceWidth < 380 ? 150 : 300,
    height: deviceWidth < 380 ? 150 : 300,
    borderRadius: deviceWidth < 380 ? 75 : 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 20,
    textAlign: "center",
    marginBottom: deviceWidth > 400 ? 12 : 36,
  },
  highlight: {
    fontFamily: "open-sans",
    color: Colors.primary500,
  },
  imageContainerWide: {
    width: deviceWidth < 380 ? 150 : 180,
    height: deviceWidth < 380 ? 150 : 180,
    borderRadius: deviceWidth < 380 ? 75 : 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 16,
  },
});
