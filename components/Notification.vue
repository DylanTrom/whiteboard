// We will be using E1000F as the ERROR color and 009B3C as the SUCCESS color
<template>
  <v-snackbar
    v-model="snackbar"
    top
    relative
    elevation="3"
    :color='color'
    :timeout="timeout"
  >
    <v-row align="center" justify="center"
      >{{ message }}
      <v-spacer></v-spacer>
      <v-btn color="white" text @click="set_snackbar(false)"> Close </v-btn>
    </v-row>
  </v-snackbar>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: ["message", "color", "timeout"],
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["set_snackbar"]),
  },
  computed: {
    snackbar: {
      get() {
        return this.$store.state.snackbar;
      },
      set(value) {
        this.set_snackbar(value);
      },
    },
  },
};
</script>

<style>
</style>