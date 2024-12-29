export const state = () => ({
  loading: false,
  asyncData: {},
  filters: {
    categories: [],
    attributes: [],
    tags: []
  },
  recentlyViewed: [],
  productDetails: {},
  productReviews: {},
  tag_ids: [],
  tag : {}
})

export const getters = {
  getProducts: (state) => state.asyncData.data || [],
  getFilterCategories: (state) => state.filters.categories.data || [],
  getFilterTags: (state) => state.filters.tags || [],
  getFilterAttributes: (state) => state.filters.attributes.data || [],
  getRecentlyViewed: (state) => state.recentlyViewed.data || [],
  getProductDetails: (state) => state.productDetails.data || {},
  getProductReviews: (state) => state.productReviews.data || [],
  getTagIds: (state) => state.tag_ids.data || [],
  getTag: (state) => state.tag || []
}

export const mutations = {
  SET_FILTER_CATEGORIES(state, data) {
    state.filters.categories = data;
  },

  SET_FILTER_TAGS(state, data) {
    state.filters.tags = data;
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
  },

  SET_TAG(state, data) {
    state.tag = data;
  }
}

export const actions = {
  async fetchProducts({ commit }, params) {
    commit('SET_LOADING', { module: 'products', loading: true }, { root: true })

    try {
      const res = await this.$axios.get('/products', {
        params,
        headers: { 'X-Content-Language': this.$i18n.locale || 'ru', }
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
        headers: { 'X-Content-Language': this.$i18n.locale || 'ru', }
      })
      commit('SET_TAG_IDS', res.data)
    } catch (error) {
      console.log(error)
    }
  },

  async fetchTag({ commit }, id) {
    try {
      const res = await this.$axios.get(`/tag/getTitle/${id}`, {
        headers: { 'X-Content-Language': this.$i18n.locale || 'ru', }
      })
      commit('SET_TAG', res.data)
    } catch (error) {
      console.log(error)
    }
  },

  async fetchTagsByTagId({ commit }, tagids) {
    let tagId = null;
    if (Array.isArray(tagids)) {
      tagId = tagids[0]
    } else {
      tagId = tagids
    }

    try {
      const res = await this.$axios.get(`/tag/${tagId}`, {
        headers: { 'X-Content-Language': this.$i18n.locale || 'ru', }
      })

      res.data = res.data.map(product => {
        if (product.images) {
          product.images = product.images.map(image =>
            `http://api.artsy.az/${image}`
          );
        }
        return product;
      });
      commit('SET_FILTER_TAGS', res.data)
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
        headers: { 'X-Content-Language': this.$i18n.locale || 'ru', }
      })
      commit('SET_FILTER_CATEGORIES', res.data)
    } catch (error) {
      console.log(error)
    }
  },

  async fetchAttributesByTagIds({ commit }, params) {
    commit('SET_LOADING', { module: 'products', loading: true }, { root: true })

    try {
      const res = await this.$axios.get('/attributes', {
        params,
        headers: { 'X-Content-Language': this.$i18n.locale || 'ru', }
      })
      commit('SET_FILTER_ATTRIBUTES', res.data)
      commit('SET_LOADING', { module: 'products', loading: false }, { root: true })
    } catch (error) {
      commit('SET_LOADING', { module: 'products', loading: false }, { root: true })
    }
  },

  async fetchAttributesByCategoryIds({ commit }, params) {
    commit('SET_LOADING', { module: 'products', loading: true }, { root: true })

    try {
      const res = await this.$axios.get('/attributes', {
        params,
        headers: { 'X-Content-Language': this.$i18n.locale || 'ru', }
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
        headers: { 'X-Content-Language': this.$i18n.locale || 'ru', }
      })
      commit('SET_RECENTLY_VIEWED', res.data)
    } catch (error) {
      console.log(error)
    }
  },

  async fetchProductDetails({ commit }, productId) {
    try {
      const res = await this.$axios.get(`/products/${productId}`, {
        headers: { 'X-Content-Language': this.$i18n.locale || 'ru', }
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
        headers: { 'X-Content-Language': this.$i18n.locale || 'ru', }
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
