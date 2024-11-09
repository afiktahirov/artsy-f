<template>
  <div class="product-gallery d-flex flex-wrap" v-if="images.length">
    <div class="product-gallery__main">
      <div class="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(image, index) in images" :key="index">
            <div class="product-gallery__image">
              <img class="swiper-lazy" :data-src="image" alt="Product image">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- main images -->

    <div class="product-gallery__thumbs">
      <div
        :key="index"
        class="product-gallery__thumb"
        @click="setActiveSlide(index)"
        v-for="(image, index) in images"
        :class="{ active: currentSlide === index }"
      >
        <el-image :src="image" alt="Product thumb" fit="cover" />
      </div>
    </div>
    <!-- thums -->
  </div>
</template>

<script>
import { Swiper, Autoplay, Lazy } from "swiper";

export default {
  name: "ProductGallery",
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentSlide: 0,
      galleryInstance: null
    }
  },
  methods: {
    setActiveSlide(index) {
      this.currentSlide = index;
      this.galleryInstance.slideTo(index);
    }
  },
  mounted() {
    Swiper.use([Autoplay, Lazy])

    this.galleryInstance = new Swiper(".product-gallery .swiper", {
      spaceBetween: 16,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      preloadImages: false,
      lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 2,
      },
      on: {
        slideChange: () => {
          this.setActiveSlide(this.galleryInstance.activeIndex);
        }
      }
    })
  }
}
</script>

<style lang="scss">
@import "product-gallery";
</style>
