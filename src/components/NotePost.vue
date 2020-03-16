<template>
  <div id="note-post">
    <article v-if="user" class="media box">
      <figure class="media-left has-text-centered">
        <a @click="goToProfile()">
          <figure class="image is-64x64 is-square">
            <img :src="user.avatar" :alt="user.name" v-src />
          </figure>
        </a>
      </figure>
      <div class="media-content">
        <!-- Mangement Buttons -->
        <div v-if="currentUserOwnsNote" class="buttons is-pulled-right">
          <b-tooltip label="Remove" type="is-danger" style="margin-right: 5px">
            <b-button
              @click="removeNoteModal = true"
              :loading="loading"
              type="is-danger"
              size="is-small"
            >
              <b-icon icon="trash-alt" />
            </b-button>
          </b-tooltip>
          <b-tooltip label="Edit" type="is-info">
            <b-button
              @click="editNoteModal = true"
              :loading="loading"
              type="is-info"
              size="is-small"
            >
              <b-icon icon="edit" />
            </b-button>
          </b-tooltip>
        </div>
        <!-- / Mangement Buttons -->

        <!-- Modals -->
        <b-modal :active.sync="removeNoteModal" has-modal-card trap-focus>
          <div class="box card">
            Remove note <strong>{{ note.title }}</strong> ? <br /><br />
            <div class="buttons is-right">
              <b-button @click="removeNoteModal = false" type="is-primary">
                No
              </b-button>
              <b-button @click="removeNote()" type="is-danger">
                Yes
              </b-button>
            </div>
          </div>
        </b-modal>
        <b-modal :active.sync="editNoteModal" has-modal-card trap-focus>
          <NoteForm @action="editNoteModal = false" :note="note" edit />
        </b-modal>
        <!-- / Modals -->
        <div class="content">
          <p style="word-break: break-all;">
            <a @click="goToProfile()">
              <strong>
                {{ user.name }}
              </strong>
            </a>
            -
            <b-tooltip
              :label="note.date | moment('MMMM Do YYYY, h:mm:ss a')"
              type="is-dark"
            >
              <small>
                {{ note.date | moment("from", "now") }}
              </small>
            </b-tooltip>
            <br />
            <strong>{{ note.title }}</strong>
            <br />
            <span>{{ note.content }}</span>
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import NoteForm from "./NoteForm";

export default {
  name: "NotePost",
  components: {
    NoteForm
  },
  props: {
    note: Object
  },
  created() {
    if (this.note) {
      if (this.note.user) {
        this.user = this.note.user;
      } else {
        this.$usersApi
          .read({ id: this.note.userId })
          .then(users => users[0])
          .then(user => (this.user = user));
      }
    }
  },
  data() {
    return {
      user: {},
      editNoteModal: false,
      removeNoteModal: false,
      loading: false
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    currentUserOwnsNote() {
      return this.currentUser && this.currentUser.id === this.note.userId;
    }
  },
  methods: {
    removeNote() {
      if (this.currentUserOwnsNote) {
        this.removeNoteModal = false;
        this.loading = true;
        this.$store
          .dispatch("deleteNote", this.note.id)
          .then(() => (this.loading = false));
      }
    },
    goToProfile() {
      if (this.$route.name !== "Profile") {
        this.$router
          .push({
            name: "Profile",
            params: { userName: this.user.name }
          })
          .catch(() => null);
      }
    }
  }
};
</script>
