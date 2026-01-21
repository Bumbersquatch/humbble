import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { AntDesign, Ionicons, Octicons } from "@expo/vector-icons";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const profile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const headerbutton = () => (
    <AntDesign name="setting" size={24} color="black" />
  );
  const router = useRouter();
  const navigation = useNavigation();
  const { logout, user, userData, fetchUserData } = useAuth();

  // Refetch user data when needed
  useEffect(() => {
    const refetchData = async () => {
      if (user && !userData) {
        setLoading(true);
        try {
          await fetchUserData(user.uid);
          setError(null);
        } catch (err: any) {
          setError(err.message || "Failed to fetch user data");
        } finally {
          setLoading(false);
        }
      }
    };
    refetchData();
  }, [user]);

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
        
        {loading && <Text style={{ fontSize: 16, textAlign: "center", marginTop: 20 }}>Loading user data...</Text>}
        
        {error && <Text style={{ fontSize: 16, color: "red", textAlign: "center", marginTop: 20 }}>{error}</Text>}
        
        {userData && (
          <>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Avatar
                size={80}
                image={userData.profileImage || "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
              />
              <View>
                <Text style={{ fontSize: 22, fontWeight: "600" }}>
                  {userData.first_name && userData.last_name
                    ? `${userData.first_name} ${userData.last_name}`
                    : userData.first_name || userData.email || "User"}
                  {userData.age ? `, ${userData.age}` : ""}
                </Text>
                <Text style={{ fontSize: 14, color: "#666", marginTop: 4 }}>
                  {userData.email}
                </Text>
                <Button
                  style={{ backgroundColor: "#ebebeb", marginTop: 8 }}
                  textStyle={{ color: "#1c1c1c" }}
                  onPress={() => router.replace("/auth/signin")}
                >
                  Edit Profile
                </Button>
              </View>
            </View>

            {/* Display additional user data if available */}
            {(userData.bio || userData.location || userData.phone) && (
              <View style={{ marginTop: 20, paddingHorizontal: 10, gap: 10 }}>
                {userData.bio && (
                  <View>
                    <Text style={{ fontSize: 12, color: "#999", fontWeight: "600" }}>BIO</Text>
                    <Text style={{ fontSize: 14, marginTop: 4 }}>{userData.bio}</Text>
                  </View>
                )}
                {userData.location && (
                  <View>
                    <Text style={{ fontSize: 12, color: "#999", fontWeight: "600" }}>LOCATION</Text>
                    <Text style={{ fontSize: 14, marginTop: 4 }}>{userData.location.lat}</Text>
                  </View>
                )}
              </View>
            )}
          </>
        )}
        
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
