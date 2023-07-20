import { User } from "../entities/users.model";
import { AzuraService } from "../services/azura.service";
export declare class FakeUserService {
    private readonly azuraService;
    constructor(azuraService: AzuraService);
    createUser(value: number): Promise<User[]>;
    makeUser(): User;
}
