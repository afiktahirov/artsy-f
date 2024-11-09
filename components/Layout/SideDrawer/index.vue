<template>
  <div class="side-drawer d-xl-none">
    <ul class="mobile-categories">
      <li
        :key="category.id"
        v-for="category in categories"
        class="mobile-categories__item"
      >
        <template v-if="!category.children.length">
          <nuxt-link
            class="mobile-categories__label d-flex"
            :to="$localePath('category-id-products', { id: category.id })"
          >
            {{ category.title }}
            <angle-right-icon />
          </nuxt-link>
        </template>

        <template v-else>
          <button
            @click="setCurrentId(category.id)"
            class="mobile-categories__label d-flex"
          >
            {{ category.title }}
            <angle-right-icon />
          </button>

          <div class="mobile-categories__children" v-show="currentId === category.id">
            <button
              @click="setCurrentId(null)"
              class="mobile-categories__back d-flex"
            >
              <angle-right-icon />
              {{ category.title }}
            </button>

            <el-row :gutter="20" type="flex" class="flex-wrap">
              <el-col :md="8" :sm="12" v-for="subcategory in category.children" :key="subcategory.id">
                <ul class="mobile-subcategories">
                  <li class="mobile-subcategories__label">
                    <nuxt-link
                      class="mobile-subcategories__link"
                      :to="$localePath('category-id-products', { id: subcategory.id })"
                    >
                      {{ subcategory.title }}
                    </nuxt-link>
                  </li>

                  <template v-if="subcategory.children.length">
                    <li
                      :key="subchild.id"
                      class="mobile-subcategories__item"
                      v-for="subchild in subcategory.children"
                    >
                      <nuxt-link
                        class="mobile-subcategories__link"
                        :to="$localePath('category-id-products', { id: subchild.id })"
                      >
                        {{ subchild.title }}
                      </nuxt-link>
                    </li>
                  </template>
                </ul>
              </el-col>
            </el-row>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import AngleRightIcon from "@/components/Icons/angle-right";

export default {
  name: "SideDrawer",
  components: { AngleRightIcon },
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentId: null
    }
  },
  watch: {
    $route() {
      this.setCurrentId(null);
    }
  },
  methods: {
    setCurrentId(id) {
      this.currentId = id;
    }
  }
}
</script>

<style lang="scss">
@import "side-drawer";
</style>
