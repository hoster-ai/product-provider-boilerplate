import { CountryEnum } from "../enums/country.enum";
export declare class UserDataDto {
    id: string;
    companyId?: string;
    email: string;
    firstName: string;
    lastName: string;
    isCompany?: boolean;
    companyName: string;
    telephone: string;
    mobile?: string;
    address1: string;
    address2?: string;
    address3?: string;
    postcode: string;
    city: string;
    country: CountryEnum;
    state?: string;
    currency?: string;
}
