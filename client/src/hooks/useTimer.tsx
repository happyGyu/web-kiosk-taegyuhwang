import { useEffect, useState } from 'react';

export default function useTimer(time: number, callback: () => void) {
  const [leftTime, setLeftTime] = useState(time);

  useEffect(() => {
    const timerId = setInterval(() => {
      setLeftTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (leftTime > 0) return;
    callback();
  }, [leftTime]);

  return leftTime;
}
