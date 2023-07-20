import { ProductDataDto as ProductDataDto } from "./product-data.dto";
import { UserDataDto as UserDataDto } from "./user-data.dto";
export declare class RequestDto {
    userData: UserDataDto;
    productData: ProductDataDto;
    previousProductData?: ProductDataDto;
}
export declare class AddonsRequestDto {
    addonToBeValidated: string;
    addonInfo: Record<string, any>;
}
export declare class ActionFieldsRequestDto {
    actionFieldToBeValidated: string;
    actionFieldinfo: Record<string, any>;
}
