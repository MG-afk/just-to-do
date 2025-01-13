'use client'

import React, { useEffect, useState } from 'react';
import ApiClient from '@/services/api';
import Task from '@/interfaces/task.interface';
import TaskList from '@/components/tasks/TaskList';
import TaskForm from '@/components/tasks/TaskForm';
import CreateTaskDto from '@/dto/task.create.dto';
import DeleteTaskDto from '@/dto/task.delete.dto';
import '@/styles/index.css'

const TaskPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setDeleting] = useState<number>(-1);
  const api = new ApiClient();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getTask();
      setTasks(data);
    } catch (err) {
      setError('Failed to fetch TODOs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id?: number) => {
    if (typeof id !== 'number') {
      console.error('Invalid task ID');
      return;
    }

    const deleteDto: DeleteTaskDto = { id };
    const timeToDelete = 300;

    try {
      setDeleting(id);
      setTimeout(() => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        setDeleting(-1);
      }, timeToDelete);

      await api.deleteTask(deleteDto);
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    }
  };

  const handleCreate = async (title: string) => {
    const createDto: CreateTaskDto = { title };

    try {
      const newTask: Task = await api.createTask(createDto);
      setTasks(prevTasks => [...prevTasks, newTask]);
    } catch (err) {
      setError('Failed to create task');
      console.error(err);
    }
  };
  
  if (loading) {
    return <p className="text-foreground">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-4 bg-background text-foreground">
      <h1 className="text-2xl font-bold mb-4 text-center">TODO List</h1>
      { tasks.length === 0 ? (
        <h1 className="text-foreground text-center">No TODOs found.</h1>
      ) : (
        <TaskList tasks={tasks} onDelete={handleDelete} isDeleting={isDeleting}/>
      )}
      <TaskForm onCreate={handleCreate} />
    </div>
  );
};

export default TaskPage;
