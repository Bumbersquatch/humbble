import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import React from "react";
import Header from "@/components/Header";
import { AntDesign, Ionicons, Octicons } from "@expo/vector-icons";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const PLANS = [
  { plan: "Get exclusive photo insights", p1: true, p2: true },
  { plan: "Fast track your likes", p1: true, p2: true },
  { plan: "Standout every day", p1: true, p2: true },
  { plan: "Unlimited likes", p1: true, p2: false },
  { plan: "See who liked you", p1: true, p2: false },
  { plan: "Advanced filters", p1: true, p2: false },
  { plan: "Incognito mode", p1: true, p2: false },
  { plan: "Two compliments a weeks", p1: true, p2: true },
];

const profile = () => {
  const headerbutton = () => (
    <AntDesign name="setting" size={24} color="black" />
  );
  const router = useRouter();
  const navigation = useNavigation();
  const { logout } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            try {
              await logout();
              navigation.reset({
                index: 0,
                routes: [{ name: "auth/signin" }],
              });
            } catch (error: any) {
              Alert.alert("Error", error.message || "Failed to logout");
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <ScrollView style={{ paddingHorizontal: 8 }}>
      <View style={{ gap: 10 }}>
        <Header headerTitle={"Profile"} button={headerbutton} />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Avatar
            size={80}
            image="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <View>
            <Text style={{ fontSize: 22, fontWeight: "600" }}>Prakash, 27</Text>
            <Button
              style={{ backgroundColor: "#ebebeb" }}
              textStyle={{ color: "#1c1c1c" }}
              onPress={() => router.replace("/auth/signin")}
            >
              Complete profile
            </Button>
          </View>
        </View>
        
        <Button
          style={{ backgroundColor: "#ff4444", marginTop: 20 }}
          textStyle={{ color: "white" }}
          onPress={handleLogout}
        >
          Logout
        </Button>
      </View>
    </ScrollView>
  );
};

export default profile;

const styles = StyleSheet.create({
  tableItem: {
    flexDirection: "row",
    paddingHorizontal: 5,
    borderBottomWidth: 2,
    paddingVertical: 5,
    borderStyle: "solid",
    borderRadius: 1,
    borderColor: "#f0eded",
  },
  row1: { width: "40%" },
  row2: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  row3: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  table: {
    width: "100%",
    gap: 4,
  },
  circle: {
    borderRadius: 40,
    height: 40,
    width: 40,
    backgroundColor: "#ffa600",
    justifyContent: "center",
    alignItems: "center",
  },
});
