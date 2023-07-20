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
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request & JwtPayloadRequest = context
      .switchToHttp()
      .getRequest();

    if (request.user.sender !== "hoster") {
      throw new ForbiddenException(
        "You have not necessary privilege for this action",
      );
    }

    return next.handle();
  }
}

@Injectable()
export class hasAdminRights implements NestInterceptor {
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
