import { useEffect, useState } from "react";

import { View, ActivityIndicator, FlatList } from "react-native";

import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { reset, getJobs } from "../features/jobs/jobsSlice";

const Jobs = ({ navigation }) => {
  const { jobs, isLoading } = useSelector((state) => state.jobs);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobs(page));

    return () => {
      return () => dispatch(reset());
    };
  }, []);

  if (isLoading && page == 0) {
    return (
      <View
        style={{ backgroundColor: "#000" }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator color="gray" />
        </View>
      </View>
    );
  }

  const loadItems = () => {
    // Set the page
    const nextPage = page + 1;

    // Set the next page jobs
    dispatch(getJobs(nextPage));

    // Set the new page
    setPage(nextPage);
  };

  const renderJobs = ({ item }) => {
    return (
      <Post
        onPress={() => navigation.navigate("Job", { jobId: item._id })}
        location={item?.location?.address}
        hiringNo={1}
        timing={item?.timing}
        name={item?.title}
        tags={item?.tags}
        estimatedEarnings={item?.estimatedEarnings}
        wage={item?.wage}
        pill
      />
    );
  };
  const renderLoader = () => {
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator color="white" size="large" />
    </View>;
  };

  return (
    jobs && (
      <View className="flex-1 bg-black">
        <FlatList
          data={jobs}
          renderItem={renderJobs}
          keyExtractor={(item) => item._id}
          className="flex-1 bg-black"
          contentContainerStyle={{ flexGrow: 1 }}
          ListFooterComponent={renderLoader}
          ListFooterComponentStyle={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "#000",
          }}
          onEndReached={loadItems}
          onEndReachedThreshold={0.5}
        />
      </View>
    )
  );
};

export default Jobs;
