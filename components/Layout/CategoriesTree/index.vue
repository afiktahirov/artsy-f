<template>
  <div class="categories-tree d-flex">
    <div
      :key="category.id"
      class="categories-tree__item"
      v-for="category in categories"
      @mouseleave="clearCategoryId"
      @mouseenter="setCategoryId(category.id)"
    >
      <nuxt-link
        class="categories-tree__link"
        :to="$localePath('category-id-products', { id: category.id })"
      >
        {{ category.title }}
      </nuxt-link>

      <template v-if="category.children.length">
        <div class="categories-tree__body" v-if="currentId === category.id">
          <div class="container">
            <el-row type="flex" :gutter="20" class="flex-wrap">
              <el-col :span="8" v-for="subcategory in category.children" :key="subcategory.id">
                <div class="category-submenu">
                  <nuxt-link
                    class="category-submenu__label"
                    :to="$localePath('category-id-products', { id: subcategory.id })"
                  >
                    {{ subcategory.title }}
                  </nuxt-link>

                  <ul class="category-submenu__list" v-if="subcategory.children.length">
                    <li
                      :key="subchild.id"
                      class="category-submenu__list-item"
                      v-for="subchild in subcategory.children"
                    >
                      <nuxt-link :to="$localePath('category-id-products', { id: subchild.id })">
                        {{ subchild.title }}
                        <el-tag
                          type="danger"
                          effect="dark"
                          v-if="subchild.is_new"
                        >
                          {{ $t("placeholder.new") }}
                        </el-tag>
                      </nuxt-link>
                    </li>
                  </ul>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </template>
    </div>
    <!-- categories tree item -->
  </div>
  <!-- categories tree -->
</template>

<script>
export default {
  name: "CategoriesTree",
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentId: null,
      timer: null,
    }
  },
  watch: {
    $route() {
      this.setCategoryId(null);
    }
  },
  methods: {
    setCategoryId(id) {
      this.timer = setTimeout(() => {
        this.currentId = id;
      }, 250);
    },

    clearCategoryId() {
      this.currentId = null;
      clearTimeout(this.timer);
    }
  }
}
</script>

<style lang="scss">
@import "categories-tree";
</style>
