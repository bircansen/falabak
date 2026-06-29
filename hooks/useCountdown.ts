import { useEffect, useRef, useState } from "react";

interface CountdownState {
  hours: string;
  minutes: string;
  seconds: string;
  expired: boolean;
}

export function useCountdown(
  durationSeconds: number
): CountdownState {
  const targetRef = useRef(
    Date.now() + durationSeconds * 1000
  );

  const calculate = (): CountdownState => {
    const diff = targetRef.current - Date.now();

    if (diff <= 0) {
      return {
        hours: "00",
        minutes: "00",
        seconds: "00",
        expired: true,
      };
    }

    const totalSeconds = Math.floor(diff / 1000);

    return {
      hours: String(
        Math.floor(totalSeconds / 3600)
      ).padStart(2, "0"),
      minutes: String(
        Math.floor((totalSeconds % 3600) / 60)
      ).padStart(2, "0"),
      seconds: String(
        totalSeconds % 60
      ).padStart(2, "0"),
      expired: false,
    };
  };

  const [time, setTime] = useState<CountdownState>(
    calculate
  );

  useEffect(() => {
    targetRef.current =
      Date.now() + durationSeconds * 1000;

    setTime(calculate());

    const interval = setInterval(() => {
      const remaining = calculate();

      setTime(remaining);

      if (remaining.expired) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [durationSeconds]);

  return time;
}