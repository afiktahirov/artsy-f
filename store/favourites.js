export const state = () => ({
  loading: false,
  asyncData: {}
})

export const getters = {
  getFavourites: (state) => state.asyncData.data || [],
}

export const actions = {
  async fetchProducts({ commit }, params) {
    commit('SET_LOADING', { module: 'favourites', loading: true }, { root: true })

    try {
      const res = await this.$axios.get(
        '/products/wish-list', { params: { ...params, '_enables[]': 'ownerData' } }
      )
      commit('SET_DATA', { module: 'favourites', data: res.data }, { root: true })
    } catch (error) {
      commit('SET_LOADING', { module: 'favourites', loading: false }, { root: true })
    } finally {
      commit('SET_LOADING', { module: 'favourites', loading: false }, { root: true })
    }
  },

  async add({ commit, dispatch }, productId) {
    commit('SET_LOADING', { module: 'favourites', loading: true }, { root: true })

    try {
      await this.$axios.post(`/products/${productId}/wish-list`)
      dispatch('fetchProducts')
    } catch (error) {
      commit('SET_LOADING', { module: 'favourites', loading: false }, { root: true })
      return Promise.reject(error)
    } finally {
      commit('SET_LOADING', { module: 'favourites', loading: false }, { root: true })
    }
  },

  async delete({ commit, dispatch }, productId) {
    commit('SET_LOADING', { module: 'favourites', loading: true }, { root: true })

    try {
      await this.$axios.delete(`/products/${productId}/wish-list`)
      dispatch('fetchProducts')
    } catch (error) {
      commit('SET_LOADING', { module: 'favourites', loading: false }, { root: true })
      return Promise.reject(error)
    } finally {
      commit('SET_LOADING', { module: 'favourites', loading: false }, { root: true })
    }
  },
}
