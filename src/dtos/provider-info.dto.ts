/* eslint-disable prettier/prettier */
import { ApiExtraModels, ApiProperty, ApiResponseProperty, getSchemaPath } from "@nestjs/swagger";
import { FieldDto } from "./field.dto";
import { LabelTypeEnum } from "../enums/label.type.enum";
import { IsDefined } from "class-validator";
import { TimeZones } from "src/enums/timezones.enum";

export class DynamicPriceInfoDto {
  @ApiResponseProperty({ type: String, example: "cpu" })
  key: string;

  @ApiResponseProperty({ type: Number, example: 5 })
  fetchChargesInterval: number; // in minutes

  @ApiResponseProperty({ type: String, example: "per core" })
  description: string;
}

export class ListActionDto {
  @ApiProperty({ type: String, example: "www.example.com/some-icon", title: "IconUrl", description: 'This is the url of the button generated/hosted by the provider to be used by the Hoster' })
  icon: string;

  @ApiProperty({ type: String, example: "Open cPanel", title: "Action Name", description: 'This is the label of the button' })
  label?: string;

  @ApiProperty({ type: String, example: "", title: "Action Description", description: 'This is the description of the buttons funstion' })
  popup?: string;

  @ApiProperty({ type: String, example: "", title: "ActionPost", description: 'this is the url of the button.' })
  link: string;
}

export class TabDto {
  @ApiProperty({ type: String, example: "Station status control", title: "Tab Name", description: 'This is the name/title of the View/Tab' })
  label: string;

  @ApiProperty({ type: String, example: "www.example.com/rendered-template/front", title: "Tab Render Url", description: 'This is the url of the View generated/hosted by the provider to be used by the Hoster' })
  url: string;
}

class MenuItemDto extends TabDto {
  @ApiProperty({ type: String, example: "www.example.com/some-icon", description: 'This is the url of the View generated/hosted by the provider to be used by the Hoster' })
  icon: string;
}


@ApiExtraModels(FieldDto)
export class ProviderInfoDto {

  @ApiProperty({
    type: String,
    example: "Bronze Azuracast Station",
    required: true,
    description: "Name of the Product or Service",
    title: "Product Name"
  })
  name: string;

  @ApiProperty({
    type: String,
    example: "example.com/logo.jpg",
    required: false,
    description: "Logo url of the provider. Recomeded size up to 512x512 px",
    title: "Logo"
  })
  logo?: string;

  // @ApiProperty({
  //   type: String,
  //   example: "Bronze Radio",
  //   required: true,
  //
  //   description: "Title of the product",
  //   title: "ProductTitle"
  // })
  // title?: string;

  @ApiProperty({
    type: String,
    example: "A sample radio product",
    required: true,
    description: "Description of the provider",
    title: "Provider Description"

  })
  description?: string;

  @ApiProperty({
    type: FieldDto,
    isArray: true,
    example: [
      {
        id: "max_listeners",
        label: "Max Listeners",
        value: null,
        type: LabelTypeEnum.TEXT_BOX,
        required: true,
        disabled: false,
        hidden: false,
        regexValidation: "",
        remoteValidation: false,
        error: "",
        description: "",
        default: null,
      },
      {
        id: 'disk',
        label: 'Disk Space',
        value: 50,
        type: "number",
        required: true,
        disabled: false,
        hidden: false,
        regexValidation: "",
        remoteValidation: false,
        error: "",
        description: "",
        default: null,
      }
    ],
    required: true,
    description:
      "Here we describe to the Hoster which features(fields) the Seller will have available(must fill in) when creating a product on the Hoster. This means the Seller can create products with different characteristics. For example, if the Provider is an Azuracast server, then the Seller will need to fill in his Products the maximum number of listeners and the disc he will have available on a specific Product(i.e. station) for the User(Customer) to upload songs. Each actionField is an Object containing all the relevant information of a feature",
    title: "Product Attributes/Features"
  })
  actionFields?: FieldDto[];

