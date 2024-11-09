<template>
  <section class="page merchant-products-page" v-loading.fullscreen="loading">
    <merchant-card :details="$auth.user" />

    <div class="page-body" id="scroll-target">
      <div class="container">
        <profile-nav />

        <page-info class="mb-8">
          <template #title>
            {{ $t("placeholder.products_catalog") }}
          </template>

          <template #actions>
            <el-dropdown @command="setStatusOption" trigger="click">
              <button class="dropdown-trigger">
                {{ $t("show_by.label") }}
                <span>{{ $t(selectedStatusOption) }}</span>
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

        <template v-if="!products.length">
          <el-empty :description="$t('placeholder.no_data_to_show')" />
        </template>
        <template v-else>
          <enhanced-row type="flex" class="flex-wrap" :gutter="20">
            <el-col :lg="6" :md="8" :span="12" v-for="product in products" :key="product.id">
              <profile-product-card :product="product" />
            </el-col>
          </enhanced-row>
        </template>

        <pagination
          :total="pagination.total"
          v-if="pagination.total > 15"
          @page-change="handlePageChange"
          @size-change="handleSizeChange"
          :current-page="pagination.current_page"
        />
      </div>
    </div>
    <!-- page body -->
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Pagination from "@/components/Pagination";
import MerchantCard from "@/components/MerchantCard";
import ProfileNav from "@/components/Pages/Profile/Nav";
import PageInfo from "@/components/PageInfo";
import EnhancedRow from "@/components/EnhancedRow";
import ProfileProductCard from "@/components/ProfileProductCard";
import ArrowsIcon from "@/components/Icons/arrows-vertical";

export default {
  name: "ProfileProductsPage",
  middleware: ["auth"],
  components: { Pagination, MerchantCard, ProfileNav, PageInfo, EnhancedRow, ProfileProductCard, ArrowsIcon },
  data() {
    return {
      sortingOptions: [
        { label: "show_by.all", value: "" },
        { label: "show_by.active", value: "active" },
        { label: "show_by.on_moderation", value: "moderation" },
        { label: "show_by.disabled", value: "disabled" },
      ],
      filters: {
        status: "",
        page: 1,
        perPage: null
      }
    }
  },
  computed: {
    ...mapState({
      loading: ({ profile }) => profile.loading,
      pagination: ({ profile }) => profile.asyncData.meta
    }),
    ...mapGetters({
      products: "profile/getProducts"
    }),
    selectedStatusOption() {
      return this.sortingOptions.find((option) => option.value === this.filters.status).label;
    }
  },
  watch: {
    "$route.query"(query) {
      this.$store.dispatch("profile/fetchProducts", {
        page: query.page,
        perPage: query.perPage,
        "filter[status]": query.status
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

    setStatusOption(option) {
      this.filters.status = option;
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
  async asyncData({ store, query }) {
    await store.dispatch("profile/fetchProducts", {
      page: query.page,
      perPage: query.perPage,
      "filter[status]": query.status
    })
  }
}
</script>
