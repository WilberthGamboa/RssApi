import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cacheController from 'express-cache-controller'; // <--- Agregar esta línea

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  app.enableCors({
  allowedHeaders: '*',
  origin: '*',
  credentials: true,
});
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true
    })
  );

  // Agregar configuración de cache
  app.use(cacheController({
    maxAge: 60, // Tiempo máximo de vida de la caché (en segundos)
    sMaxAge: 60, // Tiempo máximo de vida compartido (en segundos)
    noCache: true, // Deshabilitar la caché por completo si es verdadero
  }));

  await app.listen(process.env.PORT);
}
bootstrap();