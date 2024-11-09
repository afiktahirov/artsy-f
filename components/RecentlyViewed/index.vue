<template>
  <div class="recently-viewed slider-container" v-if="products.length">
    <section-header :title="$t('recently_viewed.title')" />

    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide no-swipe" v-for="product in products" :key="product.id">
          <product-card :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper } from "swiper";
import { mapGetters } from "vuex";
import SectionHeader from "@/components/SectionHeader";
import ProductCard from "@/components/ProductCard";

export default {
  name: "RecentlyViewed",
  components: { SectionHeader, ProductCard },
  computed: {
    ...mapGetters({
      products: "products/getRecentlyViewed"
    })
  },
  mounted() {
    new Swiper(".recently-viewed .swiper", {
      breakpoints: {
        992: {
          slidesPerView: 4,
          spaceBetween: 20,
          allowTouchMove: false
        },
        767: {
          slidesPerView: 3.4,
          spaceBetween: 20,
          allowTouchMove: true
        },
        575: {
          slidesPerView: 2.8,
          spaceBetween: 12,
          allowTouchMove: true
        },
        440: {
          slidesPerView: 2.2,
          spaceBetween: 12,
          allowTouchMove: true
        },
        300: {
          slidesPerView: 1.4,
          spaceBetween: 12,
          allowTouchMove: true
        }
      }
    })
  }
}
</script>

<style lang="scss">
@import "recently-viewed";
</style>
