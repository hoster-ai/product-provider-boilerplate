import { FieldDto } from "./field.dto";
export declare class DynamicPriceInfoDto {
    key: string;
    fetchChargesInterval: number;
    description: string;
}
export declare class ListActionDto {
    icon: string;
    label?: string;
    popup?: string;
    link: string;
}
export declare class TabDto {
    label: string;
    url: string;
}
declare class MenuItemDto extends TabDto {
    icon: string;
}
export declare class ProviderInfoDto {
    name: string;
    logo?: string;
    description?: string;
    actionFields?: FieldDto[];
    addons?: FieldDto[];
    productTabs?: TabDto[];
    listActions?: ListActionDto[];
    settings?: TabDto[];
    menuItems?: MenuItemDto[];
    onBoardingUrl?: String;
    returnMetaKeys?: Record<string, string>;
}
export {};
