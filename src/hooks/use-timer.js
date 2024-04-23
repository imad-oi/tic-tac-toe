import { useEffect, useState } from 'react';

export default function useTimer(_seconds=30) {
  const [seconds, setSeconds] = useState(_seconds);

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearTimeout(timerId); 
    }
  }, [seconds]);

  return [seconds, setSeconds]
}