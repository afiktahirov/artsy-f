<template>
  <div class="reviews-header d-flex flex-wrap">
    <div class="reviews-header__left">
      <h2 class="reviews-header__title">{{ title }}</h2>
      <div class="reviews-header__rating">
        <client-only>
          <star-rating
            :rating="rating"
            :star-size="22"
            :increment="0.1"
            :read-only="true"
            active-color="#000000"
            text-class="vue-star-rating-rating-text--big"
          />
        </client-only>
      </div>
    </div>

    <div class="reviews-header__right">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "ReviewsHeader",
  props: {
    title: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import "reviews-header.scss";
</style>
