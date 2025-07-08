import { useState, useEffect } from 'react';
import './App.css';
import { useClock } from './hooks/useClock';
import { useDeadlines } from './hooks/useDeadlines';
import { SettingsModal } from './components/SettingsModal';
import { useTheme } from './contexts/ThemeContext';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [countdowns, setCountdowns] = useState<{ [key: string]: string }>({});
  const { time, formattedTime, formattedDate } = useClock();
  const { deadlines, addDeadline, removeDeadline, calculateTimeRemaining } = useDeadlines();
  const { isDarkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const updateCountdowns = () => {
      const newCountdowns: { [key: string]: string } = {};
      deadlines.forEach((deadline) => {
        newCountdowns[deadline.id] = calculateTimeRemaining(deadline.datetime);
      });
      setCountdowns(newCountdowns);
    };

    updateCountdowns();
  }, [deadlines, calculateTimeRemaining, time]);

  return (
    <div className="container">
      <div className="theme-trigger" />
      <button className="theme-toggle" onClick={toggleDarkMode}>
        {isDarkMode ? '☀️' : '🌙'}
      </button>
      
      <div className="settings-trigger" />
      <button className="settings-button" onClick={() => setIsSettingsOpen(true)}>
        ⚙️
      </button>

      <div className="clock-section">
        <div className="time">{formattedTime}</div>
        <div className="date">{formattedDate}</div>
      </div>

      <div className="deadlines-section">
        {deadlines.map((deadline) => {
          const deadlineDate = new Date(deadline.datetime);
          const formattedDeadline = `${deadlineDate.getFullYear()}/${(deadlineDate.getMonth() + 1).toString().padStart(2, '0')}/${deadlineDate.getDate().toString().padStart(2, '0')}`;
          
          return (
            <div key={deadline.id} className="deadline-item">
              <div className="deadline-title">{deadline.title}</div>
              <div className="deadline-info">
                <div className="deadline-limit">Limit: {formattedDeadline}</div>
                <div className="deadline-countdown">{countdowns[deadline.id]}</div>
              </div>
            </div>
          );
        })}
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        deadlines={deadlines}
        onAddDeadline={addDeadline}
        onRemoveDeadline={removeDeadline}
      />
    </div>
  );
}

export default App;
