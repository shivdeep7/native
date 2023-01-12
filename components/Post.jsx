import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Post = ({ name, location, hiringNo, wage }) => {
  return (
    <View style={styles.post}>
      <View style={styles.postInfo}>
        <Text style={styles.title}>{name}</Text>
        <Text style={{ color: "#999999" }}>{location}</Text>
        <Text style={{ color: "#999999" }}>Hiring: {hiringNo} Candidates</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text>${wage}/hour</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    padding: 20,
    paddingVertical: 30,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    display: "block",
    marginBottom: 3,
  },
  postInfo: {
    flex: 1,
  },
});

export default Post;
