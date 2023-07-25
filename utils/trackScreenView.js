import analytics from "@react-native-firebase/analytics";
import { useSelector } from "react-redux";

export default async function trackScreenView(screen) {
  const { user } = useSelector((state) => state.auth);

  // Set & override the MainActivity screen name
  await analytics().setUserId(12).setCurrentScreen(screen, screen);
}
