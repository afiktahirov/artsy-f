<template>
  <section class="page reviews-page" v-loading.fullscreen="loading">
    <page-header :title="productDetailsCategory.title || ''">
      <breadcrumbs :items="productDetailsCategory" />
    </page-header>

    <div class="page-body">
      <div class="container">
        <reviews-header title="Мужская куртка Timberland" :rating="4.1">
          <el-button type="info" size="medium" @click="showModal">
            <message-icon />
            {{ $t("reviews_slider.add_review") }}
          </el-button>
        </reviews-header>

        <template v-if="!reviews.length">
          <el-empty :description="$t('placeholder.no_data_to_show')" />
        </template>
        <template v-else>
          <div class="reviews-list">
            <review-block />
            <review-block />
            <review-block />
            <review-block />
          </div>
        </template>

        <el-button class="w-100" @click="triggerLoadMore" v-if="pagination.total >= perPage">
          {{ $t("placeholder.load_more") }}
        </el-button>
      </div>
    </div>
    <!-- page body -->

    <el-dialog :title="$t('reviews_slider.add_review')" :visible.sync="modalVisible">
      <add-review-form />
    </el-dialog>
    <!-- add review -->
  </section>
</template>

<script>
import { mapState } from "vuex";
import PageHeader from "@/components/PageHeader";
import Breadcrumbs from "@/components/Breadcrumbs";
import AddReviewForm from "@/components/AddReviewForm";
import ReviewsHeader from "@/components/Pages/Reviews/ReviewsHeader";
import ReviewBlock from "@/components/Pages/Reviews/ReviewBlock";
import Pagination from "@/components/Pagination";
import MessageIcon from "@/components/Icons/message";

export default {
  name: "ProductReviews",
  components: { PageHeader, Breadcrumbs, AddReviewForm, ReviewsHeader, ReviewBlock, Pagination, MessageIcon },
  data() {
    return {
      modalVisible: false,
      perPage: 8
    }
  },
  computed: {
    ...mapState({
      loading: ({ products }) => products.loading,
      reviews: ({ products }) => products.productReviews.data,
      pagination: ({ products }) => products.productReviews.meta,
      productDetails: ({ products }) => products.productDetails.data || {},
    }),
    productDetailsCategory() {
      return this.productDetails.category || {}
    }
  },
  watch: {
    perPage(newValue) {
      this.$store.dispatch("products/fetchProductReviews", {
        id: this.$route.params.id, perPage: newValue
      })
    }
  },
  methods: {
    showModal() {
      if (!this.$auth.loggedIn) {
        this.$notify({
          customClass: "error",
          title: this.$t("errors.error").toString(),
          message: this.$t("messages.only_for_auth_users").toString(),
        })
      } else {
        this.modalVisible = true
      }
    },

    triggerLoadMore() {
      this.perPage += 8
    }
  },
  async asyncData({ store, params }) {
    await Promise.all([
      store.dispatch("products/fetchProductDetails", params.id),
      store.dispatch("products/fetchProductReviews", { id: params.id })
    ])
  }
}
</script>
