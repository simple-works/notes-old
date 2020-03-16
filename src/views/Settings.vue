<template>
  <div id="settings">
    <section class="section">
      <div class="columns is-multiline is-centered">
        <section v-if="currentUser" class="column is-8 box">
          <b-tabs>
            <b-tab-item label="Profile" icon="user">
              <ProfileForm :user="currentUser" />
            </b-tab-item>
            <b-tab-item label="Account" icon="lock">
              <AccountForm :user="currentUser" />
            </b-tab-item>
          </b-tabs>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import ProfileForm from "@/components/ProfileForm";
import AccountForm from "@/components/AccountForm";

export default {
  name: "Settings",
  components: {
    ProfileForm,
    AccountForm
  },
  metaInfo: {
    title: "Settings"
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    }
  }
};
</script>
