import Vue from "vue";
import alert from "@/services/alert";
import usersApi from "@/services/api/users-api";

export default {
  state: {
    users: [],
    currentUser: null,
    accessToken: ""
  },
  getters: {
    users: state => state.users,
    currentUser: state => state.currentUser,
    accessToken: state => state.accessToken
  },
  mutations: {
    logout(state) {
      state.currentUser = null;
      state.accessToken = "";
    },

    setUsers(state, users) {
      state.users = users;
    },
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken;
    },
    addUser(state, user) {
      state.users.push(user);
      alert.notification(`User ${user.name} created!`);
    },
    setUser(state, { id, user }) {
      const index = state.users.findIndex(user => user.id === id);
      Vue.set(state.users, index, user);
      if (state.currentUser.id === id) {
        state.currentUser = { ...state.currentUser, ...user };
      }
      alert.notification(`User ${user.name} updated!`);
    },
    removeUser(state, id) {
      const user = state.users.find(user => user.id === id);
      state.users.splice(state.users.indexOf(user), 1);
      if (state.currentUser.id === id) {
        state.currentUser = null;
      }
      alert.notification(`User ${user.name} deleted!`, "is-danger");
    }
  },
  actions: {
    loginUser({ commit }, { email, password }) {
      return usersApi.login(email, password).then(res => {
        commit("setCurrentUser", res.user);
        commit("setAccessToken", res.accessToken);
      });
    },
    registerUser({ commit }, { email, password, ...other }) {
      return usersApi.register(email, password, { ...other }).then(res => {
        commit("setCurrentUser", res.user);
        commit("setAccessToken", res.accessToken);
      });
    },

    readUsers({ commit }) {
      return usersApi.read().then(users => commit("setUsers", users));
    },
    createUser({ commit }, user) {
      return usersApi.create(user).then(user => commit("addUser", user));
    },
    updateUser({ commit }, { id, user }) {
      return usersApi
        .update(id, user)
        .then(user => commit("setUser", { id, user }));
    },
    deleteUser({ commit }, id) {
      return usersApi.delete(id).then(() => commit("removeUser", id));
    }
  }
};
