<template>
    <div class="SecondBanners">
      <div class="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide banner-slide" v-for="banner in banners" :key="banner.id">
            <div class="swiper-lazy-preloader"></div>
            <img class="swiper-lazy" :data-src="banner.cover" alt="Intro slider background" />
            <div class="container intro-slide__body">
              <h1 class="intro-slide__title">{{ banner.title }}</h1>
              <h3 class="intro-slide__subtitle">{{ banner.subtitle }}</h3>
              <div class="intro-slide__link d-inline-flex align-center">
                <layers-icon />
                <div v-html="banner.link" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from "vuex";
  import { Swiper, Autoplay, Lazy } from "swiper";
  import LayersIcon from "@/components/Icons/layers.vue";
  
  export default {
    name: "SecondBanners",
    components: { LayersIcon },
    computed: {
      ...mapGetters({
        banners: "home/getSecondBanners"
      })
    },
    mounted() {
      Swiper.use([Autoplay, Lazy])
      new Swiper(".SecondBanners .swiper", {
        autoplay: {
          delay: 7000,
        },
        preloadImages: false,
        lazy: {
          loadPrevNext: true,
          loadPrevNextAmount: 2,
        },
      })
    }
  }
  </script>
  
  <style lang="scss">
  @import "second-banners";
  </style>
  