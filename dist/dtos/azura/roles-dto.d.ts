export declare class rolesDto {
    id?: string;
    name: string;
    permissions: {
        global: string[];
        station: {
            [id: string]: string[];
        };
    };
}
