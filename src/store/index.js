import Vue from "vue";

import Vuex from "vuex";
Vue.use(Vuex);

import VuexPersist from "vuex-persist";
const vuexPersist = new VuexPersist({
  key: "amb-notes",
  storage: window.localStorage,
  reducer: state => ({
    users: {
      currentUser: state.users.currentUser,
      accessToken: state.users.accessToken
    }
  })
});

import users from "./users-store";
import notes from "./notes-store";

export default new Vuex.Store({
  modules: {
    users,
    notes
  },
  plugins: [vuexPersist.plugin],
  state: {},
  mutations: {},
  actions: {}
});
