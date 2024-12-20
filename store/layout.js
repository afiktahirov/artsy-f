export const state = () => ({
  categoriesTree: {}
})

export const getters = {
  getCategories(state) {
    return state.categoriesTree.data || []
  },
  getChildCategories(state) {
    const result = []

    ;(function iterator(array) {
      array.map((item) => {
        if (!item.children.length) {
          result.push({ id: item.id, title: item.title })
        } else {
          iterator(item.children)
        }
      })
    })(state.categoriesTree.data)

    return result
  }
}

export const mutations = {
  SET_CATEGORIES_TREE(state, data) {
    state.categoriesTree = data
  }
}

export const actions = {
  async fetchCategoriesTree({ commit }) {
    try {
      console.log(this.$i18n.locale)
      const res = await this.$axios.get("/categories-tree", {
        headers: {
          'X-Content-Language': this.$i18n.locale || 'ru', 
        },
      });
      commit('SET_CATEGORIES_TREE', res.data)
    } catch (error) {
      console.log(error)
    }
  }
}
