<template>
  <div id="account-form">
    <ValidationObserver ref="observer" v-slot="{ passes, changed, invalid }">
      <div class="field">
        <b-notification v-show="error" type="is-danger">
          <b-icon icon="exclamation-circle" />
          <strong>&nbsp;{{ error }}</strong>
        </b-notification>
      </div>

      <div class="field">
        <ValidationInput
          v-model="tempUser.email"
          :disabled="loading"
          name="Email"
          label="Email"
          rules="required|email"
          type="email"
          placeholder="Email"
          icon="envelope"
        />
      </div>

      <div class="field">
        <b-checkbox v-model="changePassword">
          Change Password
        </b-checkbox>
      </div>

      <div v-if="changePassword" class="field">
        <div class="field">
          <ValidationInput
            v-model="tempUser.password"
            :disabled="loading"
            name="Current Password"
            label="Current Password"
            rules="required|min:8|max:80"
            vid="password"
            type="password"
            placeholder="Current Password"
            icon="key"
            password-reveal
          />
        </div>

        <div class="field">
          <ValidationInput
            v-model="tempUser.newPassword"
            :disabled="loading"
            name="New Password"
            label="New Password"
            rules="required|min:8|max:80"
            vid="newPassword"
            type="password"
            placeholder="New Password"
            icon="key"
            password-reveal
          />
        </div>

        <div class="field">
          <ValidationInput
            v-model="tempUser.newPassword2"
            :disabled="loading"
            name="New Password Confirmation"
            label="New Password Confirmation"
            rules="required|confirmed:newPassword"
            type="password"
            placeholder="New Password Confirmation"
            icon="key"
            password-reveal
          />
        </div>
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

export default {
  name: "AccountForm",
  components: {
    ValidationObserver,
    ValidationInput
  },
  props: {
    user: {
      type: Object,
      default: () => ({
        email: "",
        password: ""
      })
    }
  },
  data() {
    return {
      loading: false,
      error: "",
      changePassword: false,
      tempUser: {
        email: this.user.email,
        password: "",
        newPassword: "",
        newPassword2: ""
      }
    };
  },
  methods: {
    save() {
      this.loading = true;
      let updatedUser = { email: this.tempUser.email };

      const updateUser = () => {
        this.$store
          .dispatch("updateUser", {
            id: this.user.id,
            user: updatedUser
          })
          .then(() => {
            this.loading = false;
            this.reset();
            this.$emit("action");
            this.$emit("save");
          });
      };

      if (this.changePassword) {
        this.$usersApi
          .check(this.tempUser.email, this.tempUser.password)
          .then(userExists => {
            if (userExists) {
              updatedUser.password = this.tempUser.newPassword;
              updateUser();
            } else {
              this.loading = false;
              this.error = "Wrong Current Password";
            }
          });
      } else {
        updateUser();
      }
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
