<template>
  <div id="admin">
    <section class="section">
      <div class="columns is-multiline is-centered">
        <div class="column is-3">
          <b-menu>
            <b-menu-list label="General">
              <b-menu-item
                :to="{ name: 'AdminOverview' }"
                tag="router-link"
                icon="tachometer-alt"
                label="Overview"
              />
            </b-menu-list>
            <b-menu-list label="Manage">
              <b-menu-item
                :to="{ name: 'AdminUsers' }"
                tag="router-link"
                icon="users"
                label="Users"
              />
            </b-menu-list>
          </b-menu>
        </div>
        <div class="column is-9">
          <router-view />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Admin",
  data() {
    return {
      editMode: false,
      selectedNote: null,
      columns: [
        {
          field: "id",
          label: "ID",
          width: "40",
          numeric: true
        },
        { field: "authorId", label: "Author" },
        {
          field: "title",
          label: "Title"
        },
        {
          field: "content",
          label: "Content"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["users", "notes"])
  },
  methods: {
    saveNote() {
      this.$store.dispatch("updateNote", this.selectedNote);
      this.editMode = false;
    }
  }
};
</script>
