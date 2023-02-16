import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useError = (errorType) => {
  const [errors, setErrors] = useState({});
  const { isError, message } = useSelector((state) => state[errorType]);
  useEffect(() => {
    if (isError && typeof message == "object") {
      const object = {};
      message.map((error) => {
        object[error.param] = error.msg;
      });
      setErrors({ ...object });
    }

    if (isError && typeof message == "string") {
      setErrors(message);
    }

    if (!isError) {
      setErrors(null);
    }
  }, [isError, message]);

  return [
    errors,
    (state) => {
      setErrors(state);
    },
  ];
};
