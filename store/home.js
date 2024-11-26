export const state = () => ({
  loading: false,
  banners: {},
  vipProducts: {},
  latestProducts: {},
  popularCustomers: {},
  secondBanners : {}
})

export const getters = {
  getBanners(state) {
    return state.banners.data || []
  },

  getVipProducts: (state) => {
    return state.vipProducts.data || []
  },

  getLatestProducts: (state) => {
    return state.latestProducts.data || []
  },

  getPopularCustomers: (state) => {
    return state.popularCustomers.data || []
  },

  getSecondBanners : (state) => {
    return state.secondBanners.data || []
  }
}

export const mutations = {
  SET_BANNERS(state, data) {
    state.banners = data;
  },

  SET_PRODUCTS(state, { type, products }) {
    state[`${type}Products`] = products;
  },

  SET_POPULAR_CUSTOMERS(state, data) {
    state.popularCustomers = data;
  },
  
  SET_SECOND_BANNERS(state, data){
    state.secondBanners = data
  }
}

export const actions = {
  async fetchBanners({ commit }) {
    try {
      const res = await this.$axios.get("/banners")
      commit('SET_BANNERS', res.data)
    } catch (error) {
      console.log(error)
    }
  },

  async fetchVipProducts({ commit }, params) {
    commit('SET_LOADING', { module: 'home', loading: true }, { root: true })

    try {
      const res = await this.$axios.get("/products/vip", { params})
      commit('SET_PRODUCTS', { type: 'vip', products: res.data })
      commit('SET_LOADING', { module: 'home', loading: false }, { root: true })
    } catch (error) {
      commit('SET_LOADING', { module: 'products', loading: false }, { root: true })
    }
  },

  async fetchLatestProducts({ commit }, params) {
    commit('SET_LOADING', { module: 'home', loading: true }, { root: true })

    try {
      const res = await this.$axios.get("/products", { params })
      commit('SET_PRODUCTS', { type: 'latest', products: res.data })
      commit('SET_LOADING', { module: 'home', loading: false }, { root: true })
    } catch (error) {
      commit('SET_LOADING', { module: 'home', loading: false }, { root: true })
    }
  },

  async fetchPopularCustomers({ commit }) {
    try {
      const res = await this.$axios.get("/customers/popular")
      commit('SET_POPULAR_CUSTOMERS', res.data)
    } catch (error) {
      console.log(error)
    }
  },

  async fetchSecondBanners({ commit }) {
    try {
      const res = await this.$axios.get("/staticBanners")
      commit('SET_SECOND_BANNERS', res.data)
    } catch (error) {
      console.log(error)
    }
  },
}
