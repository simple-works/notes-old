//==============================================================================
// ■ API (api/index.js)
//------------------------------------------------------------------------------
//     RESTful-API CRUD-operations functions.
//==============================================================================
import axios from "axios";
import store from "@/store";

const client = axios.create({
  baseURL: "/api",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  config() {
    return {
      headers: {
        authorization: `Bearer ${store.getters.accessToken}`
      }
    };
  },

  create(path, data, config) {
    return client.post(path, data, config).then(response => response.data);
  },
  read(path, config) {
    return client.get(path, config).then(response => response.data);
  },
  update(path, data, config, partial = false) {
    return !partial
      ? client.put(path, data, config).then(response => response.data)
      : client.patch(path, data, config).then(response => response.data);
  },
  delete(path, config) {
    return client.delete(path, config).then(response => response.data);
  }
};
