import { useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Title from "../components/Title";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { reset, singleJob, applyJob } from "../features/jobs/jobsSlice";
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";

const JobDetails = ({ navigation }) => {
  const route = useRoute();
  const { job, isLoading, isSuccess } = useSelector((state) => state.jobs);
  const [applyStatus, setApplyStatus] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(singleJob(route.params.id));
    return () => dispatch(reset);
  }, []);

  useEffect(() => {
    console.log("Applied status run");
    if (applyStatus && isSuccess) {
      // Set the apply status to false
      setApplyStatus(false);
      console.log("Applied status run 1");

      // Navigate the user to success page
      navigation.navigate("Success");
    }
  }, [applyStatus]);

  if (isLoading) {
    return (
      <ScrollView
        style={{ backgroundColor: "#000" }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator color="gray" />
        </View>
      </ScrollView>
    );
  }

  // Apply for the job
  const handleApply = (job) => {
    dispatch(applyJob(job));
    setApplyStatus(true);
  };

  return (
    job && (
      <SafeAreaView className="bg-black flex-1">
        <ScrollView className="flex-1 mt-7 ">
          <View className="flex flex-row items-center mb-5">
            <BackButton />
            <View>
              <Text className="text-white font-[PoppinsSemiBold]">
                Job Details
              </Text>
              <Text className="text-white font-[PoppinsLight]">
                {moment(job.createdOn).format("DD MMMM, YYYY")}
              </Text>
            </View>
          </View>
          <View className="flex-row justify-between bg-zinc-900 p-5">
            <View>
              <Text className="text-white text-xl font-[PoppinsMedium]">
                {job?.title}
              </Text>
              <Text className="text-white text-zine-500 font-[PoppinsRegular]">
                {job?.timing}
              </Text>
            </View>
            <View>
              <Text className="text-white text-xl font-[PoppinsMedium]">
                ${job?.estimatedEarnings}
              </Text>
              <Text className="text-white text-zine-500 font-[PoppinsRegular]">
                ${job?.wage}/hr
              </Text>
            </View>
          </View>
          <View className="flex-col justify-between bg-zinc-900 mt-4">
            <View className="p-5">
              <Title title="Address" />

              <Text className="text-white text-zine-500 font-[PoppinsMedium] mb-3">
                {job?.location?.address}
              </Text>
            </View>

            <MapView
              style={styles.map}
              initialRegion={{
                latitude: job?.location?.latitude,
                longitude: job?.location?.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{
                  latitude: job?.location?.latitude,
                  longitude: job?.location?.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              />
            </MapView>
          </View>
          <View className="flex-col justify-between bg-zinc-900 p-4 mt-4">
            <Title title="Description" />

            <Text className="text-white text-zine-500 font-[PoppinsRegular] mb-3">
              {job?.desc}
            </Text>
          </View>
          <View className="p-4">
            <Button
              disabled={job?.applied}
              text={job?.applied ? "Already applied" : "Apply now"}
              onPress={() => handleApply(job._id)}
              backgroundColor="bg-white"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: 250,
  },
});

export default JobDetails;
