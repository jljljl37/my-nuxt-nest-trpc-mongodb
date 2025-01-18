import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TrpcRouter } from './trpc/trpc.router';
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import mongoose from 'mongoose';

async function bootstrap() {
  // await mongoose.connect('mongodb://test:testpassword@101.37.70.222:27017');
  await mongoose.connect('mongodb://localhost:27017/mmtest');
  if (mongoose.connection.readyState !== mongoose.ConnectionStates.connected) {
    console.error('MongoDB not connected');
  } else {
    console.log('MongoDB connected');
  }

  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use('/trpc', createExpressMiddleware({
    router: app.get(TrpcRouter).appRouter,
  }));
  
  // await app.listen(process.env.PORT ?? 3000);
  await app.listen(4000);
}
bootstrap();
