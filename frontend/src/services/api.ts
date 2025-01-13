import axios from 'axios';
import Task from '@/interfaces/task.interface';
import CreateTaskDto  from '@/dto/task.create.dto';
import DeleteTaskDto  from '@/dto/task.delete.dto';

export default class ApiClient {
  
  async getTask(): Promise<Task[]> {
    console.log(process.env);

    const response = await axios.get<Task[]>(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);
    return response.data;
  }

  async createTask(createDto: CreateTaskDto): Promise<Task> {
    const response = await axios.post<Task>(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, createDto);
    return response.data;
  }

  async deleteTask(deleteDto: DeleteTaskDto): Promise<{ success: boolean }> {
    const response = await axios.delete<{ success: boolean }>(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${deleteDto.id}`);
    return response.data;
  }
}
