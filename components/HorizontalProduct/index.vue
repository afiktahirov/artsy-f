<template>
  <div
    class="horizontal-product d-flex flex-wrap align-flex-start"
    :class="{ 'horizontal-product_favourite': isFavourite }"
  >
    <div class="horizontal-product__left">
      <div class="horizontal-product__tags">
        <template v-if="product.discount">
          <el-tag effect="dark" type="warning">{{product.discount}}%</el-tag>
        </template>
      </div>

      <div class="horizontal-product__actions">
        <button class="add-to-favourite" @click="removeFromFavourites(product.id)">
          <filled-heart-icon />
        </button>
      </div>

      <div class="horizontal-product__image">
        <nuxt-link :to="$localePath('products-id', { id: product.id })">
          <el-image :src="product.image" :alt="product.title" fit="cover" />
        </nuxt-link>
      </div>
    </div>
    <!-- left -->

    <div class="horizontal-product__right">
      <nuxt-link class="horizontal-product__title" :to="$localePath('products-id', { id: product.id })">
        {{ product.title }}
      </nuxt-link>

      <div class="horizontal-product__rating d-flex align-center">
        <client-only>
          <star-rating
            :rating="product.rating"
            :star-size="14"
            :increment="0.3"
            :read-only="true"
            :show-rating="false"
            active-color="#000000"
          />
          <span class="horizontal-product__rating-count">({{ product.ratings_count }})</span>
        </client-only>
      </div>

      <div class="horizontal-product__desc-price d-flex flex-wrap align-center">
        <div class="horizontal-product__description">
          {{ product.description }}
        </div>

        <div class="horizontal-product__price d-flex align-center">
          <template v-if="product.price_with_discount">
            <span class="old">{{ product.price }} ₼</span>
            <span class="current">{{ product.price_with_discount }} ₼</span>
          </template>
          <template v-else>
            <span class="current">{{ product.price }} ₼</span>
          </template>
        </div>
      </div>

      <div class="horizontal-product__seller d-flex flex-wrap">
        <seller-badge :name="product.owner.name" :image="product.owner.avatar" />
        <seller-phone :phone="product.owner.phone" />
      </div>
    </div>
    <!-- right -->
  </div>
</template>

<script>
import productMixin from "@/mixins/product";
import SellerBadge from "@/components/SellerBadge";
import SellerPhone from "@/components/SellerPhone";
import FilledHeartIcon from "@/components/Icons/filled-heart";

export default {
  name: "HorizontalProduct",
  mixins: [productMixin],
  components: { SellerBadge, SellerPhone, FilledHeartIcon }
}
</script>

<style lang="scss">
@import "horizontal-product";
</style>
