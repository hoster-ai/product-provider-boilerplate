export declare class StationStorage {
    media_storage_location_id: string;
    recordings_storage_location_id: string;
    podcasts_storage_location_id: string;
}
export declare class Station {
    server_id: string;
    station_short_name: string;
    station_id: string;
    role_id: string;
    station_storage: StationStorage;
}
export declare class User {
    user_id?: string;
    email: string;
    azura_user_id: string;
    stations: Station[];
}
