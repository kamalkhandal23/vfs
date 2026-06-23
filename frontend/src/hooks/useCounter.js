import { useEffect, useState } from "react";

export function useCounter(end, duration, startTrigger) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startTrigger) return; 

    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = timestamp - startTime;
      const value = Math.min((progress / duration) * end, end);

      setCount(Math.floor(value));

      if (progress < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [end, duration, startTrigger]);

  return count;
}