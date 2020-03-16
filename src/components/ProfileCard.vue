<template>
  <div id="profile-card">
    <div v-if="user" class="box">
      <div class="media">
        <div class="media-left">
          <figure class="image is-128x128 is-square">
            <img :src="user.avatar" :alt="user.name" v-src />
          </figure>
        </div>
        <div class="media-content">
          <h1 class="title">
            {{ user.name }}
            <b-tag type="is-dark" size="is-small">
              <b-tooltip
                :label="`${user.id} is the ID number of ${user.name}`"
                type="is-dark"
              >
                <b-icon icon="hashtag" size="is-small" />
                <span class="has-text-weight-bold">
                  {{ user.id }}
                </span>
              </b-tooltip>
            </b-tag>
          </h1>
          <p class="subtitle">{{ user.description }}</p>
          <b-tag type="" size="is-medium">
            <b-icon icon="sticky-note" size="is-small" />
            <span class="has-text-weight-bold"> {{ notes.length }} notes </span>
          </b-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileCard",
  props: {
    user: Object
  },
  computed: {
    notes() {
      return this.$store.getters.notesByUser(this.user.id);
    }
  }
};
</script>
