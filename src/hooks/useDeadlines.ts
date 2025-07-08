import { useState, useEffect } from 'react';
import type { Deadline } from '../types/deadline';

const STORAGE_KEY = 'lab-clock-deadlines';

export const useDeadlines = () => {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setDeadlines(JSON.parse(saved));
    }
  }, []);

  const saveDeadlines = (newDeadlines: Deadline[]) => {
    setDeadlines(newDeadlines);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDeadlines));
  };

  const addDeadline = (title: string, datetime: string) => {
    if (deadlines.length >= 5) {
      alert('期限は最大5つまでしか設定できません');
      return;
    }
    const newDeadline: Deadline = {
      id: Date.now().toString(),
      title,
      datetime,
    };
    saveDeadlines([...deadlines, newDeadline]);
  };

  const removeDeadline = (id: string) => {
    saveDeadlines(deadlines.filter(d => d.id !== id));
  };

  const calculateTimeRemaining = (deadline: string) => {
    const targetDate = new Date(deadline);
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      return '期限切れ';
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const hoursStr = hours.toString().padStart(2, '0');
    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = seconds.toString().padStart(2, '0');

    return `残り${days}日 ${hoursStr}:${minutesStr}:${secondsStr}`;
  };

  return {
    deadlines,
    addDeadline,
    removeDeadline,
    calculateTimeRemaining,
  };
};