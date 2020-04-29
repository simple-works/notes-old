<template>
  <div id="about">
    <section class="section">
      <div class="columns is-multiline is-centered">
        <div class="colmun is-3">
          <article class="box">
            <h1 class="title">Amb-Notes</h1>
            <p class="subtitle">Public notes sharing web application.</p>
            <strong>Version 1.0.0</strong>
          </article>
          <b-message
            v-if="repo"
            title="Repository"
            :closable="false"
            class="animated jackInTheBox"
          >
            <div>
              <strong
                ><a :href="repo.html_url" target="_blank">{{
                  repo.full_name
                }}</a></strong
              >
              <br />
              {{ repo.description }}
              <br />
              <i>{{ repo.size / 1000 }} Mb</i>
            </div>
            <br />
            <div>
              <b-tooltip
                :label="repo.created_at | moment('MMMM Do YYYY, h:mm:ss a')"
                type="is-dark"
              >
                Created {{ repo.created_at | moment("from", "now") }}
              </b-tooltip>
            </div>

            <div>
              <b-tooltip
                :label="repo.pushed_at | moment('MMMM Do YYYY, h:mm:ss a')"
                type="is-dark"
              >
                Pushed {{ repo.pushed_at | moment("from", "now") }}
              </b-tooltip>
            </div>

            <div>
              <b-tooltip
                :label="repo.updated_at | moment('MMMM Do YYYY, h:mm:ss a')"
                type="is-dark"
              >
                <strong>
                  Updated {{ repo.updated_at | moment("from", "now") }}
                </strong>
              </b-tooltip>
            </div>
          </b-message>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "About",
  metaInfo: {
    title: "About"
  },
  async created() {
    const url = "https://api.github.com/repos/ambratolm/amb-notes-old";
    this.repo = (await this.$http.get(url)).data;
  },
  data() {
    return {
      repo: null
    };
  }
};
</script>
