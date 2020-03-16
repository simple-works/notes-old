<template>
  <div id="profile">
    <section class="section">
      <div class="columns is-multiline is-centered">
        <section v-if="loading" class="column is-8 section">
          <Loading
            :active="loading"
            :message="`Loading ${userName}'s profile...`"
          />
        </section>
        <section v-if="error" class="column is-8">
          <b-notification
            type="is-danger"
            :closable="false"
            icon="user-circle"
            has-icon
          >
            <span class="has-text-weight-bold">{{ error.title }}</span> <br />
            {{ error.description }}
          </b-notification>
        </section>
        <section v-if="!loading" class="column is-8">
          <ProfileCard :user="user" />
        </section>
        <section v-if="!loading" class="column is-8">
          <b-notification
            :active="!notes.length"
            type="is-info"
            :closable="false"
          >
            <p class="has-text-centered">
              <strong>{{ user.name }}</strong> hasn't posted any note yet
            </p>
          </b-notification>
          <NotePost
            v-for="note in notes"
            :key="note.id"
            :note="note"
            style="margin-bottom:20px;"
          />
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import ProfileCard from "@/components/ProfileCard";
import NotePost from "@/components/NotePost";

export default {
  name: "Profile",
  metaInfo: {
    title: "Profile"
  },
  components: {
    NotePost,
    ProfileCard
  },
  created() {
    this.fetchUser();
  },
  data() {
    return {
      user: null,
      loading: false,
      error: null
    };
  },
  computed: {
    userName() {
      return this.$route.params.userName;
    },
    notes() {
      return this.$store.getters.notesByUser(this.user.id);
    }
  },
  watch: {
    userName() {
      this.fetchUser();
    }
  },
  methods: {
    fetchUser() {
      this.error = null;
      this.loading = true;
      if (this.userName) {
        this.$usersApi
          .read({ name: this.userName })
          .then(users => users[0])
          .then(
            user => {
              this.loading = false;
              if (!user) {
                this.error = {
                  title: "User not found",
                  description:
                    "Account with this user name doesn't exist or was deleted"
                };
                return;
              }
              this.user = user;
            },
            error => {
              this.loading = false;
              this.error = {
                title: "An error has occured",
                description: error.response.data
              };
            }
          );
      }
    }
  }
};
</script>
