<template>
  <div class="bnrs-slider slider-container">
    <div class="container">
      <div class="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="bnr-container"></div>
          </div>
          <div class="swiper-slide">
            <div class="bnr-container"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper } from "swiper";

export default {
  name: "BannersSlider",
  mounted() {
    new Swiper(".bnrs-slider .swiper", {
      breakpoints: {
        992: {
          spaceBetween: 20,
          slidesPerView: 2,
          allowTouchMove: false
        },
        767: {
          spaceBetween: 20,
          slidesPerView: 1.5,
          allowTouchMove: true
        },
        480: {
          spaceBetween: 12,
          slidesPerView: 1.3,
          allowTouchMove: true
        },
        300: {
          spaceBetween: 12,
          slidesPerView: 1.08,
          allowTouchMove: true
        }
      }
    })
  }
}
</script>

<style lang="scss">
@import "banners-slider";
</style>
