import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.interface';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getTasks(): Promise<Task[]> {
    return await this.taskService.getTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    try {
      return await this.taskService.getTaskById(id);
    } catch (error) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async createTask(@Body() data: { title: string }): Promise<Task> {
    try {
      return await this.taskService.createTask(data);
    } catch (error) {
      throw new HttpException('Failed to create task', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Task>
  ): Promise<Task> {
    try {
      return await this.taskService.updateTask(id, data);
    } catch (error) {
      throw new HttpException('Failed to update task', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.taskService.deleteTask(id);
    } catch (error) {
      throw new HttpException('Failed to delete task', HttpStatus.BAD_REQUEST);
    }
  }
}