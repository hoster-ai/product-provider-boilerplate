"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.europe = exports.country_name = exports.CountryEnum = void 0;
var CountryEnum;
(function (CountryEnum) {
    CountryEnum["AFGHANISTAN"] = "AF";
    CountryEnum["ALBANIA"] = "AL";
    CountryEnum["ALGERIA"] = "DZ";
    CountryEnum["AMERICAN_SAMOA"] = "AS";
    CountryEnum["ANDORRA"] = "AD";
    CountryEnum["ANGOLA"] = "AO";
    CountryEnum["ANGUILLA"] = "AI";
    CountryEnum["ANTARCTICA"] = "AQ";
    CountryEnum["ANTIGUA_AND_BARBUDA"] = "AG";
    CountryEnum["ARGENTINA"] = "AR";
    CountryEnum["ARMENIA"] = "AM";
    CountryEnum["ARUBA"] = "AW";
    CountryEnum["AUSTRALIA"] = "AU";
    CountryEnum["AUSTRIA"] = "AT";
    CountryEnum["AZERBAIJAN"] = "AZ";
    CountryEnum["BAHAMAS"] = "BS";
    CountryEnum["BAHRAIN"] = "BH";
    CountryEnum["BANGLADESH"] = "BD";
    CountryEnum["BARBADOS"] = "BB";
    CountryEnum["BELARUS"] = "BY";
    CountryEnum["BELGIUM"] = "BE";
    CountryEnum["BELIZE"] = "BZ";
    CountryEnum["BENIN"] = "BJ";
    CountryEnum["BERMUDA"] = "BM";
    CountryEnum["BHUTAN"] = "BT";
    CountryEnum["BOLIVIA_PLURINATIONAL_STATE_OF"] = "BO";
    CountryEnum["BONAIRE_SINT_EUSTATIUS_AND_SABA"] = "BQ";
    CountryEnum["BOSNIA_AND_HERZEGOVINA"] = "BA";
    CountryEnum["BOTSWANA"] = "BW";
    CountryEnum["BOUVET_ISLAND"] = "BV";
    CountryEnum["BRAZIL"] = "BR";
    CountryEnum["BRITISH_INDIAN_OCEAN_TERRITORY"] = "IO";
    CountryEnum["BRUNEI_DARUSSALAM"] = "BN";
    CountryEnum["BULGARIA"] = "BG";
    CountryEnum["BURKINA_FASO"] = "BF";
    CountryEnum["BURUNDI"] = "BI";
    CountryEnum["CAMBODIA"] = "KH";
    CountryEnum["CAMEROON"] = "CM";
    CountryEnum["CANADA"] = "CA";
    CountryEnum["CAPE_VERDE"] = "CV";
    CountryEnum["CAYMAN_ISLANDS"] = "KY";
    CountryEnum["CENTRAL_AFRICAN_REPUBLIC"] = "CF";
    CountryEnum["CHAD"] = "TD";
    CountryEnum["CHILE"] = "CL";
    CountryEnum["CHINA"] = "CN";
    CountryEnum["CHRISTMAS_ISLAND"] = "CX";
    CountryEnum["COCOS_KEELING_ISLANDS"] = "CC";
    CountryEnum["COLOMBIA"] = "CO";
    CountryEnum["COMOROS"] = "KM";
    CountryEnum["CONGO"] = "CG";
    CountryEnum["CONGO_THE_DEMOCRATIC_REPUBLIC_OF_THE"] = "CD";
    CountryEnum["COOK_ISLANDS"] = "CK";
    CountryEnum["COSTA_RICA"] = "CR";
    CountryEnum["CN_TE_D_IVOIR"] = "CI";
    CountryEnum["CROATIA"] = "HR";
    CountryEnum["CUBA"] = "CU";
    CountryEnum["CURACAO"] = "CW";
    CountryEnum["CYPRUS"] = "CY";
    CountryEnum["CZECH_REPUBLIC"] = "CZ";
    CountryEnum["DENMARK"] = "DK";
    CountryEnum["DJIBOUTI"] = "DJ";
    CountryEnum["DOMINICA"] = "DM";
    CountryEnum["DOMINICAN_REPUBLIC"] = "DO";
    CountryEnum["ECUADOR"] = "EC";
    CountryEnum["EGYPT"] = "EG";
    CountryEnum["EL_SALVADOR"] = "SV";
    CountryEnum["EQUATORIAL_GUINEA"] = "GQ";
    CountryEnum["ERITREA"] = "ER";
    CountryEnum["ESTONIA"] = "EE";
    CountryEnum["ETHIOPIA"] = "ET";
    CountryEnum["FALKLAND_ISLANDS_MALVINAS"] = "FK";
    CountryEnum["FARO_ISLANDS"] = "FO";
    CountryEnum["FIJI"] = "FJ";
    CountryEnum["FINLAND"] = "FI";
    CountryEnum["FRANCE"] = "FR";
    CountryEnum["FRENCH_GUIANA"] = "GF";
    CountryEnum["FRENCH_POLYNESIA"] = "PF";
    CountryEnum["FRENCH_SOUTHERN_TERRITORIES"] = "TF";
    CountryEnum["GABON"] = "GA";
    CountryEnum["GAMBIA"] = "GM";
    CountryEnum["GEORGIA"] = "GE";
    CountryEnum["GERMANY"] = "DE";
    CountryEnum["GHANA"] = "GH";
    CountryEnum["GIBRALTAR"] = "GI";
    CountryEnum["GREECE"] = "GR";
    CountryEnum["GREENLAND"] = "GL";
    CountryEnum["GRENADA"] = "GD";
    CountryEnum["GUADELOUPE"] = "GP";
    CountryEnum["GUAM"] = "GU";
    CountryEnum["GUATEMALA"] = "GT";
    CountryEnum["GUERNSEY"] = "GG";
    CountryEnum["GUINEA"] = "GN";
    CountryEnum["GUINEA_BISSAU"] = "GW";
    CountryEnum["GUYANA"] = "GY";
    CountryEnum["HAITI"] = "HT";
    CountryEnum["HEARD_ISLAND_AND_MCDONALD_ISLANDS"] = "HM";
    CountryEnum["HOLY_SEE_VATICAN_CITY_STATE"] = "VA";
    CountryEnum["HONDURAS"] = "HN";
    CountryEnum["HONG_KONG"] = "HK";
    CountryEnum["HUNGARY"] = "HU";
    CountryEnum["ICELAND"] = "IS";
    CountryEnum["INDIA"] = "IN";
    CountryEnum["INDONESIA"] = "ID";
    CountryEnum["IRAN_ISLAMIC_REPUBLIC_OF"] = "IR";
    CountryEnum["IRAQ"] = "IQ";
    CountryEnum["IRELAND"] = "IE";
    CountryEnum["ISLE_OF_MAN"] = "IM";
    CountryEnum["ISRAEL"] = "IL";
    CountryEnum["ITALY"] = "IT";
    CountryEnum["JAMAICA"] = "JM";
    CountryEnum["JAPAN"] = "JP";
    CountryEnum["JERSEY"] = "JE";
    CountryEnum["JORDAN"] = "JO";
    CountryEnum["KAZAKHSTAN"] = "KZ";
    CountryEnum["KENYA"] = "KE";
    CountryEnum["KIRIBATI"] = "KI";
    CountryEnum["KOREA_DEMOCRATIC_PEOPLES_REPUBLIC_OF"] = "KP";
    CountryEnum["KOREA_REPUBLIC_OF"] = "KR";
    CountryEnum["KUWAIT"] = "KW";
    CountryEnum["KYRGYZSTAN"] = "KG";
    CountryEnum["LAO_PEOPLES_DEMOCRATIC_REPUBLIC"] = "LA";
    CountryEnum["LATVIA"] = "LV";
    CountryEnum["LEBANON"] = "LB";
    CountryEnum["LESOTHO"] = "LS";
    CountryEnum["LIBERIA"] = "LR";
    CountryEnum["LIBYA"] = "LY";
    CountryEnum["LIECHTENSTEIN"] = "LI";
    CountryEnum["LITHUANIA"] = "LT";
    CountryEnum["LUXEMBOURG"] = "LU";
    CountryEnum["MACAO"] = "MO";
    CountryEnum["SKOPJE"] = "MK";
    CountryEnum["MADAGASCAR"] = "MG";
    CountryEnum["MALAWI"] = "MW";
    CountryEnum["MALAYSIA"] = "MY";
    CountryEnum["MALDIVES"] = "MV";
    CountryEnum["MALI"] = "ML";
    CountryEnum["MALTA"] = "MT";
    CountryEnum["MARSHALL_ISLANDS"] = "MH";
    CountryEnum["MARTINIQUE"] = "MQ";
    CountryEnum["MAURITANIA"] = "MR";
    CountryEnum["MAURITIUS"] = "MU";
    CountryEnum["TUNISIA"] = "TN";
    CountryEnum["TURKEY"] = "TR";
    CountryEnum["TURKMENISTAN"] = "TM";
    CountryEnum["TURKS_AND_CAICOS_ISLANDS"] = "TC";
    CountryEnum["TUVALU"] = "TV";
    CountryEnum["UGANDA"] = "UG";
    CountryEnum["UKRAINE"] = "UA";
    CountryEnum["UNITED_ARAB_EMIRATES"] = "AE";
    CountryEnum["UNITED_KINGDOM"] = "GB";
    CountryEnum["UNITED_STATES"] = "US";
    CountryEnum["UNITED_STATES_MINOR_OUTLYING_ISLANDS"] = "UM";
    CountryEnum["URUGUAY"] = "UY";
    CountryEnum["UZBEKISTAN"] = "UZ";
    CountryEnum["VANUATU"] = "VU";
    CountryEnum["VENEZUELA_BOLIVARIAN_REPUBLIC_OF"] = "VE";
    CountryEnum["VIET_NAM"] = "VN";
    CountryEnum["VIRGIN_ISLANDS_BRITISH"] = "VG";
    CountryEnum["VIRGIN_ISLANDS_US"] = "VI";
    CountryEnum["WALLIS_AND_FUTUNA"] = "WF";
    CountryEnum["WESTERN_SAHARA"] = "EH";
    CountryEnum["YEMEN"] = "YE";
    CountryEnum["ZAMBIA"] = "ZM";
    CountryEnum["ZIMBABWE"] = "ZW";
    CountryEnum["MAYOTTE"] = "YT";
    CountryEnum["MEXICO"] = "MX";
    CountryEnum["MICRONESIA_FEDERATED_STATES_OF"] = "FM";
    CountryEnum["MOLDOVA_REPUBLIC_OF"] = "MD";
    CountryEnum["MONACO"] = "MC";
    CountryEnum["MONGOLIA"] = "MN";
    CountryEnum["MONTENEGRO"] = "ME";
    CountryEnum["MONTSERRAT"] = "MS";
    CountryEnum["MOROCCO"] = "MA";
    CountryEnum["MOZAMBIQUE"] = "MZ";
    CountryEnum["MYANMAR"] = "MM";
    CountryEnum["NAMIBIA"] = "NA";
    CountryEnum["NAURU"] = "NR";
    CountryEnum["NEPAL"] = "NP";
    CountryEnum["NETHERLANDS"] = "NL";
    CountryEnum["NEW_CALEDONIA"] = "NC";
    CountryEnum["NEW_ZEALAND"] = "NZ";
    CountryEnum["NICARAGUA"] = "NI";
    CountryEnum["NIGER"] = "NE";
    CountryEnum["NIGERIA"] = "NG";
    CountryEnum["NIUE"] = "NU";
    CountryEnum["NORFOLK_ISLAND"] = "NF";
    CountryEnum["NORTHERN_MARIANA_ISLANDS"] = "MP";
    CountryEnum["NORWAY"] = "NO";
    CountryEnum["OMAN"] = "OM";
    CountryEnum["PAKISTAN"] = "PK";
    CountryEnum["PALAU"] = "PW";
    CountryEnum["PALESTINE_STATE_OF"] = "PS";
    CountryEnum["PANAMA"] = "PA";
    CountryEnum["PAPUA_NEW_GUINEA"] = "PG";
    CountryEnum["PARAGUAY"] = "PY";
    CountryEnum["PERU"] = "PE";
    CountryEnum["PHILIPPINES"] = "PH";
    CountryEnum["PITCAIRN"] = "PN";
    CountryEnum["POLAND"] = "PL";
    CountryEnum["PORTUGAL"] = "PT";
    CountryEnum["PUERTO_RICO"] = "PR";
    CountryEnum["QATAR"] = "QA";
    CountryEnum["RN_UNIO"] = "RE";
    CountryEnum["ROMANIA"] = "RO";
    CountryEnum["RUSSIAN_FEDERATION"] = "RU";
    CountryEnum["RWANDA"] = "RW";
    CountryEnum["SAINT_BARTHN_LEM"] = "BL";
    CountryEnum["SAINT_HELENA_ASCENSION_AND_TRISTAN_DA_CUNHA"] = "SH";
    CountryEnum["SAINT_KITTS_AND_NEVIS"] = "KN";
    CountryEnum["SAINT_LUCIA"] = "LC";
    CountryEnum["SAINT_MARTIN"] = "MF";
    CountryEnum["SAINT_PIERRE_AND_MIQUELON"] = "PM";
    CountryEnum["SAINT_VINCENT_AND_THE_GRENADINES"] = "VC";
    CountryEnum["SAMOA"] = "WS";
    CountryEnum["SAN_MARINO"] = "SM";
    CountryEnum["SAO_TOME_AND_PRINCIPE"] = "ST";
    CountryEnum["SAUDI_ARABIA"] = "SA";
    CountryEnum["SENEGAL"] = "SN";
    CountryEnum["SERBIA"] = "RS";
    CountryEnum["SEYCHELLES"] = "SC";
    CountryEnum["SIERRA_LEONE"] = "SL";
    CountryEnum["SINGAPORE"] = "SG";
    CountryEnum["SINT_MAARTEN"] = "SX";
    CountryEnum["SLOVAKIA"] = "SK";
    CountryEnum["SLOVENIA"] = "SI";
    CountryEnum["SOLOMON_ISLANDS"] = "SB";
    CountryEnum["SOMALIA"] = "SO";
    CountryEnum["SOUTH_AFRICA"] = "ZA";
    CountryEnum["SOUTH_GEORGIA_AND_THE_SOUTH_SANDWICH_ISLANDS"] = "GS";
    CountryEnum["SOUTH_SUDAN"] = "SS";
    CountryEnum["SPAIN"] = "ES";
    CountryEnum["SRI_LANKA"] = "LK";
    CountryEnum["SUDAN"] = "SD";
    CountryEnum["SURINAME"] = "SR";
    CountryEnum["SVALBARD_AND_JAN_MAYEN"] = "SJ";
    CountryEnum["SWAZILAND"] = "SZ";
    CountryEnum["SWEDEN"] = "SE";
    CountryEnum["SWITZERLAND"] = "CH";
    CountryEnum["SYRIAN_ARAB_REPUBLIC"] = "SY";
    CountryEnum["TAIWAN_PROVINCE_OF_CHINA"] = "TW";
    CountryEnum["TAJIKISTAN"] = "TJ";
    CountryEnum["TANZANIA_UNITED_REPUBLIC_OF"] = "TZ";
    CountryEnum["THAILAND"] = "TH";
    CountryEnum["TIMOR_LESTE"] = "TL";
    CountryEnum["TOGO"] = "TG";
    CountryEnum["TOKELAU"] = "TK";
    CountryEnum["TONGA"] = "TO";
    CountryEnum["TRINIDAD_AND_TOBAGO"] = "TT";
})(CountryEnum || (exports.CountryEnum = CountryEnum = {}));
exports.country_name = {
    AF: "Afghanistan",
    AX: "Aland Islands",
    AL: "Albania",
    DZ: "Algeria",
    AS: "American Samoa",
    AD: "Andorra",
    AO: "Angola",
    AI: "Anguilla",
    AQ: "Antarctica",
    AG: "Antigua And Barbuda",
    AR: "Argentina",
    AM: "Armenia",
    AW: "Aruba",
    AU: "Australia",
    AT: "Austria",
    AZ: "Azerbaijan",
    BS: "Bahamas",
    BH: "Bahrain",
    BD: "Bangladesh",
    BB: "Barbados",
    BY: "Belarus",
    BE: "Belgium",
    BZ: "Belize",
    BJ: "Benin",
    BM: "Bermuda",
    BT: "Bhutan",
    BO: "Bolivia",
    BQ: "Bonaire, Sint Eustatius and Saba",
    BA: "Bosnia And Herzegovina",
    BW: "Botswana",
    BV: "Bouvet Island",
    BR: "Brazil",
    IO: "British Indian Ocean Territory",
    BN: "Brunei Darussalam",
    BG: "Bulgaria",
    BF: "Burkina Faso",
    BI: "Burundi",
    KH: "Cambodia",
    CM: "Cameroon",
    CA: "Canada",
    CV: "Cape Verde",
    KY: "Cayman Islands",
    CF: "Central African Republic",
    TD: "Chad",
    CL: "Chile",
    CN: "China",
    CX: "Christmas Island",
    CC: "Cocos (Keeling) Islands",
    CO: "Colombia",
    KM: "Comoros",
    CG: "Congo",
    CD: "Congo, Democratic Republic",
    CK: "Cook Islands",
    CR: "Costa Rica",
    CI: "Cote D'Ivoire",
    HR: "Croatia",
    CU: "Cuba",
    CW: "Curaçao",
    CY: "Cyprus",
    CZ: "Czech Republic",
    DK: "Denmark",
    DJ: "Djibouti",
    DM: "Dominica",
    DO: "Dominican Republic",
    EC: "Ecuador",
    EG: "Egypt",
    SV: "El Salvador",
    GQ: "Equatorial Guinea",
    ER: "Eritrea",
    EE: "Estonia",
    ET: "Ethiopia",
    FK: "Falkland Islands (Malvinas)",
    FO: "Faroe Islands",
    FJ: "Fiji",
    FI: "Finland",
    FR: "France",
    GF: "French Guiana",
    PF: "French Polynesia",
    TF: "French Southern Territories",
    GA: "Gabon",
    GM: "Gambia",
    GE: "Georgia",
    DE: "Germany",
    GH: "Ghana",
    GI: "Gibraltar",
    GR: "Greece",
    GL: "Greenland",
    GD: "Grenada",
    GP: "Guadeloupe",
    GU: "Guam",
    GT: "Guatemala",
    GG: "Guernsey",
    GN: "Guinea",
    GW: "Guinea-Bissau",
    GY: "Guyana",
    HT: "Haiti",
    HM: "Heard Island & Mcdonald Islands",
    VA: "Holy See (Vatican City State)",
    HN: "Honduras",
    HK: "Hong Kong",
    HU: "Hungary",
    IS: "Iceland",
    IN: "India",
    ID: "Indonesia",
    IR: "Iran, Islamic Republic Of",
    IQ: "Iraq",
    IE: "Ireland",
    IM: "Isle Of Man",
    IL: "Israel",
    IT: "Italy",
    JM: "Jamaica",
    JP: "Japan",
    JE: "Jersey",
    JO: "Jordan",
    KZ: "Kazakhstan",
    KE: "Kenya",
    KI: "Kiribati",
    KP: "Korea (Democratic People's Republic of)",
    KR: "Korea",
    KW: "Kuwait",
    KG: "Kyrgyzstan",
    LA: "Lao People's Democratic Republic",
    LV: "Latvia",
    LB: "Lebanon",
    LS: "Lesotho",
    LR: "Liberia",
    LY: "Libyan Arab Jamahiriya",
    LI: "Liechtenstein",
    LT: "Lithuania",
    LU: "Luxembourg",
    MO: "Macao",
    MK: "Skopje",
    MG: "Madagascar",
    MW: "Malawi",
    MY: "Malaysia",
    MV: "Maldives",
    ML: "Mali",
    MT: "Malta",
    MH: "Marshall Islands",
    MQ: "Martinique",
    MR: "Mauritania",
    MU: "Mauritius",
    YT: "Mayotte",
    MX: "Mexico",
    FM: "Micronesia, Federated States Of",
    MD: "Moldova",
    MC: "Monaco",
    MN: "Mongolia",
    ME: "Montenegro",
    MS: "Montserrat",
    MA: "Morocco",
    MZ: "Mozambique",
    MM: "Myanmar",
    NA: "Namibia",
    NR: "Nauru",
    NP: "Nepal",
    NL: "Netherlands",
    AN: "Netherlands Antilles",
    NC: "New Caledonia",
    NZ: "New Zealand",
    NI: "Nicaragua",
    NE: "Niger",
    NG: "Nigeria",
    NU: "Niue",
    NF: "Norfolk Island",
    MP: "Northern Mariana Islands",
    NO: "Norway",
    OM: "Oman",
    PK: "Pakistan",
    PW: "Palau",
    PS: "Palestinian Territory, Occupied",
    PA: "Panama",
    PG: "Papua New Guinea",
    PY: "Paraguay",
    PE: "Peru",
    PH: "Philippines",
    PN: "Pitcairn",
    PL: "Poland",
    PT: "Portugal",
    PR: "Puerto Rico",
    QA: "Qatar",
    RE: "Reunion",
    RO: "Romania",
    RU: "Russian Federation",
    RW: "Rwanda",
    BL: "Saint Barthelemy",
    SH: "Saint Helena",
    KN: "Saint Kitts And Nevis",
    LC: "Saint Lucia",
    MF: "Saint Martin",
    PM: "Saint Pierre And Miquelon",
    VC: "Saint Vincent And Grenadines",
    WS: "Samoa",
    SM: "San Marino",
    ST: "Sao Tome And Principe",
    SA: "Saudi Arabia",
    SN: "Senegal",
    RS: "Serbia",
    SC: "Seychelles",
    SL: "Sierra Leone",
    SG: "Singapore",
    SX: "Sint Maarten (Dutch part)",
    SK: "Slovakia",
    SI: "Slovenia",
    SB: "Solomon Islands",
    SO: "Somalia",
    ZA: "South Africa",
    GS: "South Georgia And Sandwich Isl.",
    SS: "South Sudan",
    ES: "Spain",
    LK: "Sri Lanka",
    SD: "Sudan",
    SR: "Suriname",
    SJ: "Svalbard And Jan Mayen",
    SZ: "Swaziland",
    SE: "Sweden",
    CH: "Switzerland",
    SY: "Syrian Arab Republic",
    TW: "Taiwan",
    TJ: "Tajikistan",
    TZ: "Tanzania",
    TH: "Thailand",
    TL: "Timor-Leste",
    TG: "Togo",
    TK: "Tokelau",
    TO: "Tonga",
    TT: "Trinidad And Tobago",
    TN: "Tunisia",
    TR: "Turkey",
    TM: "Turkmenistan",
    TC: "Turks And Caicos Islands",
    TV: "Tuvalu",
    UG: "Uganda",
    UA: "Ukraine",
    AE: "United Arab Emirates",
    GB: "United Kingdom",
    US: "United States",
    UM: "United States Outlying Islands",
    UY: "Uruguay",
    UZ: "Uzbekistan",
    VU: "Vanuatu",
    VE: "Venezuela",
    VN: "Viet Nam",
    VG: "Virgin Islands, British",
    VI: "Virgin Islands, U.S.",
    WF: "Wallis And Futuna",
    EH: "Western Sahara",
    YE: "Yemen",
    ZM: "Zambia",
    ZW: "Zimbabwe",
};
exports.europe = {
    AT: "Austria",
    BE: "Belgium",
    BG: "Bulgaria",
    HR: "Croatia",
    CY: "Cyprus",
    CZ: "Czech Republic",
    DK: "Denmark",
    EE: "Estonia",
    FI: "Finland",
    FR: "France",
    DE: "Germany",
    GR: "Greece",
    HU: "Hungary",
    IE: "Ireland",
    IT: "Italy",
    LV: "Latvia",
    LT: "Lithuania",
    LU: "Luxembourg",
    MT: "Malta",
    NL: "Netherlands",
    PL: "Poland",
    PT: "Portugal",
    RO: "Romania",
    SK: "Slovakia",
    SI: "Slovenia",
    ES: "Spain",
    SE: "Sweden",
};
//# sourceMappingURL=country.enum.js.map