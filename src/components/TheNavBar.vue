<template>
  <div id="the-navbar">
    <b-navbar class="is-radiusless">
      <!-- BRAND -->
      <template slot="brand">
        <b-navbar-item tag="router-link" to="/">
          <img
            src="@/assets/images/logo.png"
            alt="Ambratolm"
            ref="logo"
            @click="animateLogo"
          />
        </b-navbar-item>
      </template>

      <!-- START -->
      <template slot="start">
        <b-navbar-item :to="route('Home')" tag="router-link">
          <span>Home</span>
        </b-navbar-item>
        <b-navbar-item :to="route('About')" tag="router-link">
          <span>About</span>
        </b-navbar-item>
      </template>

      <!-- END -->
      <template slot="end">
        <!-- Login / Register -->
        <b-navbar-item v-if="!currentUser" tag="div">
          <div class="buttons">
            <b-navbar-item
              :to="route('Register')"
              tag="router-link"
              class="button is-primary"
            >
              <b-icon icon="user-circle" size="is-small" />
              <strong>Register</strong>
            </b-navbar-item>
            <b-navbar-item
              :to="route('Login')"
              tag="router-link"
              class="button is-light"
            >
              <b-icon icon="sign-in-alt" size="is-small" />
              <span>Login</span>
            </b-navbar-item>
          </div>
        </b-navbar-item>

        <!-- Profile / Settings / Logout -->
        <div v-if="currentUser" class="buttons">
          <b-dropdown>
            <a class="navbar-item" slot="trigger" role="button">
              <div class="level is-mobile">
                <div class="level-left">
                  <figure style="margin-right: 10px;">
                    <img
                      :src="currentUser.avatar"
                      :alt="currentUser.name"
                      style="border-radius: 50%"
                      v-src
                    />
                  </figure>
                  <strong>{{ currentUser.name }}</strong>
                  <b-icon icon="caret-down" />
                </div>
              </div>
            </a>
            <b-dropdown-item has-link>
              <router-link :to="profileRoute">
                <b-icon icon="user" size="is-small" />
                <span> Profile</span>
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item has-link>
              <router-link :to="route('Settings')">
                <b-icon icon="cog" size="is-small" />
                <span> Settings</span>
              </router-link>
            </b-dropdown-item>
            <hr class="dropdown-divider" />
            <b-dropdown-item @click="logout">
              <b-icon icon="sign-out-alt" size="is-small" />
              <span> Log out</span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </template>

      <!-- Admin -->
      <div v-if="currentUser && currentUser.role === 'admin'">
        <b-navbar-item :to="route('Admin')" tag="router-link" class="">
          <b-icon icon="shield" size="is-small" />
          <span>Admin Panel</span>
        </b-navbar-item>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import animate from "@/services/animate";

export default {
  name: "TheNavBar",
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    profileRoute() {
      return {
        name: "Profile",
        params: { userName: this.currentUser.name }
      };
    }
  },
  methods: {
    route(name) {
      return { name };
    },
    logout() {
      this.$store.commit("logout");
      this.$router.replace({ name: "Login" });
    },
    animateLogo() {
      animate(this.$refs.logo, "bounce");
    }
  }
};
</script>
