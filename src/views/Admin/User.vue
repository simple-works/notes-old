<template>
  <div id="admin-user-details">
    <div v-if="user">
      <h1 class="title">User Details</h1>
      <div class="buttons">
        <b-button>Edit</b-button>
        <b-button>Remove</b-button>
      </div>
      <div class="media">
        <div class="media-left">
          <b-icon icon="user-circle" size="is-large" />
        </div>
        <div class="media-content">
          <div class="content">
            <p>ID: {{ user.id }}</p>
            <p>Name: {{ user.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";

export default {
  name: "AdminUser",
  created() {},
  data() {
    return {
      xuser: {}
    };
  },
  computed: {
    user() {
      const userId = this.$route.params.id;
      const users = this.$store.getters.users;
      if (userId && users && users.length) {
        return users.find(user => (user.id = userId));
      }
      return null;
    }
  }
};
</script>
