import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('[BOOT] Starting bootstrap...');
  console.log('[BOOT] NODE_ENV:', process.env.NODE_ENV);
  console.log('[BOOT] PORT:', process.env.PORT ?? '4000 (default)');
  console.log('[BOOT] MONGODB_URI:', process.env.MONGODB_URI ? 'SET' : 'MISSING');
  console.log('[BOOT] JWT_SECRET:', process.env.JWT_SECRET ? 'SET' : 'MISSING');
  console.log('[BOOT] CORS_ORIGIN:', process.env.CORS_ORIGIN ?? 'NOT SET');

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',').map((o) => o.trim()) ?? [
      'http://localhost:3000',
    ],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.enableShutdownHooks();

  const port = Number(process.env.PORT ?? 4000);
  await app.listen(port);
  console.log(`[BOOT] Server listening on port ${port}`);
}

bootstrap().catch((err) => {
  console.error('[BOOT] Fatal error during bootstrap:', err);
  process.exit(1);
});
