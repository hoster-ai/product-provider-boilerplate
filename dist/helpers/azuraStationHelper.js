"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomStation = void 0;
const faker_1 = require("@faker-js/faker");
function createRandomStation() {
    const station = {
        id: faker_1.faker.string.numeric(2).toString(),
        name: faker_1.faker.person.jobDescriptor(),
        is_enabled: true,
        frontend_type: "icecast",
        frontend_config: { max_listeners: "50" },
        backend_type: "liquidsoap",
        backend_config: {},
        description: "",
        url: "https://demo.azuracast.com",
        genre: "Various",
        radio_base_dir: "/var/azuracast/statios/azuratest_radio",
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
        timezone: "UTC",
        branding_config: {},
        media_storage_location: faker_1.faker.string.numeric(2).toString(),
        recordings_storage_location: faker_1.faker.string.numeric(2).toString(),
        podcasts_storage_location: faker_1.faker.string.numeric(2).toString(),
        links: {
            self: `https://radio.eastside.gr/api/admin/station/1`,
            manage: `https://radio.eastside.gr/station/1`,
            clone: `https://radio.eastside.gr/api/admin/station/1/clone`,
        },
    };
    return station;
}
exports.createRandomStation = createRandomStation;
//# sourceMappingURL=azuraStationHelper.js.map