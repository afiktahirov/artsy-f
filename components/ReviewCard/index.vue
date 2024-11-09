<template>
  <div class="review-card">
    <div class="d-flex justify-space-between">
      <p class="review-card__author">{{ review.customer.name }}</p>
      <span class="review-card__date">{{ formattedDate }}</span>
    </div>
    <div class="review-card__rating d-flex align-items">
      <client-only>
        <star-rating
          :rating="review.rating"
          :star-size="14"
          :increment="0.3"
          :read-only="true"
          :show-rating="false"
          active-color="#000000"
        />
        <span class="review-card__rating-count">({{ review.rating }})</span>
      </client-only>
      <!-- TODO: image -->
    </div>
    <div class="review-card__text" v-html="review.body" />
    <nuxt-link
      class="review-card__link"
      :to="`${$localePath('products-id-reviews', { id: review.product_id })}#${index}`"
    >
      {{ $t("action.show_more") }}
    </nuxt-link>
  </div>
</template>

<script>
import format from "date-fns/format";

export default {
  name: "ReviewCard",
  props: {
    index: {
      type: Number,
      required: true
    },
    review: {
      type: Object,
      default: () => ({
        id: null,
        body: "",
        rating: 0,
        images: [],
        created_at: null,
        product_id: null,
        customer: {
          id: null,
          name: ""
        }
      })
    }
  },
  computed: {
    formattedDate() {
      return format(new Date(this.review.created_at), "dd.mm.yy")
    }
  }
}
</script>

<style lang="scss">
@import "review-card";
</style>
