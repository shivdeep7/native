import { View, Text, ImageBackground, Image, ScrollView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import CustomStatusBar from "../components/StatusBar";
import Button from "../components/Button";
import { Audio, Video } from "expo-av";
import successMp3 from "../assets/media/audio/success.mp3";
import successMp4 from "../assets/media/audio/success.mp4";

const Success = ({ navigation }) => {
  const video = useRef();
  const [status, setStatus] = useState({});
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(successMp3);
    await sound.playAsync();
  };

  useEffect(() => {
    status >= 3000 && video.current.pauseAsync();
  }, [status]);

  useEffect(() => {
    playSound();
  }, []);

  return (
    <ScrollView
      style={{
        padding: 20,
        backgroundColor: "#000",
      }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <CustomStatusBar color="#000" style="light-content" />
      <View className="flex-1 justify-center p-5">
        <View className="items-center ">
          <Video
            ref={video}
            source={successMp4}
            useNativeControls={false}
            resizeMode="contain"
            shouldPlay
            style={{ width: 420, height: 200 }}
            onPlaybackStatusUpdate={(status) =>
              setStatus(() => status.positionMillis)
            }
          />
        </View>
        <View className="items-center mb-5">
          <Text className="text-white text-center font-[PoppinsSemiBold] mt-3 text-3xl">
            Well done!
          </Text>
          <Text className="text-white text-center font-[PoppinsMedium] text-lg">
            You have applied for the job. We will be in touch shorty.
          </Text>
        </View>

        <Button
          text="Back home"
          backgroundColor="bg-white"
          borderColor="bg-gray-400"
          textColor="black"
          onPress={() => navigation.navigate("JobsList")}
        />
      </View>
    </ScrollView>
  );
};

export default Success;
