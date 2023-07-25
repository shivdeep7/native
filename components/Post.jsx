import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Pill from "./Pill";

const Post = ({
  name,
  timing,
  location,
  hiringNo,
  wage,
  estimatedEarnings,
  onPress,
  pill = false,
  categories = [],
  tags = [],
}) => {
  return (
    <TouchableOpacity
      style={styles.post}
      onPress={onPress}
      className="bg-zinc-900 p-8 border border-zinc-700 mt-3 w-[98%] rounded-xl shadow-xl"
    >
      <View style={styles.postInfo}>
        <Text className="text-white text-xl font-[PoppinsMedium] font-[700]">
          {name}
        </Text>
        <Text className="text-zinc-400 font-[PoppinsMedium] mt-2">
          {timing}
        </Text>
        <Text className="text-zinc-400 font-[PoppinsMedium]">{location}</Text>
        <View className="flex-row">
          {tags.length > 0 &&
            tags.map((tag) => {
              return (
                <Pill
                  className={`bg-yellow-500 w-[auto] p-1 items-center mt-4 mr-2 px-4 ${tag.color}`}
                  textColor={tag.text}
                >
                  {tag.name}
                </Pill>
              );
            })}
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <View>
          <Text className="text-white text-xl font-[Poppins] font-[700]">
            ${estimatedEarnings}
          </Text>
          <Text className="text-zinc-400 font-[Poppins] font-[600]">
            ${wage}/hr
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  post: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  title: {
    fontSize: 18,
    color: "white",
    fontWeight: "700",
    display: "block",
    marginBottom: 3,
  },
  postInfo: {
    flex: 1,
  },
});

export default Post;
