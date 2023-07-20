import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class createStationDto {
  @IsOptional()
  @IsNumber()
  id?: string;

  @IsString()
  name: string; // Is required to create new station

  @IsOptional()
  @IsString()
  short_name?: string; // short_name value must be unique or it will fail

  @IsOptional()
  @IsBoolean()
  is_enabled?: boolean;

  @IsOptional()
  @IsString()
  frontend_type?: string;

  @IsOptional()
  @IsArray()
  // eslint-disable-next-line @typescript-eslint/ban-types
  frontend_config?: { max_listeners: string };

  @IsOptional()
  @IsString()
  backend_type?: string;

  @IsOptional()
  @IsArray()
  // eslint-disable-next-line @typescript-eslint/ban-types
  backend_config?: {};

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsString()
  radio_base_dir?: string;

  @IsOptional()
  @IsBoolean()
  enable_requests?: boolean;

  @IsOptional()
  @IsNumber()
  request_delay?: number;

  @IsOptional()
  @IsNumber()
  request_threshold?: number;

  @IsOptional()
  @IsNumber()
  disconnect_deactivate_streamer?: number;

  @IsOptional()
  @IsBoolean()
  enable_streamers?: boolean;

  @IsOptional()
  @IsBoolean()
  is_streamer_live?: boolean;

  @IsOptional()
  @IsBoolean()
  enable_public_page?: boolean;

  @IsOptional()
  @IsBoolean()
  enable_on_demand?: boolean;

  @IsOptional()
  @IsBoolean()
  enable_on_demand_download?: boolean;

  @IsOptional()
  @IsBoolean()
  enable_hls?: boolean;

  @IsOptional()
  @IsNumber()
  api_history_items?: number;

  @IsOptional()
  @IsString()
  timezone?: string;

  @IsOptional()
  @IsArray()
  // eslint-disable-next-line @typescript-eslint/ban-types
  branding_config?: {};

  @IsOptional()
  @IsString()
  // eslint-disable-next-line @typescript-eslint/ban-types
  media_storage_location?: string;

  @IsOptional()
  @IsString()
  // eslint-disable-next-line @typescript-eslint/ban-types
  recordings_storage_location?: string;

  @IsOptional()
  @IsString()
  // eslint-disable-next-line @typescript-eslint/ban-types
  podcasts_storage_location?: string;
}
