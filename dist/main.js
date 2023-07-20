"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const field_dto_1 = require("./dtos/field.dto");
const responses_dto_1 = require("./dtos/responses.dto");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Generic Integration Service Provider API")
        .addTag('Provider', 'These are the methods that send the information of the provider to the hoster as well as the (un)insstallation of the provider to the hoster')
        .addTag('Product', 'Every call that adds/edits/deletes products on the provider to be used by the HOSTER')
        .setTermsOfService("http://hosterpointer.io/terms")
        .setContact("", "", "info@hoster.com")
        .setDescription('This Api provides the structure for the creation of an API Provider with the purpose of connecting to the "HOSTER". HOSTER is a service whose main function is the reselling of seperate services. Sellers can use Providers connected to the Hoster to sell their services to Users. Partners are the developers of providers.\n\nSome usefull inks:\n\n<ul><li><a href = "http://github.com/gispa-repository/">The Generic Integration Service Provider repository</a></li><li><a href="http://somelink.com">Some link</a></li></ul>')
        .setVersion("1.0")
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token',
    }, 'JWT-auth')
        .addSecurityRequirements('JWT-auth')
        .addServer('http:localhost:3001')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config, { extraModels: [field_dto_1.FieldDto, responses_dto_1.TaskResponseDto, responses_dto_1.MetaResponseDto, responses_dto_1.ErrorResponseDto, responses_dto_1.InfoResponseDto, responses_dto_1.BooleanResponseDto] });
    swagger_1.SwaggerModule.setup("api", app, document);
    app.enableCors({ origin: 'http:localhost:3001' });
    app.useGlobalPipes(new common_1.ValidationPipe({
        disableErrorMessages: false,
        exceptionFactory: (errors) => {
            console.log(errors);
            return new common_1.BadRequestException("Validation error");
        },
        transform: true,
    }));
    await app.listen(process.env.PORT || 3001);
}
bootstrap();
//# sourceMappingURL=main.js.map