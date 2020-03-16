<template>
  <div id="home">
    <section class="section">
      <div class="columns is-multiline is-centered">
        <div class="column is-8">
          <section v-if="currentUser" style="margin-bottom:20px;">
            <div v-if="!post" @click="post = true" class="box">
              <b-input placeholder="Create a new note" icon="sticky-note" />
            </div>
            <div v-if="post">
              <NoteForm @cancel="post = false" />
            </div>
          </section>
          <section v-if="loading" class="section">
            <Loading :active="loading" message="Loading Notes..." />
          </section>
          <section v-if="!loading">
            <NotePost
              v-for="note in notes"
              :key="note.id"
              :note="note"
              style="margin-bottom:20px;"
            />
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NotePost from "@/components/NotePost";
import NoteForm from "@/components/NoteForm";

export default {
  name: "Home",
  components: {
    NotePost,
    NoteForm
  },
  data() {
    return {
      post: false
    };
  },
  computed: {
    ...mapGetters(["currentUser", "notes"]),
    loading() {
      return !this.notes.length;
    }
  }
};
</script>
