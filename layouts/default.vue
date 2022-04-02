<template>
  <v-app style="background-color:#f0f0f0">
    <v-app-bar flat dense app dark color="#1565C0">
      <v-app-bar-nav-icon
        v-if="get_nav_items.length != 0"
        @click="drawer = true"
      ></v-app-bar-nav-icon>
      <v-spacer> </v-spacer>
      <v-app-bar-title>{{ get_page_name }}</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer
      dark
      v-if="get_nav_items.length != 0"
      v-model="drawer"
      fixed
      temporary
      :src="require('@/assets/bg.png')"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Whiteboard </v-list-item-title>
          <v-list-item-subtitle> Navigation Menu </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="(item, i) in get_nav_items"
          :key="i"
          link
          :to="item.to"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>

          <v-spacer></v-spacer>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-list dense nav>
          <v-list-item
            v-for="(item, i) in get_bottom_nav_items"
            :key="i"
            link
            :to="item.to"
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>

            <v-spacer></v-spacer>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-main>
      <Nuxt />
      <v-spacer></v-spacer>
    </v-main>
    <v-footer app :absolute="Boolean(get_nav_items.length)" dark padless color="#1565C0">
      <v-col class="text-center pa-0" cols="12">
        {{ new Date().getFullYear() }} — <strong>Whiteboard</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import Vue from "vue";
import VueCookies from "vue-cookies";

Vue.use(VueCookies);
Vue.$cookies.config("-1");

export default {
  computed: {
    get_page_name() {
      return this.$store.state.page_name;
    },
    get_nav_items() {
      return this.$store.state.nav_items;
    },
    get_bottom_nav_items() {
      return this.$store.state.bottom_nav_items;
    },
  },
  data() {
    return {
      drawer: false,
    };
  },
};
</script>

<style scoped>
::-webkit-scrollbar {
  display:none;
}
</style>