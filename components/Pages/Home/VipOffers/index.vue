<template>
  <div class="vip-offers pt-18 pb-10">
    <div class="container">
      <section-header :title="$t('vip_offers.title')">
        <template #link>
          <nuxt-link :to="$localePath('products-vip')" class="d-none d-md-inline">
            {{ $t('vip_offers.all') }}
          </nuxt-link>
        </template>
      </section-header>

      <enhanced-row type="flex" :gutter="20">
        <template v-for="product in products">
          <el-col :lg="6" :md="8" :span="12" :key="product.id">
            <product-card :product="product" />
          </el-col>
        </template>
        <el-col :span="24" class="d-md-none">
          <nuxt-link :to="$localePath('products-vip')">
            <el-button class="w-100 mb-8" type="info">
              {{ $t('vip_offers.all') }}
            </el-button>
          </nuxt-link>
        </el-col>
      </enhanced-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import EnhancedRow from "@/components/EnhancedRow";
import SectionHeader from "@/components/SectionHeader";
import ProductCard from "@/components/ProductCard";

export default {
  name: "VipOffers",
  components: { EnhancedRow, SectionHeader, ProductCard },
  computed: {
    ...mapGetters({
      products: "home/getVipProducts"
    })
  }
}
</script>
