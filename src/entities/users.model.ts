/* eslint-disable prettier/prettier */
import { prop, modelOptions } from "@typegoose/typegoose";

export class StationStorage {
  @prop({ type: String })
  media_storage_location_id: string;

  @prop({ type: String })
  recordings_storage_location_id: string;

  @prop({ type: String })
  podcasts_storage_location_id: string;
}

export class Station {
  @prop({ type: String })
  server_id: string;

  @prop({ type: String })
  station_short_name: string;

  @prop({ type: String })
  station_id: string;

  @prop({ type: String })
  role_id: string;

  @prop({ type: Object })
  station_storage: StationStorage;
}

@modelOptions({
  options: {
    allowMixed: 0,
  },
})
export class User {
  @prop({ type: String })
  user_id?: string;

  @prop({ type: String })
  email: string;

  @prop({ type: String })
  azura_user_id: string;

  @prop({ type: Array })
  stations: Station[];
}
