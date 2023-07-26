import Constants, { ExecutionEnvironment } from "expo-constants";

// `true` when running in Expo Go.
const isExpoGo =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

let analytics;
if (!isExpoGo) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  analytics = require("@react-native-firebase/analytics").default;
}

export async function logLevelComplete(level, moves) {
  if (isExpoGo) {
    console.log(
      "levelComplete analytics event, level: ",
      level,
      "moves: ",
      moves
    );
  } else {
    await analytics().logEvent("level_complete", {
      level: level,
      moves: moves,
    });
  }
}
