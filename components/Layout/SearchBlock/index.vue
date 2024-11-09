<template>
  <div class="search-block d-flex direction-column justify-center">
    <form class="search-block__form" @submit.prevent="handleSubmit" @input="handleSearch">
      <el-input :placeholder="$t('search_block.placeholder')" v-model="searchQuery" />
      <template v-if="searchResultsVisible">
        <button class="search-block__btn" type="button" @click="resetSearch">
          <close-icon />
        </button>
      </template>
      <template v-else>
        <button class="search-block__btn" type="button" @click="showSearchResults">
          <search-icon />
        </button>
      </template>
    </form>
    <!-- search block form -->

    <transition name="el-fade-in">
      <div class="search-block__results-container" v-if="searchResultsVisible">
        <div class="search-block__results">
          <template v-if="!products.length">
            <el-empty
              :image-size="120"
              :description="pending ? $t('placeholder.loading').toString() : $t('search_block.no_search_results', {
                query: searchQuery
              })"
            />
          </template>

          <template v-else>
            <ul class="search-results direction-column">
              <li class="search-results__item" v-for="product in products" :key="product.id">
                <search-product :product="product" />
              </li>
            </ul>
            <template v-if="products.length === 9">
              <nuxt-link class="search-block__show-all" :to="$localePath('search', {}, { q: searchQuery })">
                {{ $t("search_block.show_all", { query: searchQuery }) }}
              </nuxt-link>
            </template>
          </template>
        </div>
      </div>
      <!-- search block results container -->
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { debounce } from "debounce";
import SearchProduct from "../SearchProduct";
import CloseIcon from "@/components/Icons/close";
import SearchIcon from "@/components/Icons/search";

export default {
  name: "SearchBlock",
  components: { SearchProduct, CloseIcon, SearchIcon },
  data() {
    return {
      searchResultsVisible: false,
      searchQuery: "",
      pending: false,
    }
  },
  computed: {
    ...mapGetters({
      products: "search/getProducts"
    })
  },
  watch: {
    $route() {
      this.resetSearch();
    },

    searchQuery(value) {
      if (!this.pending && !value.trim()) {
        this.resetSearch()
      }
    }
  },
  methods: {
    showSearchResults() {
      if (this.searchQuery.trim()) {
        this.searchResultsVisible = true
      }
    },

    resetSearch() {
      this.searchQuery = ""
      this.searchResultsVisible = false
    },

    handleSubmit() {
      this.$router.push(this.localeLocation({
        name: "search",
        query: { q: this.searchQuery }
      }))
    },

    handleSearch: debounce(function () {
      if (!this.searchQuery.trim()) return

      if (!this.pending) {
        this.pending = true
        this.$nuxt.$loading.start()

        this.$store
          .dispatch("search/searchProducts", { q: this.searchQuery, perPage: 9 })
          .then(() => {
            this.pending = false
            this.searchResultsVisible = true
          });
      }
    }, 300),
  }
}
</script>

<style lang="scss">
@import "search-block.scss";
</style>
