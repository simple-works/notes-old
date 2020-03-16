<template>
  <div id="login">
    <section class="section">
      <ValidationObserver ref="observer" v-slot="{ passes }">
        <div class="columns is-multiline is-centered">
          <div class="column is-6" @keyup.enter="passes(login)">
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
              <!-- Login Error Notification  -->
              <b-notification v-show="error" type="is-danger">
                <b-icon icon="exclamation-circle" />
                <strong>&nbsp;{{ error }}</strong>
              </b-notification>
              <!-- / Login Error Notification  -->
              <div class="field">
                <ValidationInput
                  v-model="user.email"
                  :disabled="loading"
                  name="Email"
                  rules="required|email"
                  type="text"
                  placeholder="Email"
                  icon="envelope"
                />
              </div>

              <div class="field">
                <ValidationInput
                  v-model="user.password"
                  :disabled="loading"
                  name="Password"
                  rules="required|min:8|max:80"
                  type="password"
                  placeholder="Password"
                  icon="key"
                  password-reveal
                />
              </div>

              <div class="field has-addons">
                <div class="control is-expanded">
                  <b-button
                    @click="passes(login)"
                    :loading="loading"
                    type="is-primary"
                    expanded
                  >
                    <b-icon icon="sign-in-alt" size="is-small" />
                    <span>&nbsp;Log in</span>
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
            <b-icon icon="user-circle" size="is-small" />
            <span>&nbsp;Register new account</span>
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
  name: "Login",
  components: {
    ValidationObserver,
    ValidationInput
  },
  metaInfo: {
    title: "Login"
  },
  data() {
    return {
      ref: this.$route.query.ref,
      user: {
        email: "",
        password: ""
      },
      error: "",
      loading: false
    };
  },
  methods: {
    login() {
      this.error = "";
      this.loading = true;
      this.$store
        .dispatch("loginUser", {
          email: this.user.email,
          password: this.user.password
        })
        .then(
          () => {
            this.loading = false;
            this.$router.replace(this.ref || "/").catch(() => null);
          },
          error => {
            this.loading = false;
            if (error.response.status == 400) {
              this.error = "Wrong Email or Password";
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
