import { useState, useEffect, useRef } from 'react';

export const useClock = () => {
  const [time, setTime] = useState(new Date());
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const syncToNextSecond = () => {
      const now = new Date();
      const delay = 1000 - now.getMilliseconds();
      
      // 次の秒まで待機
      setTimeout(() => {
        setTime(new Date());
        
        // 1秒ごとに更新
        intervalRef.current = setInterval(() => {
          setTime(new Date());
        }, 1000);
      }, delay);
    };

    syncToNextSecond();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const formatTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  return {
    time,
    formattedTime: formatTime(time),
    formattedDate: formatDate(time),
  };
};