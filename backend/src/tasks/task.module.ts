import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { SupabaseService } from '../supabase/supabase.service';

@Module({
  imports: [ConfigModule],
  controllers: [TaskController],
  providers: [TaskService, SupabaseService],
})
export class TaskModule {}
