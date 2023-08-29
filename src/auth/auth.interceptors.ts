import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { HttpStatusCode } from "axios";
import { Observable } from "rxjs";
import { ApiException } from "../api.exception";
import { JwtPayloadRequest } from "../dtos/jwt-payload.request";
import { ErrorMessage } from "../enums/error-messages.enum";

@Injectable()
export class senderIsHoster implements NestInterceptor {
  //check if the sender is indeed Hoster
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request & JwtPayloadRequest = context
      .switchToHttp()
      .getRequest();

    if (request.user.sender !== "hoster") {
      throw new ApiException(
        ErrorMessage.JWT_ERROR_MESSAGE,
        null,
        HttpStatusCode.Forbidden
      );
    }

    return next.handle();
  }
}

@Injectable()
export class hasAdminRights implements NestInterceptor {
  //check the access level of the sender
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request & JwtPayloadRequest = context
      .switchToHttp()
      .getRequest();

    if (!request.user.admin_rights) {
      throw new ApiException(
        ErrorMessage.JWT_ERROR_MESSAGE,
        null,
        HttpStatusCode.Forbidden
      );
    }

    return next.handle();
  }
}
