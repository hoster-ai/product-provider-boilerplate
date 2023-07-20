import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ForbiddenException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtPayloadRequest } from "src/dtos/jwt-payload.request";

@Injectable()
export class senderIsHoster implements NestInterceptor {
  //check if the sender is indeed Hoster
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request & JwtPayloadRequest = context
      .switchToHttp()
      .getRequest();

    if (request.user.sender !== "hoster") {
      throw new ForbiddenException(
        "You do not have the neccessary access for this action",
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
      throw new ForbiddenException("Forbidden");
    }

    return next.handle();
  }
}
