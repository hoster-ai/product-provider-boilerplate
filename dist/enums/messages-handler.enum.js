"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesHandler = void 0;
var MessagesHandler;
(function (MessagesHandler) {
    MessagesHandler["UNAUTHORIZED"] = "You must login to have access to the content.";
    MessagesHandler["FORBIDDEN"] = "You have not necessary privilege for this action.";
    MessagesHandler["INVALID_MONGO_ID"] = "You given an invalid server id.";
    MessagesHandler["URL_TAKEN"] = "Current url is already in use.";
    MessagesHandler["STATION_NAME_TAKEN"] = "Current station name is already in use.";
})(MessagesHandler || (exports.MessagesHandler = MessagesHandler = {}));
//# sourceMappingURL=messages-handler.enum.js.map