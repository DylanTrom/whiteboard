export const state = () => ({
    page_name: "",
    snackbar: false,
    nav_items : [],
    bottom_nav_items: []
  })

  export const mutations = {
    set_page_name(state, name) {
      state.page_name = name
    },

    set_nav_items(state, items) {
        state.nav_items = items
    },

    set_bottom_nav_items(state, items) {
      state.bottom_nav_items = items
  },

    set_snackbar(state, condition) {
      state.snackbar = condition
  }
  }