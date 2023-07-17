import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Jobs from "./Jobs";
import JobDetails from "./JobDetails";
import Success from "./Success";

const Stack = createNativeStackNavigator();

const JobsRoute = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="JobsList" component={Jobs} />
    </Stack.Navigator>
  );
};

export default JobsRoute;
