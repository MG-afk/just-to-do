import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './tasks/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
       isGlobal: true,
       envFilePath: ['.env', '.env.local'],
      }),
    TaskModule,
  ],
})
export class AppModule {}
