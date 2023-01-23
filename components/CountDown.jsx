import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";

const CountDown = ({ setStatus, color = "text-dark", mins = 0, secs = 4 }) => {
  const [minutes, setMinutes] = useState(mins);
  const [seconds, setSeconds] = useState(secs);

  useEffect(() => {
    let interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          setStatus(false);
          clearInterval(interval);
        } else {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, minutes]);

  return (
    <View>
      <Text className={color}>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Text>
    </View>
  );
};

export default CountDown;
