import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'
import * as passport from 'passport'
import * as Sentry from '@sentry/node';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: process.env.AUTH_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 }
    })
  )
  Sentry.init({
    dsn: "https://90932eeb92ac4385ba74ed5f6cb9075a@o1030206.ingest.sentry.io/5997469",
  });
  app.enableCors()
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
