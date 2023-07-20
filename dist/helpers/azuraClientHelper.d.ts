import { AzuraUserDto } from "src/dtos/azura/azura-user.dto";
export declare class FakeClientService {
    makeUsers(value: number): Promise<AzuraUserDto[]>;
    makeUser(): AzuraUserDto;
}
