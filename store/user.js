export const actions = {
  async login(_, formData) {
    await this.$auth.loginWith("local", { data: formData })
  },

  async register({ dispatch }, formData) {
    try {
      await this.$axios.post("/auth/register", formData)
      dispatch("login", {
        email: formData.email,
        password: formData.password
      })
    } catch (error) {
      console.log(error)
    }
  },

  async forgotPassword(_, formData) {
    try {
      await this.$axios.post("/auth/forgot-password", formData)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async resetPassword(_, formData) {
    try {
      await this.$axios.post("/auth/reset-password", formData)
    } catch (error) {
      return Promise.reject(error)
    }
  },

  async fetchDetails({ commit }) {
    try {
      const res = await this.$axios.get("/auth/me")
      commit('SET_DATA', { module: 'user', data: res.data }, { root: true })
    } catch (error) {
      console.log(error)
    }
  },

  async updateDetails({ state }, formData) {
    try {
      await this.$axios.$patch(`/customers/${formData.id}`, formData)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
