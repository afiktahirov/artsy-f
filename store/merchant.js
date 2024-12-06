export const state = () => ({
  loading: false,
  asyncData: {},
  details: {},
  merchantCategories: {},
  merchantReviews: {},
})

export const getters = {
  getProducts: (state) => state.asyncData.data || [],
  getDetails: (state) => state.details.data || {},
  getMerchantCategories: (state) => state.merchantCategories.data || [],
  getMerchantReviews: (state) => state.merchantReviews.data || [],
}

export const mutations = {
  SET_DETAILS(state, data) {
    state.details = data;
  },

  SET_MERCHANT_CATEGORIES(state, data) {
    state.merchantCategories = data;
  },

  SET_MERCHANT_REVIEWS(state, data) {
    state.merchantReviews = data;
  }
}

export const actions = {
  async fetchDetails({ commit }, id) {
    try {
      const res = await this.$axios.get(`/customers/${id}`, {
        headers : {'X-Content-Language': this.$i18n.locale || 'ru', }
      })
      commit('SET_DETAILS', res.data)
    } catch (error) {
      console.log(error)
    }
  },

  async fetchProducts({ commit }, params) {
    commit('SET_LOADING', { module: 'merchant', loading: true }, { root: true })

    try {
      const res = await this.$axios.get('/products', { 
        params,
        headers : {'X-Content-Language': this.$i18n.locale || 'ru', }
      })
      commit('SET_DATA', { module: 'merchant', data: res.data }, { root: true })
    } catch (error) {
      commit('SET_LOADING', { module: 'merchant', loading: false }, { root: true })
    } finally {
      commit('SET_LOADING', { module: 'merchant', loading: false }, { root: true })
    }
  },

  async fetchCategories({ commit }, id) {
    try {
      const res = await this.$axios.get(`/categories/by-customer/${id}`, {
        headers : {'X-Content-Language': this.$i18n.locale || 'ru', }
      })
      commit('SET_MERCHANT_CATEGORIES', res.data)
    } catch (error) {
      console.log(error)
    }
  },

  async fetchReviews({ commit }, id) {
    try {
      const res = await this.$axios.get(`/reviews/by-customer/${id}`, {
        headers : {'X-Content-Language': this.$i18n.locale || 'ru', }
      })
      commit('SET_MERCHANT_REVIEWS', res.data)
    } catch (error) {
      console.log(error)
    }
  },
}
