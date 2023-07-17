import { styled } from "nativewind";
import { View, Text } from "react-native";

const Pill = ({ children, textColor, ...props }) => {
  return (
    <View className="font-[PoppinsMedium] rounded-full" {...props}>
      <Text className={`text-dark ${textColor}`}>{children}</Text>
    </View>
  );
};

export default styled(Pill);
