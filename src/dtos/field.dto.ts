/* eslint-disable prettier/prettier */
import { LabelTypeEnum } from "../enums/label.type.enum";

export class FieldDto {
  id: string;

  label: string;

  description?: string;

  default?: string | number | Record<string, any>;

  value: string | number | Record<string, any>;

  type: LabelTypeEnum;

  required: boolean;

  disabled: boolean;

  hidden: boolean;

  regexValidation: string;

  regexValidationErrorMessage?: string;

  remoteValidation: boolean;

  error: string = null;

  dynamicAddon?: boolean = false;

  hideOnPayPerUse?: boolean = false;
}
