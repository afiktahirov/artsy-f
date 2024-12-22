<template>
  <section class="page product-inner-page">
    <page-header :title="detailsCategory.title || ''">
      <breadcrumbs :items="detailsCategory" />
    </page-header>

    <div class="page-body">
      <div class="container">
        <div class="product-details-container">
          <el-row :gutter="20" type="flex" class="flex-wrap">
            <el-col :lg="10">

              <product-gallery :images="details.images || []" />
            </el-col>
            <el-col :lg="14">
              <product-details :details="details" />
            </el-col>
            <el-col v-if="details.tags && details.tags.length > 0" :lg="24">
              <div id="product_tags_row">
                <div v-for="tag in details.tags">
                  <nuxt-link :to="$localePath('tag-id-products', { id: tag.id })">{{ '# ' + tag.title }}</nuxt-link>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>

        <reviews-slider :reviews="reviews" :reviews-meta="reviewsMeta" />
        <recently-viewed />
      </div>
    </div>
    <!-- page body -->

  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import PageHeader from "@/components/PageHeader";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductGallery from "@/components/Pages/Products/Gallery";
import ProductDetails from "@/components/Pages/Products/Details";
import ReviewsSlider from "@/components/ReviewsSlider";
import RecentlyViewed from "@/components/RecentlyViewed";

export default {
  name: "ProductDetailsPage",
  components: { PageHeader, Breadcrumbs, ProductGallery, ProductDetails, ReviewsSlider, RecentlyViewed },
  computed: {
    ...mapState({
      reviewsMeta: ({ products }) => products.productReviews.meta
    }),
    ...mapGetters({
      details: "products/getProductDetails",
      reviews: "products/getProductReviews"
    }),
    detailsCategory() {
      return this.details.category || {}
    }
  },
  mounted() {
    console.log(this.details)
  },

  async asyncData({ store, params }) {
    await Promise.all([
      store.dispatch("products/fetchProductDetails", params.id),
      store.dispatch("products/fetchProductReviews", { id: params.id }),
      store.dispatch("products/fetchRecentlyViewed")
    ])
  }
}
</script>

<style>
#product_tags_row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

#product_tags_row>div {
  border-radius: 50px;
  border: 1px solid #77BDCA;
  padding: 12px 21px;
  font-size: 14px;
  font-weight: 500;
}
</style>
