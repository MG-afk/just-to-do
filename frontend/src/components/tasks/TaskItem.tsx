import React from 'react';
import Task from '@/interfaces/task.interface';

interface TaskItemProps {
  task: Task;
  onDelete: (id?: number) => void;
  isDeleting: number;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, isDeleting }) => {
  return (
    <li
      className={`flex justify-between items-center bg-input-bg p-2 rounded-md shadow 
        ${isDeleting === task.id ? "animate-fade-out" : ""}`}
    >
      <span>{task.title}</span>
      <button
        onClick={() => onDelete(task.id)}
        aria-label={`Delete ${task.title}`}
        className="bg-create-bg hover:bg-create-hover text-foreground px-4 py-2 rounded"
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;