import { useState } from "react";

export default function useTimer(initialValue) {
  const [timer, setValue] = useState(initialValue);

  function setTimer(value) {
    let seconds = value % 60 < 10 ? 0 : "";
    let minutes = Math.floor((value / 60) % 60) < 10 ? 0 : "";
    let hours = (value / 3600) % 60 < 10 ? 0 : "";
    setValue(
      `${hours}${Math.floor((value / 3600) % 60)}:${minutes}${Math.floor(
        (value / 60) % 60
      )}:${seconds}${value % 60}`
    );
  }

  return { timer, setTimer };
}
