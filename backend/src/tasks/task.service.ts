import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { Task } from './task.interface';

@Injectable()
export class TaskService {
    constructor(private readonly supabaseService: SupabaseService) {}

    async getTasks(): Promise<Task[]> {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase.from('tasks').select('*');
        if (error) {
            throw new Error(`Error fetching tasks: ${error.message}`);
        }
        return data;
    }

    async getTaskById(id: number): Promise<Task> {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) {
            throw new Error(`Error fetching task: ${error.message}`);
        }
        return data;
    }

    async createTask(data: { title: string }): Promise<Task> {
        const supabase = this.supabaseService.getClient();
        const { data: newTask, error } = await supabase
            .from('tasks')
            .insert([data])
            .select()
            .single();

        if (error) {
            throw new Error(`Error creating task: ${error.message}`);
        }
        return newTask;
    }

    async updateTask(id: number, data: Partial<Task>): Promise<Task> {
        const supabase = this.supabaseService.getClient();
        const { data: updatedTask, error } = await supabase
            .from('tasks')
            .update(data)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            throw new Error(`Error updating task: ${error.message}`);
        }
        return updatedTask;
    }

    async deleteTask(id: number): Promise<void> {
        const supabase = this.supabaseService.getClient();
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', id);

        if (error) {
            throw new Error(`Error deleting task: ${error.message}`);
        }
    }
}