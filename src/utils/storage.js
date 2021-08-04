import { isNil } from "lodash";
const disabled = typeof window === "undefined" || !window.localStorage;
let localStorage = (function () {
  var storage = window.localStorage;
  return {
    get: function (key, defaultValue = null) {
      if (disabled) {
        return defaultValue;
      }
      var data = storage.getItem(key);
      if (isNil(data)) {
        return defaultValue;
      }
      try {
        return JSON.parse(data);
      } catch (e) {
        return defaultValue;
      }
    },
    set: function (key, value) {
      if (disabled) {
        return null;
      }
      if (typeof value === "string") {
        return storage.setItem(key, value);
      }
      var stringData = JSON.stringify(value);
      return storage.setItem(key, stringData);
    },
    remove: function (key) {
      if (disabled) {
        return;
      }
      return storage.removeItem(key);
    },
  };
})();
export { localStorage };
