<template>
  <section class="page" v-loading.fullscreen="loading">
    <page-header :title="$t('placeholder.search_results')">
      <el-breadcrumb class="scrollable-x" separator="/">
        <el-breadcrumb-item :to="$localePath('index')">{{ $t("pages.main") }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('pages.search') }}</el-breadcrumb-item>
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

          <template v-if="!products.length">
            <el-empty :description="$t('placeholder.no_data_to_show')" />
          </template>
          <template v-else>
            <enhanced-row type="flex" :gutter="20">
              <template v-for="product in products">
                <el-col :lg="6" :md="8" :span="12" :key="product.id">
                  <product-card :product="product" />
                </el-col>
              </template>
            </enhanced-row>
          </template>

          <pagination
            :total="pagination.total"
            v-if="pagination.total > 15"
            @page-change="handlePageChange"
            @size-change="handleSizeChange"
            :current-page="pagination.current_page"
          />
        </template>
      </div>
    </div>
    <!-- page body -->
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import EnhancedRow from "@/components/EnhancedRow";
import PageHeader from "@/components/PageHeader";
import PageInfo from "@/components/PageInfo";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";

export default {
  name: "SearchPage",
  components: { EnhancedRow, PageHeader, PageInfo, ProductCard, Pagination },
  data() {
    return {
      filters: {
        q: "",
        page: 1,
        perPage: null
      }
    }
  },
  computed: {
    ...mapState({
      loading: ({ search }) => search.loading,
      pagination: ({ search }) => search.asyncData.meta || {}
    }),
    ...mapGetters({
      products: "search/getProducts"
    })
  },
  watch: {
    "$route.query"(query) {
      this.$store.dispatch("search/searchProducts", query)
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
  mounted() {
    this.filters = { ...this.filters, ...this.$route.query }
  },
  async asyncData({ store, query }) {
    await store.dispatch("search/searchProducts", query)
  }
}
</script>
