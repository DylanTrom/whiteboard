<template>
  <v-container fluid>
    <Notification
      :message="snackbar_message"
      :color="snackbar_color"
      :timeout="snackbar_timeout"
    />
    <Loading :loading="loading" />
    <v-card-text class="pt-0 pl-0 pr-0">
      Please enter the following information to login as an admin for the event:
    </v-card-text>
    <v-form @submit="submit_form" v-model="valid_login" ref="login">
      <v-text-field
        v-model="userInfo.email"
        outlined
        label="Email"
        placeholder="Please Enter Your Email"
        required
        :rules="[(v) => !!v || 'Email is Required', validEmail]"
        persistent-placeholder
        validate-on-blur
      >
      </v-text-field>
      <v-text-field
        v-model="userInfo.password"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="show = !show"
        :type="show ? 'text' : 'password'"
        outlined
        label="Password"
        persistent-placeholder
        placeholder="Please Enter Password"
        required
        :rules="[(v) => !!v || 'Password is Required']"
      >
      </v-text-field>
      <v-row align="center" justify="center">
        <v-col cols="6">
          <v-btn
            block
            :disabled="!valid_login"
            class="white--text"
            color="#1565C0"
            @click="login"
          >
            Login
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
import Notification from "../components/Notification.vue";
import Loading from "../components/Loading.vue";
import LOGIN from "../services/Login.service";

export default {
  data() {
    return {
      show: false,
      loading: false,

      snackbar_message: "",
      snackbar_color: "",
      snackbar_timeout: 0.01,

      valid_login: false,
      userInfo: {
        email: "",
        password: "",
      },
    };
  },
  components: {
    Notification: Notification,
    Loading: Loading,
  },
  mounted() {

  },
  methods: {
    ...mapMutations(['set_snackbar']),
    submit_form(event){
        event.preventDefault()
        if (this.$refs.login.validate()){
            this.login()
        }
    },
    login() {
      this.loading = true;
      LOGIN(this.userInfo, (response, status) => {
        this.snackbar_color = "#E1000F";
        this.set_snackbar(true);
        this.snackbar_timeout = 5000;
        if (status) {
          if (response.status)  {
            this.set_snackbar(false);
            this.$cookies.set("token", response.token);
            // this.$router.push({ path: "/landing" });
          } else {
            this.snackbar_message =
              "Login Unsuccessful. Incorrect Email / Password";
          }
        } else {
          this.snackbar_message =
            "A server error has occurred, please contact an administrator if this happens again";
        }
        this.loading = false;
      });
    },
    validEmail(email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email) || "Invalid Email";
    },
  },
};
</script>

<style scoped>
</style>