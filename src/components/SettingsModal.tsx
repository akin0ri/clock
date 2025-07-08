import React, { useState } from 'react';
import type { Deadline } from '../types/deadline';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  deadlines: Deadline[];
  onAddDeadline: (title: string, datetime: string) => void;
  onRemoveDeadline: (id: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  deadlines,
  onAddDeadline,
  onRemoveDeadline,
}) => {
  const [title, setTitle] = useState('');
  const [datetime, setDatetime] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && datetime) {
      onAddDeadline(title, datetime);
      setTitle('');
      setDatetime('');
    }
  };

  const getMinDateTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    now.setMinutes(now.getMinutes() - offset);
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">期限設定</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <form className="deadline-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">タイトル</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="期限のタイトル"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="datetime">日時</label>
            <input
              id="datetime"
              type="datetime-local"
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
              min={getMinDateTime()}
              required
            />
          </div>
          <button type="submit" className="add-button">
            追加
          </button>
        </form>

        <div className="deadline-list">
          <h3>登録済みの期限 ({deadlines.length}/5)</h3>
          {deadlines.map((deadline) => (
            <div key={deadline.id} className="deadline-list-item">
              <div>
                <strong>{deadline.title}</strong>
                <br />
                {new Date(deadline.datetime).toLocaleString('ja-JP')}
              </div>
              <button
                className="delete-button"
                onClick={() => onRemoveDeadline(deadline.id)}
              >
                削除
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};