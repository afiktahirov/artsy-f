<template>
  <section class="page merchant-page" v-loading.fullscreen="loading">
    <merchant-card :details="merchantDetails" />

    <div class="page-body" id="scroll-target">
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

            <filters-group ref="filtersGroup" @change="handleFiltersChange">
              <template v-if="merchantDetails.phone">
                <seller-phone label="seller_phone.contact_owner" :phone="merchantDetails.phone" />
              </template>
              <template v-if="merchantDetails.address">
                <seller-address :address="merchantDetails.address" />
              </template>
            </filters-group>
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

        <reviews-slider :reviews="reviews" read-only hide-all-link />
      </div>
    </div>
    <!-- page body -->
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import EnhancedRow from "@/components/EnhancedRow";
import MerchantCard from "@/components/MerchantCard";
import PageInfo from "@/components/PageInfo";
import FiltersGroup from "@/components/Pages/Merchant/FiltersGroup";
import SellerPhone from "@/components/SellerPhone";
import SellerAddress from "@/components/SellerAddress";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import ReviewsSlider from "@/components/ReviewsSlider";
import ArrowsIcon from "@/components/Icons/arrows-vertical";
import FilterIcon from "@/components/Icons/filter";

export default {
  name: "MerchantProducts",
  components: {
    EnhancedRow,
    MerchantCard,
    PageInfo,
    FiltersGroup,
    SellerPhone,
    SellerAddress,
    ProductCard,
    Pagination,
    ReviewsSlider,
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
        sort: "price_asc",
        page: 1,
        perPage: null
      }
    }
  },
  computed: {
    ...mapState({
      loading: ({ merchant }) => merchant.loading,
      pagination: ({ merchant }) => merchant.asyncData.meta
    }),
    ...mapGetters({
      merchantDetails: "merchant/getDetails",
      products: "merchant/getProducts",
      reviews: "merchant/getMerchantReviews"
    }),
    selectedSortingOption() {
      return this.sortingOptions.find((option) => option.value === this.filters.sort).label;
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

      this.$store.dispatch("merchant/fetchProducts", {
        sort: query.sort,
        page: query.page,
        perPage: query.perPage,
        "filter[categoryIds]": categoryIds,
        "filter[ownerId]": this.$route.params.id
      })
        .then(() => {
          this.$scrollTo("#scroll-target", { offset: -100 });
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
      this.filters.sort = option;
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
  async asyncData({ store, params, query }) {
    await Promise.all([
      store.dispatch("merchant/fetchDetails", params.id),
      store.dispatch("merchant/fetchCategories", params.id),
      store.dispatch("merchant/fetchReviews", params.id),
      store.dispatch("merchant/fetchProducts", {
        sort: query.sort,
        page: query.page,
        perPage: query.perPage,
        "filter[ownerId]": params.id,
        "filter[categoryIds]": Array.isArray(query.categoryIds) ? query.categoryIds.join(",") : query.categoryIds
      })
    ])
  }
}
</script>
