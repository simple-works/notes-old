<template>
  <div id="profile-form">
    <ValidationObserver ref="observer" v-slot="{ passes, changed, invalid }">
      <div class="field">
        <ProfileCard :user="tempUser" />
      </div>

      <div class="field">
        <ValidationInput
          v-model="tempUser.avatar"
          name="Avatar"
          label="Avatar"
          type="text"
          placeholder="Avatar"
          icon="image"
        />
      </div>

      <div class="field">
        <ValidationInput
          v-model="tempUser.name"
          name="Name"
          label="Name"
          rules="required|min:3|max:30"
          type="text"
          placeholder="Name"
          icon="user"
        />
      </div>

      <div class="field">
        <ValidationInput
          v-model="tempUser.description"
          name="Description"
          label="Description"
          rules="max:100"
          maxlength="100"
          type="textarea"
          placeholder="Content"
        />
      </div>
      <div class="field">
        <div class="control buttons is-right">
          <b-button
            @click="passes(save)"
            :loading="loading"
            :disabled="invalid || !changed"
            type="is-info"
          >
            <b-icon icon="check" size="is-small" />
            <span>Save</span>
          </b-button>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import ValidationInput from "@/components/ValidationInput";
import ProfileCard from "./ProfileCard";

export default {
  name: "ProfileForm",
  components: {
    ValidationObserver,
    ValidationInput,
    ProfileCard
  },
  props: {
    user: {
      type: Object,
      default: () => ({
        name: "",
        description: "",
        avatar: ""
      })
    }
  },
  data() {
    return {
      loading: false,
      tempUser: {
        id: this.user.id,
        name: this.user.name,
        description: this.user.description,
        avatar: this.user.avatar
      }
    };
  },
  methods: {
    save() {
      this.loading = true;
      this.$store
        .dispatch("updateUser", {
          id: this.user.id,
          user: this.tempUser
        })
        .then(() => {
          this.loading = false;
          this.reset();
          this.$emit("action");
          this.$emit("save");
        });
    },
    reset() {
      requestAnimationFrame(() => {
        if (this.$refs.observer) {
          this.$refs.observer.reset();
        }
      });
    }
  }
};
</script>
