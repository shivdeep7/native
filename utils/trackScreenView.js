import analytics from "@react-native-firebase/analytics";

export default async function trackScreenView(screen) {
  // Set & override the MainActivity screen name
  await analytics().logScreenView({
    screen_name: screen,
    screen_class: screen,
  });
}
