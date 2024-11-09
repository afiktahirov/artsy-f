<template>
  <div class="how-it-works slider-container ptb-20">
    <div class="container">
      <div class="swiper">
        <div class="swiper-wrapper test">
          <div class="swiper-slide">
            <nuxt-link class="it-works" :to="$localePath('about')">
              <div class="it-works__image">
                <el-image src="images/how-it-works/0.png" alt="Image alt" />
              </div>
              <div class="it-works__info">
                <div class="it-works__icon d-inline-flex">
                  <layers-icon />
                </div>
                <div class="it-works__title">{{ $t("static_pages_nav.how_platform_works.label") }}</div>
                <div class="it-works__subtitle">{{ $t("static_pages_nav.how_platform_works.description") }}</div>
              </div>
            </nuxt-link>
          </div>
          <!-- swiper slide -->

          <div class="swiper-slide">
            <nuxt-link class="it-works" :to="$localePath('safe-shopping')">
              <div class="it-works__image">
                <el-image src="images/how-it-works/1.png" alt="Image alt" />
              </div>
              <div class="it-works__info">
                <div class="it-works__icon d-inline-flex">
                  <check-icon />
                </div>
                <div class="it-works__title">{{ $t("static_pages_nav.safe_shopping.label") }}</div>
                <div class="it-works__subtitle">{{ $t("static_pages_nav.safe_shopping.description") }}</div>
              </div>
            </nuxt-link>
          </div>
          <!-- swiper slide -->

          <div class="swiper-slide">
            <nuxt-link class="it-works" :to="$localePath('faq')">
              <div class="it-works__image">
                <el-image src="images/how-it-works/2.png" alt="Image alt" />
              </div>
              <div class="it-works__info">
                <div class="it-works__icon d-inline-flex">
                  <message-icon />
                </div>
                <div class="it-works__title">{{ $t("static_pages_nav.have_questions.label") }}</div>
                <div class="it-works__subtitle">{{ $t("static_pages_nav.have_questions.description") }}</div>
              </div>
            </nuxt-link>
          </div>
          <!-- swiper slide -->
        </div>
      </div>
      <!-- swiper container -->
    </div>
  </div>
</template>

<script>
import  { Swiper } from "swiper"
import LayersIcon from "@/components/Icons/layers.vue";
import CheckIcon from "@/components/Icons/check-shield.vue";
import MessageIcon from "@/components/Icons/message.vue";

export default {
  name: "HowItWorks",
  components: { LayersIcon, CheckIcon, MessageIcon },
  mounted() {
    new Swiper(".how-it-works .swiper", {
      breakpoints: {
        992: {
          spaceBetween: 20,
          slidesPerView: 3,
          allowTouchMove: false
        },
        767: {
          spaceBetween: 20,
          slidesPerView: 2.2,
          allowTouchMove: true
        },
        575: {
          spaceBetween: 12,
          slidesPerView: 1.8,
          allowTouchMove: true
        },
        300: {
          spaceBetween: 12,
          slidesPerView: 1.2,
          allowTouchMove: true
        }
      }
    });
  }
}
</script>

<style lang="scss">
@import "how-it-works";
</style>
