const cache = {
  data: {},
  set: function(cacheName, { name, data }) {
    this.data[cacheName] = { name, data };
  },
  get: function(name) {
    return this.data[name];
  },
  getData: function(name) {
    return this.data[name].data;
  },
  getQueryName: function(name) {
    return this.data[name].name;
  },
  clear: function() {
    this.data = {};
  },
  exist: function(name) {
    return !!this.data[name];
  },
  clearByName: function(name) {
    for (let key of Object.keys(this.data)) {
      if (this.getQueryName(key) == name) {
        delete this.data[key];
      }
    }
  },
};
export default cache;
