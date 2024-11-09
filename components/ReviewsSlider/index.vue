<template>
  <div class="reviews-slider slider-container">
    <el-dialog :title="$t('reviews_slider.add_review')" :visible.sync="modalVisible">
      <add-review-form />
    </el-dialog>

    <section-header :title="$t('reviews_slider.title')">
      <template #controls v-if="reviews.length > 4">
        <button class="prev-slide">
          <arrow-left-icon />
        </button>
        <button class="next-slide">
          <arrow-right-icon />
        </button>
      </template>

      <template #link>
        <el-button type="info" size="medium" v-if="!readOnly" @click="showModal">
          <message-icon />
          {{ $t("reviews_slider.add_review") }}
        </el-button>
      </template>
    </section-header>

    <template v-if="!reviews.length">
      <el-empty :image-size="120" :description="$t('placeholder.no_data_to_show')" />
    </template>

    <template v-else>
      <div class="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(review, index) in reviews" :key="review.id">
            <review-card :review="review" :index="index" />
          </div>
        </div>
      </div>

      <template v-if="reviewsMeta.total > 8 && !hideAllLink">
        <nuxt-link :to="$localePath('products-id-reviews', { id: productDetails.id })">
          <el-button class="w-100 mt-6">
            {{ $t("reviews_slider.read_all_reviews", { count: reviewsMeta.total }) }}
          </el-button>
        </nuxt-link>
      </template>
    </template>
  </div>
</template>

<script>
import { Swiper, Navigation } from "swiper";
import { mapGetters } from "vuex";

import SectionHeader from "@/components/SectionHeader";
import ReviewCard from "@/components/ReviewCard";
import AddReviewForm from "@/components/AddReviewForm";
import ArrowLeftIcon from "@/components/Icons/arrow-left-circle";
import ArrowRightIcon from "@/components/Icons/arrow-right-circle";
import MessageIcon from "@/components/Icons/message";

export default {
  name: "ReviewsSlider",
  components: { SectionHeader, ReviewCard, AddReviewForm, ArrowLeftIcon, ArrowRightIcon, MessageIcon },
  props: {
    reviews: {
      type: Array,
      required: true
    },
    reviewsMeta: {
      type: Object,
      default: () => ({
        current_page: 1,
        per_page: 8,
        total: 0,
      })
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    hideAllLink: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      modalVisible: false,
    }
  },
  computed: {
    ...mapGetters({
      productDetails: "products/getProductDetails"
    })
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
    }
  },
  mounted() {
    Swiper.use([Navigation])

    new Swiper(".reviews-slider .swiper", {
      navigation: {
        prevEl: ".reviews-slider .prev-slide",
        nextEl: ".reviews-slider .next-slide"
      },
      breakpoints: {
        1200: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        991: {
          slidesPerView: 3.2,
          spaceBetween: 20,
        },
        767: {
          slidesPerView: 2.4,
          spaceBetween: 12,
        },
        575: {
          slidesPerView: 1.8,
          spaceBetween: 12,
        },
        300: {
          slidesPerView: 1.15,
          spaceBetween: 12
        }
      }
    })
  }
}
</script>

<style lang="scss">
@import "reviews-slider";
</style>
