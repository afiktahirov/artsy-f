<template>
  <transition name="el-fade-in">
    <div class="filters-group-wrapper" v-show="isVisible" @click.self="hide">
      <form class="filters-group" @change="handleFiltersChange">
        <div class="filters-group__item" v-if="categories.length">
          <div class="mb-4">
            <el-input
              size="medium"
              v-model="search"
              suffix-icon="el-icon-search"
              :placeholder="$t('placeholder.search')"
            />
          </div>

          <el-checkbox-group v-model="categoryIds">
            <el-checkbox v-for="category in filteredCategories" :key="category.id" :label="category.id">
              {{category.title}}
            </el-checkbox>
          </el-checkbox-group>
        </div>

        <div class="filters-group__addons">
          <slot />
        </div>
      </form>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FiltersGroup",
  data() {
    return {
      isVisible: false,
      search: "",
      categoryIds: [],
    }
  },
  computed: {
    ...mapGetters({
      categories: "merchant/getMerchantCategories"
    }),
    filteredCategories: {
      get() {
        if (this.search.trim() !== "") {
          return this.categories.filter((category) => {
            return category.title.toLowerCase().startsWith(this.search.toLowerCase())
          })
        } else {
          return this.categories
        }
      }
    }
  },
  methods: {
    handleFiltersChange() {
      this.$emit("change", {
        categoryIds: this.categoryIds,
      })
    },

    show() {
      this.isVisible = true;
      document.body.style.overflow = "hidden";
    },

    hide() {
      this.isVisible = false;
      document.body.style.overflow = "auto";
    },
  }
}
</script>
