<template>
  <div id="admin-users-list">
    <section>
      <h1 class="title">Users ({{ users.length }})</h1>
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="buttons">
              <b-button type="is-primary">
                Add
              </b-button>
              <b-button type="is-warning" :disabled="!checkedUsers.length">
                Edit
              </b-button>
              <b-button
                @click="removeUsers"
                type="is-danger"
                :disabled="!checkedUsers.length"
              >
                Remove
              </b-button>
            </div>
          </div>
          <div class="level-item">
            <b-tag
              v-show="checkedUsers.length"
              @close="checkedUsers = []"
              size="is-medium"
              closable
            >
              <strong>{{ checkedUsers.length }} users</strong> checked
            </b-tag>
          </div>
        </div>
      </div>
      <b-table
        :data="users"
        :row-class="(row, index) => row.id === selectedUser.id && 'is-primary'"
        :checked-rows.sync="checkedUsers"
        :selected.sync="selectedUser"
        :per-page="10"
        :current-page.sync="currentPage"
        pagination-position="bottom"
        paginated
        focusable
        checkable
        narrowed
      >
        <template slot-scope="props">
          <b-table-column field="id" label="ID" width="40" numeric>
            {{ props.row.id }}
          </b-table-column>
          <b-table-column field="name" label="Name" width="200">
            {{ props.row.name }}
          </b-table-column>
          <b-table-column field="password" label="Password">
            {{ props.row.password }}
          </b-table-column>
          <b-table-column>
            <div
              v-show="props.row.id === selectedUser.id"
              class="buttons are-small"
            >
              <b-button
                tag="router-link"
                :to="{ name: 'AdminUser', params: { id: props.row.id } }"
                type="is-info"
              >
                View
              </b-button>
              <b-button type="is-warning">
                Edit
              </b-button>
              <b-button @click="removeUser" type="is-danger">
                Remove
              </b-button>
            </div>
          </b-table-column>
        </template>
      </b-table>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AdminUsers",
  data() {
    return {
      selectedUser: {},
      checkedUsers: [],
      currentPage: 1
    };
  },
  computed: {
    ...mapGetters(["users", "notes"])
  },
  methods: {
    removeUser() {
      if (this.selectedUser) {
        this.$store.dispatch("deleteUser", this.selectedUser.id);
        if (this.checkedUsers.includes(this.selectedUser)) {
          this.checkedUsers.splice(
            this.checkedUsers.indexOf(this.selectedUser),
            1
          );
        }
        this.selectedUser = {};
      }
    },
    removeUsers() {
      if (this.checkedUsers.length) {
        this.checkedUsers.forEach(user => {
          this.$store.dispatch("deleteUser", user.id);
        });
        this.checkedUsers = [];
      }
    }
  }
};
</script>
