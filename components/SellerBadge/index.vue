<template>
  <div class="seller-badge d-flex align-center">
    <div class="seller-badge__logo d-flex align-center justify-center">
      <el-image :src="image">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
    </div>
    <div class="seller-badge__info">
      <p class="seller-badge__name">{{ name }}</p>
      <span class="seller-badge__placeholder">{{ $t("seller_badge.placeholder") }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SellerBadge",
  props: {
    image: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: "Seller name"
    }
  }
}
</script>

<style lang="scss">
@import "seller-badge";
</style>
