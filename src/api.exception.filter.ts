import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { Response } from "express";
import { ErrorResponseDto } from "./dtos/responses.dto";
import { ApiException } from "./api.exception";
@Catch(ApiException)
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: ApiException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message_json = JSON.parse(exception.message);
    const error: ErrorResponseDto = message_json;
    response.status(status).json(error);
  }
}