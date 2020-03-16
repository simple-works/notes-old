<template>
  <div id="register">
    <section class="section">
      <ValidationObserver ref="observer" v-slot="{ passes }">
        <div class="columns is-multiline is-centered">
          <div class="column is-6" @keyup.enter="passes(register)">
            <div class="box">
              <!-- Access Denied Notification -->
              <b-notification v-show="ref" type="is-warning" :closable="false">
                <div class="has-text-centered">
                  <p>
                    <b-icon icon="lock" size="is-large" /><br />
                    <strong>Authentication Required</strong><br />
                    Access denied to page <strong>{{ ref }}</strong>
                  </p>
                </div>
              </b-notification>
              <!-- / Access Denied Notification -->
              <!-- Register Error Notification  -->
              <b-notification v-show="error" type="is-danger">
                <b-icon icon="exclamation-circle" />
                <strong>&nbsp;{{ error }}</strong>
              </b-notification>
              <!-- / Register Error Notification  -->
              <div class="field">
                <ValidationInput
                  v-model="user.email"
                  :disabled="loading"
                  name="Email"
                  rules="required|email"
                  type="email"
                  placeholder="Email"
                  icon="envelope"
                />
              </div>

              <div class="field">
                <ValidationInput
                  v-model="user.name"
                  :disabled="loading"
                  name="Name"
                  rules="required|min:3|max:30"
                  type="text"
                  placeholder="Name"
                  icon="user"
                />
              </div>

              <div class="field">
                <ValidationInput
                  v-model="user.password"
                  :disabled="loading"
                  name="Password"
                  rules="required|min:8|max:80"
                  vid="password"
                  type="password"
                  placeholder="Password"
                  icon="key"
                  password-reveal
                />
              </div>

              <div class="field">
                <ValidationInput
                  v-model="user.password2"
                  :disabled="loading"
                  name="Password"
                  rules="required|confirmed:password"
                  type="password"
                  placeholder="Password Confirmation"
                  icon="key"
                  password-reveal
                />
              </div>

              <div class="field has-addons">
                <div class="control is-expanded">
                  <b-button
                    @click="passes(register)"
                    :loading="loading"
                    type="is-primary"
                    expanded
                  >
                    <b-icon icon="user-circle" size="is-small" />
                    <span>&nbsp;Register</span>
                  </b-button>
                </div>
                <div class="control">
                  <b-button
                    @click="reset"
                    :disabled="loading"
                    type="is-primary"
                    title="Reset fields"
                  >
                    <b-icon icon="undo" />
                  </b-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="has-text-centered">
          <router-link :to="{ path: 'register', query: { ref } }">
            <b-icon icon="sign-in-alt" size="is-small" />
            <span>&nbsp;Log into existing account</span>
          </router-link>
        </div>
      </ValidationObserver>
    </section>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import ValidationInput from "@/components/ValidationInput";

export default {
  name: "Register",
  components: {
    ValidationObserver,
    ValidationInput
  },
  metaInfo: {
    title: "Register"
  },
  data() {
    return {
      ref: this.$route.query.ref,
      user: {
        email: "",
        name: "",
        password: "",
        password2: ""
      },
      error: "",
      loading: false
    };
  },
  methods: {
    register() {
      this.error = "";
      this.loading = true;
      this.$store
        .dispatch("registerUser", {
          email: this.user.email,
          password: this.user.password,
          name: this.user.name,
          avatar: require("@/assets/images/avatar.png")
        })
        .then(
          () => {
            this.loading = false;
            this.$router.replace(this.ref || "/").catch(() => null);
          },
          error => {
            this.loading = false;
            if (error.response.status == 400) {
              this.error = "User already exists";
              return;
            }
            this.error = "An error has occured";
          }
        );
    },
    reset() {
      for (const prop in this.user) {
        this.user[prop] = "";
      }
      this.error = "";
      requestAnimationFrame(() => {
        this.$refs.observer.reset();
      });
    }
  }
};
</script>
