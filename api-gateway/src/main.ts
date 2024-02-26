import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
  });
  await app.listen(3100);

  console.log('🚀 ~ bootstrap ~ app running on:', await app.getUrl());
}
bootstrap();
