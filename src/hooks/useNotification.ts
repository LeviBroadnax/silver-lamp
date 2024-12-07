import "notyf/notyf.min.css";

import { useEffect, useState } from "react";

import { Notyf } from "notyf";

const notyf = new Notyf({
  duration: 3000,
  types: [
    {
      type: "success",
      backgroundColor: "green",
    },
    {
      type: "error",
      backgroundColor: "red",
    },
  ],
});

export const useNotification = () => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    if (message && type) {
      notyf.open({
        message,
        type,
      });
    }
  }, [message, type]);

  return {
    showSuccess: (message: string) => {
      setMessage(message);
      setType("success");
    },
    showError: (message: string) => {
      setMessage(message);
      setType("error");
    },
  };
};
