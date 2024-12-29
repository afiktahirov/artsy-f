<template>
  <section class="page product-inner-page">
    <page-header :title="detailsCategory.title || ''">
      <breadcrumbs :items="detailsCategory" />
    </page-header>

    <div class="page-body">
      <div class="container">
        <template v-if="details.status === 'disabled'">
          <el-alert type="error" class="mb-6" :closable="false" :title="$t('messages.inactive_publication')" />
        </template>
        <template v-else-if="details.status === 'moderation'">
          <el-alert type="info" class="mb-6" :closable="false" :title="$t('messages.moderated_publication')" />
        </template>

        <div class="product-details-container">
          <el-row :gutter="20" type="flex" class="flex-wrap">
            <el-col :lg="10">
              <product-gallery :images="details.images || []" />
            </el-col>
            <el-col :lg="14">
              <product-details :details="details" profile-view @on-upgrade-plan="handleUpgradePlan" />
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

        <recently-viewed />
      </div>
    </div>
    <!-- page body -->

    <el-dialog :visible.sync="isUpgratePlanModalVisible" :title="$t('action.make_vip').toString()">
      <upgrade-plan-form :packages="packages" @onPlanUpgraded="handlePlanUpgraded" />
    </el-dialog>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import PageHeader from "@/components/PageHeader";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductGallery from "@/components/Pages/Products/Gallery";
import ProductDetails from "@/components/Pages/Products/Details";
import RecentlyViewed from "@/components/RecentlyViewed";
import UpgradePlanForm from "@/components/UpgradePlanForm";

export default {
  name: "ProfileProductPage",
  components: { PageHeader, Breadcrumbs, ProductGallery, ProductDetails, RecentlyViewed, UpgradePlanForm },
  data() {
    return {
      isUpgratePlanModalVisible: false
    }
  },
  computed: {
    ...mapGetters({
      details: "profile/getProductDetails",
      packages: "profile/getVipPackages"
    }),
    detailsCategory() {
      return this.details.category || {}
    }
  },
  mounted() {
    console.log(this.details)
  },
  methods: {
    handleUpgradePlan() {
      console.log("first")
      this.isUpgratePlanModalVisible = true
    },

    handlePlanUpgraded() {
      this.isUpgratePlanModalVisible = false
    }
  },
  async asyncData({ store, params }) {
    await Promise.all([
      store.dispatch("profile/fetchProductDetails", params.id),
      store.dispatch("products/fetchRecentlyViewed"),
      store.dispatch("profile/fetchVipPackages"),
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
