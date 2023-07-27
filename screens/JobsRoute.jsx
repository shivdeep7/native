import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Jobs from "./Jobs";

const Stack = createNativeStackNavigator();

const JobsRoute = () => {
  return (
    <View className="flex-1">
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="JobsList" component={Jobs} />
      </Stack.Navigator>
    </View>
  );
};

export default JobsRoute;
