import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationError } from "class-validator";
import { AppModule } from "./app.module";
import { FieldDto } from "./dtos/field.dto";
import { BooleanResponseDto, ErrorResponseDto, InfoResponseDto, MetaResponseDto, TaskResponseDto } from "./dtos/responses.dto";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Generic Integration Service Provider API")//here you can set the name of your provider
    .addTag('Provider', 'These are the methods that send the information of the provider to the hoster as well as the (un)insstallation of the provider to the hoster')
    .addTag('Product', 'Every call that adds/edits/deletes products on the provider to be used by the HOSTER')
    .setTermsOfService("http://hosterpointer.io/terms") //here you can set your terms of service if you have any
    .setContact("","","info@hoster.com")//here you can set a contact email
    .setDescription('This Api provides the structure for the creation of an API Provider with the purpose of connecting to the "HOSTER". HOSTER is a service whose main function is the reselling of seperate services. Sellers can use Providers connected to the Hoster to sell their services to Users. Partners are the developers of providers.\n\nSome usefull inks:\n\n<ul><li><a href = "http://github.com/gispa-repository/">The Generic Integration Service Provider repository</a></li><li><a href="http://somelink.com">Some link</a></li></ul>')
    .setVersion("1.0")//set your version
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .addSecurityRequirements('JWT-auth')
    .addServer('http:localhost:3001')
    .build();
  
  const document = SwaggerModule.createDocument(app, config, { 
    extraModels: [
      FieldDto, 
      TaskResponseDto,
      MetaResponseDto,
      ErrorResponseDto,
      InfoResponseDto,
      BooleanResponseDto]});// here you can declare any extra models you create and add them to the swagger api
  SwaggerModule.setup("api", app, document); 

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

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