  @ApiProperty({
    type: [FieldDto],
    example: [
      {
        id: "name",
        label: "Radio station name",
        value: null,
        type: LabelTypeEnum.TEXT_BOX,
        required: true,
        disabled: false,
        hidden: false,
        regexValidation: "",
        remoteValidation: true,
        error: "",
      } as FieldDto,
    ],
    required: true,
    readOnly: true,
    description: 'Here we describe to the Hoster any addon/features fields the User(Customer) may have filled in when buying a Product from the Seller. For example if the Product is an Azuracast station, the name of the station that is filled out by the user would be considered an addon.Also if the user would like to add podcast capability this could also be considered an addon (perhaps an optional one).Each addon is an Object containing all the relevant information of an addon',
    title: "Product Addons/Extra features"
  })
  addons?: FieldDto[];

  @ApiProperty({
    type: [TabDto],
    example: [
      {
        label: "My Product Info",
        url: "www.example.com/product-tabs/user1/infotab",
      }, {
        label: "Station Status control",
        url: "www.example.com/product-tabs/station_control"
      }
    ],
    required: true,
    description:
      "Here we send to the Hoster any and all Views that may need to be loaded on the Hoster, on the User(Customer)'s Panel, so that the User(Customer) has access to the Product. These Views are generated by the Provider which sends the label and url of each to be displayed by the Hoster, on the User(Customer)'s Panel",
    title: "Product Tab Views"
  })
  productTabs?: TabDto[];

  @ApiProperty({
    type: [ListActionDto],
    example: [
      {
        icon: "icon.png",
        label: "redirect to cpanel",
        popup: "",
        link: "cpanel.login/XXXXXX",
      },
    ],
    required: false,
    description:
      "ListActions are quick buttons that need to be displayed on the Hoster. on the User(Customer)'s Panel, most likely on the Product list, whose job is to access functions of the Product immediately without entering a Product Tab. They are generated on the Provider and accesed by the Hoster through the url. They are (almost) always redirects to other pages.",
    title: "ListActions Buttons"
  })
  listActions?: ListActionDto[];

  @ApiProperty({
    type: [TabDto],
    example: [
      {
        label: "Azuracast Servers",
        url: "www.example.com/settings1/",
      },
    ],
    required: true,
    description:
      "Here we send to the Hoster any and all Views that need to be loaded on the Seller's Panel, on the Hoster. They contain any and all controlls of options and settings of the Products the Seller needs to have. They are generated on the Provider side and are displayed on the Hoster through the url",
    title: "Product Settings Views"
  })
  settings?: TabDto[];

  @ApiProperty({
    type: [MenuItemDto],
    example: [{ label: "Provider Name", url: "www.myexample.gr/url", icon: "./provider-icon.png", }],
    required: false,
    description:
      "Menu items is the widget displayed on the Hoster menu that when clicked on directs the user to the sellers products. They are rendered on the provider side and accessed by the hoster through a url.",
    title: "Menu Item Render"
  })
  menuItems?: MenuItemDto[];

  /*@ApiProperty({
    type: String,
    example: "",
    required: false,
    description: "Required fields are the",
  })
  requiredFields?: string[];*/
  @ApiProperty({
    title: "OnBoarding URL",
    example: "someurl.com/default",
    required: false,
    description: "Here we send to the Hoster the View that is rendered by the Provider, that is loaded by Default after the install"
  })
  onBoardingUrl?: String

  @IsDefined()
  @ApiProperty({
    title: "MetaKeys",
    type: Object,
    additionalProperties: { type: 'string' },
    example: [{
      station_id: 'This is your Station Id',
      name: "This is your Station Name",
      login_email: "This is your Station Login Email for login via browser",
      login_password: "This is your Station Login Password for login via browser",
      login_url: "This is the Station Login Url",
      source_password: "This is your source password for streaming",
      port: "This is the Port used to connect to the specific azuracast station",
      mount_point: "This is the mountpoint of the specific Station",
    }],
    required: true,
    readOnly: true,
    description: "These are all necessary information of the Product and are returned during Product creation. The <*>(key) is the name of the information and the value(string) is the description of it. For example when an azuracast station product is created the returnMetaKeys will be station_id,name, login_url,login_email,login_password,source_password,port,mount_point."
  })
  returnMetaKeys?: Record<string, string>;
}
