import { HttpException } from "@nestjs/common";
export class ApiException extends HttpException {
  constructor(message: string, id: string, statusCode: number) {
    super(
      JSON.stringify({
        id: id,
        message: message,
      }),
      statusCode
    );
  }
}
