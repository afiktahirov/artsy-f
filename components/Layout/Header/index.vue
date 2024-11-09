<template>
  <header class="header">
    <div class="header-top">
      <div class="container d-flex flex-wrap align-center justify-space-between">
        <nuxt-link class="header-logo d-flex" :to="$localePath('index')">
          <el-image src="/images/logo.svg" />
        </nuxt-link>

        <header-controls />

        <div class="header-top__search-container">
          <template v-if="drawerVisible">
            <button class="toggle-drawer d-xl-none" @click="hideDrawer">
              <close-icon />
            </button>
          </template>
          <template v-else>
            <button class="toggle-drawer d-xl-none" @click="showDrawer">
              <bars-icon />
            </button>
          </template>

          <search-block />
        </div>
      </div>
    </div>
    <!-- header top -->

    <div class="header-bottom d-none d-xl-block">
      <div class="container">
        <categories-tree :categories="categories" />
      </div>
    </div>
    <!-- header bottom -->

    <side-drawer v-show="drawerVisible" :categories="categories" />
  </header>
</template>

<script>
import { mapGetters } from "vuex";

import HeaderControls from './HeaderControls.vue';
import SearchBlock from "@/components/Layout/SearchBlock";
import CategoriesTree from "@/components/Layout/CategoriesTree";
import SideDrawer from "@/components/Layout/SideDrawer";
import BarsIcon from "@/components/Icons/bars";
import CloseIcon from "@/components/Icons/close";

export default {
  name: "AppHeader",
  components: { SearchBlock, CategoriesTree, HeaderControls, SideDrawer, BarsIcon, CloseIcon },
  data() {
    return {
      drawerVisible: false
    }
  },
  computed: {
    ...mapGetters({
      categories: "layout/getCategories"
    })
  },
  watch: {
    $route() {
      this.hideDrawer();
    },
  },
  methods: {
    showDrawer() {
      this.drawerVisible = true;
      document.body.style.overflow = "hidden";
    },

    hideDrawer() {
      this.drawerVisible = false;
      document.body.style.overflow = "visible";
    },
  },
}
</script>

<style lang="scss">
@import "header";
</style>
