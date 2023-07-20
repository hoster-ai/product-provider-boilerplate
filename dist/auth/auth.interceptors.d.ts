import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
export declare class senderIsHoster implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
export declare class hasAdminRights implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
