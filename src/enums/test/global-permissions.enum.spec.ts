import { GlobalPermissions } from "../global-permissions.enum";

/* eslint-disable @typescript-eslint/no-var-requires */

describe("global-permission values enum", () => {
  it("checking the values by key", () => {
    expect(GlobalPermissions.All_Permissions).toBe("administer all"),
      expect(GlobalPermissions.View_Administration_Page).toBe(
        "view administration",
      ),
      expect(GlobalPermissions.View_System_Logs).toBe("view system logs"),
      expect(GlobalPermissions.Administer_Settings).toBe("administer settings"),
      expect(GlobalPermissions.Administer_APIKeys).toBe("administer api keys"),
      expect(GlobalPermissions.Administer_Stations).toBe("administer stations"),
      expect(GlobalPermissions.Administer_CustomFields).toBe(
        "administer custom fields",
      ),
      expect(GlobalPermissions.Administer_Backups).toBe("administer backups"),
      expect(GlobalPermissions.Administer_Storage_Locations).toBe(
        "administer storage locations",
      );
  });
});
