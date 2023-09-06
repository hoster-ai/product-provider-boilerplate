import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ValidationError } from "class-validator";
import { AppModule } from "./app.module";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({origin: 'http//:hoster.ai'});// here you can set any origin points you wish to give access to, as well as any other Cors functionality

  // Make use of class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      exceptionFactory: (errors: ValidationError[]) => {
        console.log(errors);
        return new BadRequestException("Validation error");
      },
      transform: true,
    }),
  );

  await app.listen(process.env.PORT || 3003);
}
bootstrap();
