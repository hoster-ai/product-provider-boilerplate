/* eslint-disable prettier/prettier */
import { FieldDto } from "./field.dto";
import { IsDefined } from "class-validator";
import { UnitDto } from "./unit.dto";

export class DynamicPriceInfoDto {
  key: string;

  fetchChargesInterval: number; // in minutes

  description: string;
}

export class ListActionDto {
  icon: string;

  label?: string;

  popup?: boolean;

  link: string;
}

export class TabDto {
  label: string;

  url: string;
}

class MenuItemDto extends TabDto {
  icon: string;
}

export class ProviderInfoDto {
  name: string;

  logo?: string;

  description?: string;

  product_attributes?: FieldDto[];

  addons?: FieldDto[];

  productTabs?: TabDto[];

  listActions?: ListActionDto[];

  settings?: TabDto[];

  menuItems?: MenuItemDto[];

  onBoardingUrl?: String;

  payPerUseUnits?: UnitDto[];

  @IsDefined()
  itemMetaKeys?: Record<string, string>;
}
