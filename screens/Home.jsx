import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CustomStatusBar from "../components/StatusBar";

import Post from "../components/Post";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useEffect } from "react";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const posts = [
    {
      name: "Warehouse Associate",
      wage: 25,
      location: "Brampton, Ontario",
      hiringNo: 2,
    },
    {
      name: "Warehouse Associate",
      wage: 25,
      location: "Brampton, Ontario",
      hiringNo: 2,
    },
    {
      name: "Warehouse Associate",
      wage: 25,
      location: "Brampton, Ontario",
      hiringNo: 2,
    },
    {
      name: "Warehouse Associate",
      wage: 25,
      location: "Brampton, Ontario",
      hiringNo: 2,
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
      <CustomStatusBar color="#000" style="light-content" />
      <Text style={styles.heading} className="font-[PoppinsBold]">
        Available Jobs
      </Text>

      {posts.map((i, index) => (
        <Post
          name={i.name}
          wage={i.wage}
          hiringNo={i.hiringNo}
          location={i.location}
          key={index}
        />
      ))}
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "#000",
          borderRadius: "100%",
          alignItems: "center",
          width: 100,
          alignSelf: "center",
          marginVertical: 20,
          elevation: 5,
        }}
      >
        <Text
          style={{ color: "#fff", fontWeight: "500" }}
          onPress={() => handleLogout()}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    backgroundColor: "#000",
    padding: 15,
    paddingTop: 30,
    color: "#fff",
    height: 80,
    fontWeight: "700",
    fontSize: "22px",
  },
});

export default Home;
