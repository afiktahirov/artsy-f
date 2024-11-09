export const state = () => ({
  loading: false,
  faq: {},
  howItWorks: {},
  safeShopping: {},
  termsOfUse: {},
  privacyPolicy: {},
})

export const mutations = {
  SET_FAQ(state, data) {
    state.faq = data
  },
  SET_HOW_IT_WORKS(state, data) {
    state.howItWorks = data
  },
  SET_SAFE_SHOPPING(state, data) {
    state.safeShopping = data
  },
  SET_TERMS_OF_USE(state, data) {
    state.termsOfUse = data
  },
  SET_PRIVACY_POLICY(state, data) {
    state.privacyPolicy = data
  },
}

export const actions = {
  async fetchFaq({ commit }) {
    try {
      const res = await this.$axios.get("about/faq?perPage=100")
      commit("SET_FAQ", res.data)
    } catch (error) {
      console.log(error)
    }
  },

  async fetchHowItWorks({ commit }) {
    try {
      const res = await this.$axios.get("about/how-works")
      commit("SET_HOW_IT_WORKS", res.data)
    } catch (error) {
      console.log(error)
    }
  },

  async fetchSafeShopping({ commit }) {
    try {
      const res = await this.$axios.get("about/safe-shopping")
      commit("SET_SAFE_SHOPPING", res.data)
    } catch (error) {
      console.log(error)
    }
  },

  async fetchTermsOfUse({ commit }) {
    try {
      const res = await this.$axios.get("about/terms-of-use")
      commit("SET_TERMS_OF_USE", res.data)
    } catch (error) {
      console.log(error)
    }
  },

  async fetchPrivacyPolicy({ commit }) {
    try {
      const res = await this.$axios.get("about/confidentiality")
      commit("SET_PRIVACY_POLICY", res.data)
    } catch (error) {
      console.log(error)
    }
  }
}
