import React from 'react';
import TaskItem from './TaskItem';
import Task from '@/interfaces/task.interface';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id?: number) => void;
  isDeleting: number;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, isDeleting }) => {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          isDeleting={isDeleting}
        />
      ))}
    </ul>
  );
};

export default TaskList;