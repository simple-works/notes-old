<template>
  <div id="admin-overview">
    <h1 class="title">Overview</h1>
    <div class="columns is-multiline is-centered">
      <div class="column is-half">
        <div class="box">
          <nav class="level has-text-centered">
            <div class="level-item">
              <div>
                <p class="heading">Users</p>
                <p class="title">
                  {{ users.length }}
                </p>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div class="column is-half">
        <div class="box">
          <nav class="level has-text-centered">
            <div class="level-item">
              <div>
                <p class="heading">Notes</p>
                <p class="title">{{ notes.length }}</p>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div class="column is-half">
        <div class="box">
          <p class="heading">Users</p>
          <div v-for="user in users" :key="user.id">
            <b-icon icon="user" size="is-small" />
            <strong> {{ user.name }}</strong>
          </div>
        </div>
      </div>
      <div class="column is-half">
        <div class="box">
          <p class="heading">Notes</p>
          <div v-for="note in notes" :key="note.id">
            <b-icon icon="sticky-note" size="is-small" />
            <strong> {{ note.title }}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AdminOverview",
  computed: {
    ...mapGetters(["users", "notes"])
  }
};
</script>
