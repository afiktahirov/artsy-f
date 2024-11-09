export const mutations = {
  SET_LOADING(state, { module, loading }) {
    state[module].loading = loading
  },

  SET_DATA(state, { module, data }) {
    state[module].asyncData = data
  },
}

export const actions = {
  async nuxtServerInit({ state, dispatch }) {
    await dispatch("layout/fetchCategoriesTree")

    if (state.auth.loggedIn) {
      await dispatch("favourites/fetchProducts")
    }
  }
}
