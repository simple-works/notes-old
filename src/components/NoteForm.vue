<template>
  <div id="note-form">
    <article v-if="currentUser" class="media box card">
      <figure class="media-left has-text-centered">
        <a @click="goToProfile()">
          <figure class="image is-64x64 is-square">
            <img :src="currentUser.avatar" :alt="currentUser.name" />
          </figure>
        </a>
      </figure>
      <div class="media-content">
        <div class="content">
          <div>
            <a @click="goToProfile()">
              <strong>
                {{ currentUser.name }}
              </strong>
            </a>
            <!-- Note Form -->
            <div style="margin-top: 10px;">
              <!-- Post Error Notification  -->
              <b-notification v-show="error" type="is-danger">
                <b-icon icon="exclamation-circle" />
                <strong>&nbsp;{{ error }}</strong>
              </b-notification>
              <!-- / Post Error Notification  -->
              <ValidationObserver ref="observer" v-slot="{ passes }">
                <div class="field">
                  <ValidationInput
                    v-model="tempNote.title"
                    :disabled="loading"
                    name="Title"
                    rules="required|min:3|max:30"
                    type="text"
                    placeholder="Title"
                    icon="pen"
                  />
                </div>

                <div class="field">
                  <ValidationInput
                    v-model="tempNote.content"
                    :disabled="loading"
                    name="Content"
                    rules="required|min:10|max:1000"
                    maxlength="1000"
                    type="textarea"
                    placeholder="Content"
                  />
                </div>
                <div class="field">
                  <div class="control buttons is-right">
                    <b-button @click="cancel()" type="is-primary">
                      Cancel
                    </b-button>
                    <b-button @click="passes(save)" type="is-info">
                      <b-icon icon="sticky-note" size="is-small" />
                      <span>{{ edit ? "Save" : "Post" }}</span>
                    </b-button>
                  </div>
                </div>
              </ValidationObserver>
            </div>
            <!-- / Note Form -->
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import ValidationInput from "./ValidationInput";

export default {
  name: "NotePostForm",
  components: {
    ValidationObserver,
    ValidationInput
  },
  props: {
    note: {
      type: Object,
      default: () => ({
        title: "",
        content: ""
      })
    },
    edit: Boolean
  },
  data() {
    return {
      tempNote: {
        title: this.note.title,
        content: this.note.content
      },
      loading: false,
      error: ""
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    }
  },
  methods: {
    save() {
      this.loading = true;
      if (this.edit) {
        this.$store
          .dispatch("updateNote", {
            id: this.note.id,
            note: {
              ...this.tempNote,
              userId: this.currentUser.id,
              date: this.note.date
            }
          })
          .then(
            () => {
              this.loading = false;
              this.$emit("action");
              this.$emit("save");
            },
            () => {
              this.loading = false;
              this.error = "An error has occured";
            }
          );
      } else {
        this.$store
          .dispatch("createNote", {
            title: this.tempNote.title,
            content: this.tempNote.content,
            userId: this.currentUser.id,
            date: new Date()
          })
          .then(
            () => {
              this.loading = false;
              this.reset();
              this.$emit("action");
              this.$emit("save");
            },
            () => {
              this.loading = false;
              this.error = "An error has occured";
            }
          );
      }
    },
    reset() {
      for (const prop in this.tempNote) {
        this.tempNote[prop] = "";
      }
      this.error = "";
      requestAnimationFrame(() => {
        if (this.$refs.observer) {
          this.$refs.observer.reset();
        }
      });
    },
    cancel() {
      this.reset();
      this.$emit("action");
      this.$emit("cancel");
    },
    goToProfile() {
      if (this.$route.name !== "Profile") {
        this.$router
          .push({
            name: "Profile",
            params: { userName: this.currentUser.name }
          })
          .catch(() => null);
      }
    }
  }
};
</script>
