import { faker } from "@faker-js/faker";
import { createStationDto } from "src/dtos/azura/create-data.station.dto";

export function createRandomStation(): createStationDto {
  const station = {
    id: faker.string.numeric(2).toString(),
    name: faker.person.jobDescriptor(),
    is_enabled: true,
    frontend_type: "icecast",
    frontend_config: { max_listeners: "50" },
    backend_type: "liquidsoap",
    backend_config: {},
    description: "", //addon
    url: "https://demo.azuracast.com", //settings
    genre: "Various", // addon
    radio_base_dir: "/var/azuracast/statios/azuratest_radio", // ?
    enable_requests: true,
    request_delay: 3,
    request_threshold: 10,
    disconnect_deactivate_streamer: 0,
    enable_streamers: true,
    is_streamer_live: false,
    enable_public_page: true,
    enable_on_demand: true,
    enable_on_demand_download: false,
    enable_hls: true,
    api_history_items: 10,
    timezone: "UTC", // actionfield
    branding_config: {},
    media_storage_location: faker.string.numeric(2).toString(),
    recordings_storage_location: faker.string.numeric(2).toString(),
    podcasts_storage_location: faker.string.numeric(2).toString(),
    links: {
      self: `https://radio.eastside.gr/api/admin/station/1`,
      manage: `https://radio.eastside.gr/station/1`,
      clone: `https://radio.eastside.gr/api/admin/station/1/clone`,
    },
  };

  return station;
}
