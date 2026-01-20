import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import Header from "@/components/Header";
import { Octicons } from "@expo/vector-icons";

const LikedYou = () => {
  const button = () => <Octicons name="filter" size={24} color="black" />;
  return (
    <ScrollView style={{ paddingHorizontal: 8 }}>
      <Header headerTitle={"Liked You"} button={button} />
      <Text style={{ fontWeight: "300" }}>
        When people are into you, they'll appear here. Enjoy
      </Text>
      
    </ScrollView>
  );
};

export default LikedYou;

const styles = StyleSheet.create({});
