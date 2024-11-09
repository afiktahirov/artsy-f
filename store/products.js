export const state = () => ({
  loading: false,
  asyncData: {},
  filters: {
    categories: [],
    attributes: []
  },
  recentlyViewed: [],
  productDetails: {},
  productReviews: {}
})

export const getters = {
  getProducts: (state) => state.asyncData.data || [],
  getFilterCategories: (state) => state.filters.categories.data || [],
  getFilterAttributes: (state) => state.filters.attributes.data || [],
  getRecentlyViewed: (state) => state.recentlyViewed.data || [],
  getProductDetails: (state) => state.productDetails.data || {},
  getProductReviews: (state) => state.productReviews.data || []
}

export const mutations = {
  SET_FILTER_CATEGORIES(state, data) {
    state.filters.categories = data;
  },

  SET_FILTER_ATTRIBUTES(state, data) {
    state.filters.attributes = data;
  },

  SET_RECENTLY_VIEWED(state, data) {
    state.recentlyViewed = data;
  },

  SET_PRODUCT_DETAILS(state, data) {
    state.productDetails = data;
  },

  SET_PRODUCT_REVIEWS(state, data) {
    state.productReviews = data;
  }
}

export const actions = {
  async fetchProducts({ commit }, params) {
    commit('SET_LOADING', { module: 'products', loading: true }, { root: true })

    try {
      const res = await this.$axios.get('/products', { params })
      commit('SET_DATA', { module: 'products', data: res.data }, { root: true })
      commit('SET_LOADING', { module: 'products', loading: false }, { root: true })
    } catch (error) {
      commit('SET_LOADING', { module: 'products', loading: false }, { root: true })
    }
  },

  async fetchCategoriesByCategoryId({ commit }, categoryIds) {
    let categoryId = null;

    if (Array.isArray(categoryIds)) {
      categoryId = categoryIds[0]
    } else {
      categoryId = categoryIds
    }

    try {
      const res = await this.$axios.get(`/categories/${categoryId}`)
      commit('SET_FILTER_CATEGORIES', res.data)
    } catch (error) {
      console.log(error)
    }
  },

  async fetchAttributesByCategoryIds({ commit }, params) {
    commit('SET_LOADING', { module: 'products', loading: true }, { root: true })

    try {
      const res = await this.$axios.get('/attributes', { params })
      commit('SET_FILTER_ATTRIBUTES', res.data)
      commit('SET_LOADING', { module: 'products', loading: false }, { root: true })
    } catch (error) {
      commit('SET_LOADING', { module: 'products', loading: false }, { root: true })
    }
  },

  async fetchRecentlyViewed({ commit }) {
    try {
      const res = await this.$axios.get('/products/recent-viewed')
      commit('SET_RECENTLY_VIEWED', res.data)
    } catch (error) {
      console.log(error)
    }
  },

  async fetchProductDetails({ commit }, productId) {
    try {
      const res = await this.$axios.get(`/products/${productId}`)
      commit('SET_PRODUCT_DETAILS', res.data)
    } catch (error) {
      console.log(error)
    }
  },

  async fetchProductReviews({ commit }, { id, perPage = 8 }) {
    commit('SET_LOADING', { module: 'products', loading: true }, { root: true })

    try {
      const res = await this.$axios.get(`/products/${id}/reviews?perPage=${perPage}`)
      commit('SET_PRODUCT_REVIEWS', res.data)
    } catch (error) {
      commit('SET_LOADING', { module: 'products', loading: false }, { root: true })
    }
  },

  async addReviewToProduct(_, { id, data }) {
    try {
      await this.$axios.post(`/products/${id}/reviews`, data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
}
