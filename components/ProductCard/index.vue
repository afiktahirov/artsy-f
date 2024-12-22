<template>
  <div
    class="product-card"
    :class="{ 'product-card_favourite': isFavourite }"
  >
    <div class="product-card__tags">
      <template v-if="product.is_top_seller">
        <el-tag effect="dark">{{ $t("placeholder.top_seller") }}</el-tag>
      </template>
      <template v-if="product.discount">
        <el-tag effect="dark" type="warning">{{product.discount}}%</el-tag>
      </template>
    </div>

    <div class="product-card__actions d-flex">
      <template v-if="isFavourite">
        <button class="add-to-favourite" @click="removeFromFavourites(product.id)">
          <filled-heart-icon />
        </button>
      </template>
      <template v-else>
        <button class="add-to-favourite" @click="addToFavourites(product.id)">
          <heart-icon />
        </button>
      </template>
    </div>

    <div class="product-card__image">
      <nuxt-link :to="$localePath('products-id', { id: product.id })">

        <template v-if="product.images">
          <el-image :src="product.images[0]" alt="image" fit="cover" />
        </template>

        <template v-else>
          <el-image :src="product.image" :alt="product.title" fit="cover" />
        </template>
      </nuxt-link>
    </div>

    <div class="product-card__info">
      <nuxt-link class="product-card__title" :to="$localePath('products-id', { id: product.id })">
        {{ product.title }}
      </nuxt-link>

      <div class="product-card__rating d-flex align-center" v-if="product.rating">
        <client-only>
          <star-rating
            :rating="product.rating"
            :star-size="14"
            :increment="0.1"
            :read-only="true"
            :show-rating="false"
            active-color="#000000"
          />
          <span class="product-card__rating-count">({{ product.ratings_count }})</span>
        </client-only>
      </div>

      <div class="product-card__price d-flex align-center">
        <template v-if="product.price_with_discount">
          <span class="current">{{ product.price_with_discount }} ₼</span>
          <span class="old">{{ product.price }} ₼</span>
        </template>
        <template v-else>
          <span class="current">{{ product.price }} ₼</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import productMixin from "@/mixins/product";
import HeartIcon from "@/components/Icons/heart";
import FilledHeartIcon from "@/components/Icons/filled-heart";

export default {
  name: "ProductCard",
  mixins: [productMixin],
  components: { HeartIcon, FilledHeartIcon }
}
</script>

<style lang="scss">
@import "product-card";
</style>
