<template>
  <div class="brands-slider slider-container">
    <div class="container">
      <div class="brands-slider__content ptb-18">
        <section-header :title="$t('brands_slider.title')">
          <template #controls v-if="brands.length > 6">
            <button class="prev-slide">
              <arrow-left />
            </button>
            <button class="next-slide">
              <arrow-right />
            </button>
          </template>

          <template v-if="brands.length > 6" #link>
            <nuxt-link :to="$localePath('index')" class="d-none d-md-inline">
              {{ $t('brands_slider.all') }}
            </nuxt-link>
          </template>
        </section-header>

        <div class="swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="brand in brands" :key="brand.id">
              <nuxt-link class="brand-logo" :to="$localePath('merchant-id-products', { id: brand.id })">
                <img :src="brand.avatar" :alt="brand.name">
              </nuxt-link>
            </div>
          </div>
        </div>
        <!-- swiper container -->
      </div>
      <!-- brands slider content -->
    </div>
  </div>
</template>

<script>
import { Swiper } from "swiper";
import { mapGetters} from "vuex";
import SectionHeader from "@/components/SectionHeader";
import ArrowLeft from "@/components/Icons/arrow-left-circle"
import ArrowRight from "@/components/Icons/arrow-right-circle"

export default {
  name: "BrandsSlider",
  components: { SectionHeader, ArrowLeft, ArrowRight },
  computed: {
    ...mapGetters({
      brands: "home/getPopularCustomers"
    })
  },
  mounted() {
    new Swiper(".brands-slider .swiper", {
      autoplay: {
        delay: 7000,
      },
      lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 2,
        preloadImages: false,
      },
      navigation: {
        prevEl: ".brands-slider .prev-slide",
        nextEl: ".brands-slider .next-slide"
      },
      breakpoints: {
        1200: {
          slidesPerView: 6,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4.4,
          spaceBetween: 12,
        },
        576: {
          slidesPerView: 3.4,
          spaceBetween: 12,
        },
        300: {
          slidesPerView: 2.8,
          spaceBetween: 12,
        }
      }
    })
  }
}
</script>

<style lang="scss">
@import "brands-slider";
</style>
