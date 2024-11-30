export const state = () => ({
  loading: false,
  asyncData: {},
  productDetails: {},
  transactions: {
    data: [
      {
        id: "1",
        product_id: "1",
        product_name: "Product 1",
        type: "product_vip",
        status: "created",
        amount: "10",
        created_at: "2022-07-24T05:08:59",
      },
      {
        id: "2",
        product_id: "2",
        product_name: "Product 2",
        type: "product_vip",
        status: "approved",
        amount: "10",
        created_at: "2022-07-24T05:08:59",
      },
      {
        id: "3",
        product_id: "3",
        product_name: "Product 3",
        type: "product_vip",
        status: "declined",
        amount: "10",
        created_at: "2022-07-24T05:08:59",
      },
    ]
  },
  packages: {},
})

export const getters = {
  getProducts: (state) => state.asyncData.data || [],
  getProductDetails: (state) => state.productDetails.data || {},
  getVipPackages: (state) => state.packages.data || [],
  getTransactions: (state) => state.transactions.data || [],
}

export const mutations = {
  SET_PRODUCT_DETAILS(state, data) {
    state.productDetails = data;
  },
  SET_TRANSACTIONS(state, data) {
    state.transactions = data;
  },
  SET_PACKAGES(state, data) {
    state.packages = data;
  }
}

export const actions = {
  async fetchProducts({ commit }, params) {
    commit('SET_LOADING', { module: 'profile', loading: true }, { root: true })

    try {
      const res = await this.$axios.get('/products/my', { params })
      commit('SET_DATA', { module: 'profile', data: res.data }, { root: true })
    } catch (error) {
      commit('SET_LOADING', { module: 'profile', loading: false }, { root: true })
    } finally {
      commit('SET_LOADING', { module: 'profile', loading: false }, { root: true })
    }
  },

  async fetchProductDetails({ commit }, productId) {
    try {
      const res = await this.$axios.get(`/products/my/${productId}`)
      commit('SET_PRODUCT_DETAILS', res.data)
    } catch (error) {
      console.log(error)
    }
  },

  async createProduct({ commit }, formData) {
    commit('SET_LOADING', { module: 'profile', loading: true }, { root: true })

    try {
      await this.$axios.post('/products', formData)
    } catch (error) {
      commit('SET_LOADING', { module: 'profile', loading: false }, { root: true })
      return Promise.reject(error)
    }
  },

  async updateProduct({ commit }, { productId, formData }) {
    commit('SET_LOADING', { module: 'profile', loading: true }, { root: true })

    try {
      await this.$axios.patch(`/products/${productId}`, formData)
    } catch (error) {
      commit('SET_LOADING', { module: 'profile', loading: false }, { root: true })
      return Promise.reject(error)
    }
  },

  async deleteProduct({ dispatch }, id) {
    try {
      await this.$axios.delete(`/products/my/${id}`)
      dispatch('fetchProducts')
    } catch (error) {
      return Promise.reject(error)
    }
  },
  
  async fetchVipPackages({ commit }) {
    try {
      const res = await this.$axios.get('/vip-packages')
      commit('SET_PACKAGES', res.data)
    } catch (error) {
      console.log(error)
    }
  },

  async makeProductVip(_, { productId, packageId }) {
    try {
      const res = await this.$axios.post(`/payment/checkout?product_id=${productId}&vip_package_id=${packageId}`)
      return res.data
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async fetchTransactions({ commit }, params) {
    commit('SET_LOADING', { module: 'profile', loading: true }, { root: true })

    try {
      const res = await this.$axios.get('/my/payment-transactions', { params })
      commit('SET_TRANSACTIONS', res.data)
    } catch (error) {
      console.log(error);
    } finally {
      commit('SET_LOADING', { module: 'profile', loading: false }, { root: true })
    }
  },
}
