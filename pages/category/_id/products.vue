<template>
  <section class="page products-page" v-loading.fullscreen="loading">
    <page-header :title="categories.title">
      <breadcrumbs :items="categories" />
    </page-header>

    <div class="page-body">
      <div class="container">
        <page-info>
          <template #title>
            <div v-html="$t('placeholder.found_products', { count: pagination.total })" />
          </template>

          <template #actions>
            <el-dropdown @command="setSortingOption" trigger="click">
              <button class="dropdown-trigger">
                {{ $t("sort_by.label") }}
                <span>{{ $t(selectedSortingOption) }}</span>
                <arrows-icon />
              </button>

              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="option in sortingOptions"
                  :command="option.value"
                  :key="option.value"
                >
                  {{ $t(option.label) }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </page-info>

        <el-row :gutter="20">
          <el-col :span="24" :xl="6">
            <button class="show-filters d-inline-flex d-xl-none" @click="$refs.filtersGroup.show()">
              <filter-icon />
            </button>

            <filters-group ref="filtersGroup" @change="handleFiltersChange" />
          </el-col>
          <!-- col (filters) -->

          <el-col :span="24" :xl="18">
            <template v-if="!products.length">
              <el-empty :description="$t('placeholder.no_data_to_show')" />
            </template>
            <template v-else>
              <enhanced-row type="flex" :gutter="20">
                <template v-for="product in products">
                  <el-col :xl="8" :lg="6" :md="8" :span="12" :key="product.id">
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
          </el-col>
          <!-- col (products) -->
        </el-row>

        <recently-viewed />
      </div>
    </div>
    <!-- page body -->
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import EnhancedRow from "@/components/EnhancedRow";
import PageHeader from "@/components/PageHeader";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageInfo from "@/components/PageInfo";
import ProductCard from "@/components/ProductCard";
import FiltersGroup from "@/components/Pages/Category/FiltersGroup";
import RecentlyViewed from "@/components/RecentlyViewed";
import Pagination from "@/components/Pagination";
import ArrowsIcon from "@/components/Icons/arrows-vertical";
import FilterIcon from "@/components/Icons/filter";

export default {
  name: "CategoryProductsPage",
  components: {
    EnhancedRow,
    PageHeader,
    Breadcrumbs,
    PageInfo,
    ProductCard,
    FiltersGroup,
    RecentlyViewed,
    Pagination,
    ArrowsIcon,
    FilterIcon
  },
  data() {
    return {
      sortingOptions: [
        { label: "sort_by.price_asc", value: "price_asc" },
        { label: "sort_by.price_desc", value: "price_desc" },
      ],
      filters: {
        categoryIds: null,
        attributeValuesIds: null,
        priceMin: null,
        priceMax: null,
        hasDiscount: false,
        sort: "price_asc",
        page: 1,
        perPage: null
      }
    }
  },
  computed: {
    ...mapState({
      loading: ({ products }) => products.loading,
      pagination: ({ products }) => products.asyncData.meta
    }),
    ...mapGetters({
      categories: "products/getFilterCategories",
      products: "products/getProducts"
    }),
    selectedSortingOption() {
      return this.sortingOptions.find((option) => option.value === this.filters.sort).label
    }
  },
  watch: {
    "$route.query"(query) {
      let categoryIds = null;
      const paramsId = this.$route.params.id;

      if (Array.isArray(query.categoryIds)) {
        categoryIds = [paramsId, ...query.categoryIds].join(",")
      } else {
        categoryIds = [paramsId, query.categoryIds].join(",")
      }

      Promise.all([
        this.$store.dispatch("products/fetchAttributesByCategoryIds", { "filter[categoryIds]": categoryIds }),
        this.$store.dispatch("products/fetchProducts", {
          sort: query.sort,
          page: query.page,
          perPage: query.perPage,
          "filter[price_min]": query.priceMin,
          "filter[price_max]": query.priceMax,
          "filter[has_discount]": query.hasDiscount,
          "filter[categoryIds]": categoryIds,
          "filter[attributeValuesIds]": Array.isArray(query.attributeValuesIds)
            ? query.attributeValuesIds.join(",")
            : query.attributeValuesIds,
        })
      ]).then(() => {
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

    handleFiltersChange(values) {
      this.filters = { ...this.filters, ...values }
      this.handleChange()
    },

    setSortingOption(option) {
      this.filters.sort = option
      this.handleChange()
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
  async asyncData({ store, query, params }) {
    let categoryIds = null;
    const paramsId = params.id;

    if (Array.isArray(query.categoryIds)) {
      categoryIds = [paramsId, ...query.categoryIds].join(",")
    } else {
      categoryIds = [paramsId, query.categoryIds].join(",")
    }

    await Promise.all([
      store.dispatch("products/fetchRecentlyViewed"),
      store.dispatch("products/fetchCategoriesByCategoryId", params.id),
      store.dispatch("products/fetchAttributesByCategoryIds", { "filter[categoryIds]": categoryIds }),
      store.dispatch("products/fetchProducts", {
        sort: query.sort,
        page: query.page,
        perPage: query.perPage,
        "filter[price_min]": query.priceMin,
        "filter[price_max]": query.priceMax,
        "filter[has_discount]": query.hasDiscount,
        "filter[categoryIds]": categoryIds,
        "filter[attributeValuesIds]": Array.isArray(query.attributeValuesIds)
          ? query.attributeValuesIds.join(",")
          : query.attributeValuesIds,
      })
    ])
  }
}
</script>
