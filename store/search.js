export const state = () => ({
  loading: false,
  asyncData: {}
})

export const getters = {
  getProducts: (state) => state.asyncData.data || [],
}

export const actions = {
  async searchProducts({ commit }, params) {
    commit('SET_LOADING', { module: 'search', loading: true }, { root: true })

    try {
      const res = await this.$axios.get('/products/search', { params })
      commit('SET_DATA', { module: 'search', data: res.data }, { root: true })
    } catch (error) {
      commit('SET_LOADING', { module: 'search', loading: false }, { root: true })
    } finally {
      commit('SET_LOADING', { module: 'search', loading: false }, { root: true })
    }
  },
}
