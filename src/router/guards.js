//==============================================================================
// ■ Route Guards (guards.js)
//------------------------------------------------------------------------------
//     Route guarding functions.
//==============================================================================
import store from "../store";

export default {
  publicOnly(to, from, next) {
    if (store.getters.currentUser) {
      next(false);
    } else {
      next();
    }
  },
  userOnly(to, from, next) {
    if (!store.getters.currentUser) {
      next({ name: "Login", query: { ref: to.path } });
    } else {
      next();
    }
  },
  adminOnly(to, from, next) {
    const currentUser = store.getters.currentUser;
    if (!currentUser || currentUser.role !== "admin") {
      next({ name: "Login", query: { ref: to.path } });
    } else {
      next();
    }
  }
};
