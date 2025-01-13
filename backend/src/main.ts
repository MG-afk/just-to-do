import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.DEV_CORS_ORIGIN,
    methods: 'GET,POST,PUT,DELETE'
  })

  await app.listen(process.env.PORT ?? 4001, '0.0.0.0');
}   
bootstrap();
