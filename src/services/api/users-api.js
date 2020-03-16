import api from "./";

export default {
  read(params) {
    return api.read("users", { params });
  },
  create(user) {
    return api.create("users", user, api.config());
  },
  update(id, user) {
    return api.update(`users/${id}`, user, api.config(), true);
  },
  delete(id) {
    return api.delete(`users/${id}`, api.config());
  },

  login(email, password) {
    return this._auth("login", { email, password });
  },
  register(email, password, other) {
    return this._auth("register", { email, password, ...other });
  },
  check(email, password) {
    return api.create("login", { email, password }).then(
      () => true,
      () => false
    );
  },

  _auth(type, data) {
    if (type !== "login" && type !== "register") {
      return;
    }
    return api.create(type, data).then(res => {
      return api
        .read("users", { params: { email: data.email } })
        .then(users => users[0])
        .then(user => {
          return { user, accessToken: res.accessToken };
        });
    });
  }
};
