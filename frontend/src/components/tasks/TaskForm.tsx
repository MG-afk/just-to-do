import React, { useState } from 'react';

interface TaskFormProps {
  onCreate: (title: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onCreate }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onCreate(title);
      setTitle('');
    }
  };

  return (
    <footer className="sticky bottom-0 p-4 bg-input-bg flex justify-between items-center">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter TODO title"
        className="bg-input-bg text-background border border-border-color p-3 rounded flex-grow mr-2"
      />
      <button
        type="submit"
        onClick={handleSubmit}
        className="bg-create-bg hover:bg-create-hover text-foreground px-4 py-2 rounded"
      >
        Create
      </button>
    </footer>
  );
};

export default TaskForm;