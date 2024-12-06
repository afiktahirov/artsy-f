export const state = () => ({
  loading: false,
  asyncData: {},
  filters: {
    categories: [],
    attributes: []
  },
  recentlyViewed: [],
  productDetails: {},
  productReviews: {},
  tag_ids : []
})

export const getters = {
  getProducts: (state) => state.asyncData.data || [],
  getFilterCategories: (state) => state.filters.categories.data || [],
  getFilterAttributes: (state) => state.filters.attributes.data || [],
  getRecentlyViewed: (state) => state.recentlyViewed.data || [],
  getProductDetails: (state) => state.productDetails.data || {},
  getProductReviews: (state) => state.productReviews.data || [],
  getTagIds: (state) => state.tag_ids.data || []
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
  },

  SET_TAG_IDS(state, data) {
    state.tag_ids = data;
  }
}

export const actions = {
  async fetchProducts({ commit }, params) {
    commit('SET_LOADING', { module: 'products', loading: true }, { root: true })

    try {
      const res = await this.$axios.get('/products', { 
        params,
        headers : {'X-Content-Language': this.$i18n.locale || 'ru', }
      })
      commit('SET_DATA', { module: 'products', data: res.data }, { root: true })
      commit('SET_LOADING', { module: 'products', loading: false }, { root: true })
    } catch (error) {
      commit('SET_LOADING', { module: 'products', loading: false }, { root: true })
    }
  },

  async fetchTags({ commit }) {
    try {
      const res = await this.$axios.get('/tags', {
        headers : {'X-Content-Language': this.$i18n.locale || 'ru', }
      })
      commit('SET_TAG_IDS', res.data)
    } catch (error) {
      console.log(error)
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
      const res = await this.$axios.get(`/categories/${categoryId}`, {
        headers : {'X-Content-Language': this.$i18n.locale || 'ru', }
      })
      commit('SET_FILTER_CATEGORIES', res.data)
    } catch (error) {
      console.log(error)
    }
  },

  async fetchAttributesByCategoryIds({ commit }, params) {
    commit('SET_LOADING', { module: 'products', loading: true }, { root: true })

    try {
      const res = await this.$axios.get('/attributes', { 
        params,
        headers : {'X-Content-Language': this.$i18n.locale || 'ru', }
      })
      commit('SET_FILTER_ATTRIBUTES', res.data)
      commit('SET_LOADING', { module: 'products', loading: false }, { root: true })
    } catch (error) {
      commit('SET_LOADING', { module: 'products', loading: false }, { root: true })
    }
  },

  async fetchRecentlyViewed({ commit }) {
    try {
      const res = await this.$axios.get('/products/recent-viewed', {
        headers : {'X-Content-Language': this.$i18n.locale || 'ru', }
      })
      commit('SET_RECENTLY_VIEWED', res.data)
    } catch (error) {
      console.log(error)
    }
  },

  async fetchProductDetails({ commit }, productId) {
    try {
      const res = await this.$axios.get(`/products/${productId}`, {
        headers : {'X-Content-Language': this.$i18n.locale || 'ru', }
      })
      commit('SET_PRODUCT_DETAILS', res.data)
    } catch (error) {
      console.log(error)
    }
  },

  async fetchProductReviews({ commit }, { id, perPage = 8 }) {
    commit('SET_LOADING', { module: 'products', loading: true }, { root: true })

    try {
      const res = await this.$axios.get(`/products/${id}/reviews?perPage=${perPage}`, {
        headers : {'X-Content-Language': this.$i18n.locale || 'ru', }
      })
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
