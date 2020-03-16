import api from "./";

export default {
  read(params) {
    return api.read("notes", { params });
  },
  create(note) {
    return api.create("notes", note, api.config());
  },
  update(id, note) {
    return api.update(`notes/${id}`, note, api.config());
  },
  delete(id) {
    return api.delete(`notes/${id}`, api.config());
  }
};
