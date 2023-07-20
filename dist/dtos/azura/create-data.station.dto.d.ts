export declare class createStationDto {
    id?: string;
    name: string;
    short_name?: string;
    is_enabled?: boolean;
    frontend_type?: string;
    frontend_config?: {
        max_listeners: string;
    };
    backend_type?: string;
    backend_config?: {};
    description?: string;
    url?: string;
    genre?: string;
    radio_base_dir?: string;
    enable_requests?: boolean;
    request_delay?: number;
    request_threshold?: number;
    disconnect_deactivate_streamer?: number;
    enable_streamers?: boolean;
    is_streamer_live?: boolean;
    enable_public_page?: boolean;
    enable_on_demand?: boolean;
    enable_on_demand_download?: boolean;
    enable_hls?: boolean;
    api_history_items?: number;
    timezone?: string;
    branding_config?: {};
    media_storage_location?: string;
    recordings_storage_location?: string;
    podcasts_storage_location?: string;
}
