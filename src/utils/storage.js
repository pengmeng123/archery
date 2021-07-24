let localStorage = (function () {
  var storage = window.localStorage;
  return {
    get: function (key) {
      var data = storage.getItem(key);
      if (!data) {
        return false;
      }
      return JSON.parse(data);
    },
    set: function (key, value) {
      if (typeof value === "string") {
        storage.setItem(key, value);
      }
      var stringData = JSON.stringify(value);
      storage.setItem(key, stringData);
    },
    remove: function (key) {
      storage.removeItem(key);
    },
  };
})();
export { localStorage };
