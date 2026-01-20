import { SuggestedUsers } from "@/DB/userDB";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Swiper from "react-native-deck-swiper";

const { width, height } = Dimensions.get("window");

const PeopleCard = () => {
  return (
    <View style={styles.container}>
      <Swiper
        cards={SuggestedUsers}
        renderCard={(card) => (
          <View style={styles.card}>
            <ImageBackground source={{ uri: card.image }} style={styles.image}>
              <View style={styles.infoSection}>
                <Text style={styles.text}>
                  {card.name}, {card.age}
                </Text>
              </View>
            </ImageBackground>
          </View>
        )}
        infinite
        backgroundColor="transparent"
        cardVerticalMargin={10}
        stackSize={3}
        overlayLabels={{
          left: {
            title: (
              <View style={[styles.overlayLabel, styles.leftLabel]}>
                <AntDesign name="close" size={100} color="red" />
              </View>
            ),
            style: {
              wrapper: {
                justifyContent: "center",
                alignItems: "center",
              },
            },
          },
          right: {
            title: (
              <View style={[styles.overlayLabel, styles.rightLabel]}>
                <Ionicons
                  name="checkmark-circle-sharp"
                  size={100}
                  color="green"
                />
              </View>
            ),
            style: {
              wrapper: {
                justifyContent: "center",
                alignItems: "center",
              },
            },
          },
        }}
        disableTopSwipe={true}
        disableBottomSwipe={true}
      />
    </View>
  );
};

export default PeopleCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: width * 0.9,
    height: height * 0.7,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  infoSection: {
    width: "100%",
    height: 60,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  overlayLabel: {
    position: "absolute",
    top: "50%",
    // transform: [{ translateY: -30 }],
  },
  leftLabel: {
    left: 30,
  },
  rightLabel: {
    right: 30,
  },
});
