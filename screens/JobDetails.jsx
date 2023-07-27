import { useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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
import * as Linking from "expo-linking";
import analytics from "@react-native-firebase/analytics";

const JobDetails = ({ navigation }) => {
  const route = useRoute();
  const { job, isLoading, isSuccess } = useSelector((state) => state.jobs);
  const [applyStatus, setApplyStatus] = useState(false);
  const { jobId } = route.params;

  const dispatch = useDispatch();

  useEffect(() => {
    if (job._id) {
      analytics().logEvent("job_opened", {
        jobId: job._Id,
        jobName: job.title,
      });
    }
  }, [job]);

  useEffect(() => {
    dispatch(singleJob(jobId));
    return () => dispatch(reset);
  }, [jobId]);

  useEffect(() => {
    if (applyStatus && isSuccess) {
      // Set the apply status to false
      setApplyStatus(false);

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

  const buttonGenerator = (job) => {
    let text = "Apply";
    let location = () => {
      handleApply(job._id);
    };

    if (job.email) {
      text = "Email to apply";
      location = () => {
        Linking.openURL(`mailto:${job.email}`);
      };
    }

    if (job.phone) {
      text = "Call Now";
      location = () => {
        Linking.openURL(`tel:${job.phone}`);
      };
    }

    if (job.applied) {
      text = "Already applied";
    }

    return (
      <TouchableOpacity
        className={`bg-green-600 my-4 py-4 w-[100%] text-center rounded-full shadow-xl px-7 mx-auto ${
          job?.applied && "text-dimmed opacity-50 bg-zinc-900"
        }`}
        disabled={job?.applied}
        onPress={() => {
          analytics().logEvent("job_applied", {
            jobId: job._Id,
            jobName: job.title,
            method: text,
          });
          location();
        }}
      >
        <Text className="text-white  text-center text-md font-[PoppinsSemiBold]">
          {text}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    job && (
      <SafeAreaView className="bg-black flex-1">
        <ScrollView className="flex-1 mt-7  bg-black">
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
          <View className="flex-col justify-between bg-zinc-900 p-4 mt-4 ">
            <Title title="Description" />

            <Text className="text-white text-zine-500 font-[PoppinsRegular]">
              {job?.desc}
            </Text>
          </View>
        </ScrollView>
        <View className="justify-center items-center">
          {buttonGenerator(job)}
        </View>
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
