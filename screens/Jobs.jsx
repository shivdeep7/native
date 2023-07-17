import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, ScrollView, ActivityIndicator } from "react-native";
import Title from "../components/Title";

import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { reset, getJobs } from "../features/jobs/jobsSlice";

const Jobs = ({ navigation }) => {
  const { jobs, isLoading } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(getJobs());

      return () => {
        return () => dispatch(reset());
      };
    }, [])
  );

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

  return (
    jobs && (
      <View className="flex-1 " style={{ backgroundColor: "#000" }}>
        <Title title="Available Shifts" className="px-8 mt-5" />

        {jobs &&
          jobs.map((job) => {
            return (
              <Post
                onPress={() => navigation.navigate("Job", { id: job._id })}
                location={job.location.address}
                hiringNo={1}
                timing={job.timing}
                name={job.title}
                tags={job.tags}
                estimatedEarnings={job.estimatedEarnings}
                wage={job.wage}
                pill
              />
            );
          })}
      </View>
    )
  );
};

export default Jobs;
