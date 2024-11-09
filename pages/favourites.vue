<template>
  <section class="page" v-loading.fullscreen="loading">
    <page-header :title="$t('pages.favourites')">
      <el-breadcrumb separator="/" class="scrollable-x">
        <el-breadcrumb-item :to="$localePath('index')">{{ $t("pages.main") }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t("pages.favourites") }}</el-breadcrumb-item>
      </el-breadcrumb>
    </page-header>

    <div class="page-body">
      <div class="container">
        <template v-if="!products.length">
          <el-empty class="pt-10" :description="$t('placeholder.no_data_to_show')" />
        </template>
        <template v-else>
          <page-info>
            <template #title>
              <div v-html="$t('placeholder.found_products', { count: pagination.total || 0 })" />
            </template>
          </page-info>

          <div class="favourite-products">
            <el-row type="flex" class="flex-wrap" :gutter="12">
              <el-col
                :sm="12"
                :md="24"
                :span="24"
                :key="product.id"
                v-for="product in products"
              >
                <horizontal-product :product="product" />
              </el-col>
            </el-row>

            <pagination
              :total="pagination.total"
              v-if="pagination.total > 15"
              @page-change="handlePageChange"
              @size-change="handleSizeChange"
              :current-page="pagination.current_page"
            />
          </div>
        </template>
      </div>
    </div>
    <!-- page body -->
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import PageHeader from "@/components/PageHeader";
import PageInfo from "@/components/PageInfo";
import HorizontalProduct from "@/components/HorizontalProduct";
import Pagination from "@/components/Pagination";

export default {
  name: "FavouritesPage",
  middleware: ["auth"],
  components: { PageHeader, PageInfo, HorizontalProduct, Pagination },
  data() {
    return {
      filters: {
        page: 1,
        perPage: null
      }
    }
  },
  computed: {
    ...mapState({
      loading: ({ favourites }) => favourites.loading,
      pagination: ({ favourites }) => favourites.asyncData.meta || {}
    }),
    ...mapGetters({
      products: "favourites/getFavourites"
    })
  },
  watch: {
    "$route.query"(query) {
      this.$store.dispatch("favourites/fetchProducts", query)
        .then(() => {
          this.$scrollTo("#root");
        })
    }
  },
  methods: {
    handleChange() {
      this.$router.push({
        query: {
          ...this.$mapObjectToQuery({
            ...this.$route.query,
            ...this.filters
          }),
        }
      })
    },

    handleSizeChange(size) {
      this.filters.perPage = size
      this.handleChange()
    },

    handlePageChange(page) {
      this.filters.page = page
      this.handleChange()
    },
  },
  async asyncData({ store, query }) {
    await store.dispatch("favourites/fetchProducts", query)
  }
}
</script>
