<template>
  <div
    class="product-card"
    :class="{ 'product-card_favourite': isFavourite }"
  >
    <div class="product-card__tags">
      <el-tag effect="dark" :type="productStatus.view">{{productStatus.title}}</el-tag>
    </div>

    <div class="product-card__actions d-flex">
      <nuxt-link :to="$localePath('profile-products-id-edit', { id: product.id })">
        <edit-icon />
      </nuxt-link>
      <button @click="deleteProduct(product.id)">
        <trash-icon />
      </button>
    </div>

    <div class="product-card__image">
      <nuxt-link :to="$localePath('profile-products-id', { id: product.id })">
        <el-image :src="product.image" :alt="product.title" fit="cover" />
      </nuxt-link>
    </div>

    <div class="product-card__info">
      <nuxt-link class="product-card__title" :to="$localePath('profile-products-id', { id: product.id })">
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
import EditIcon from "@/components/Icons/edit";
import TrashIcon from "@/components/Icons/trash";

export default {
  name: "ProfileProductCard",
  mixins: [productMixin],
  components: { EditIcon, TrashIcon },
  methods: {
    deleteProduct(id) {
      this.$nuxt.$loading.start()
      this.$store.dispatch("profile/deleteProduct", id)
        .then(() => {
          this.$notify({
            customClass: "success",
            title: this.$t("messages.successfull_operation").toString(),
            message: this.$t("messages.product_deleted").toString(),
          })
        })
    }
  }
}
</script>
