import { DurationEnum } from "../enums/duration.enum";
import { IpTypeEnum } from "../enums/ip-type.enum";
declare class IpDto {
    address: string;
    range: number;
    type: IpTypeEnum;
}
export declare class ProductDataDto {
    id: string;
    options: Record<string, any>;
    meta: Record<string, any>;
    duration: DurationEnum;
    ips?: IpDto[];
}
export {};
