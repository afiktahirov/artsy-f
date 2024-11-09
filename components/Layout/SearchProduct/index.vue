<template>
  <nuxt-link
    class="search-product d-flex align-center"
    :to="$localePath('products-id', { id: product.id })"
  >
    <span class="search-product__name">{{ product.title }}</span>
    <span class="search-product__category d-none d-md-block">{{ product.price }} ₼</span>
  </nuxt-link>
</template>

<script>
export default {
  name: "SearchProduct",
  props: {
    product: {
      type: Object,
      default: () => ({
        id: null,
        name: "",
        category: "",
        slug: "",
      })
    }
  },
}
</script>

<style lang="scss">
@import "search-product";
</style>
