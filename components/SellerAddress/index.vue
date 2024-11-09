<template>
  <div class="seller-address d-inline-flex align-center">
    <div class="seller-address__icon">
      <map-icon />
    </div>
    <div class="seller-address__text">{{ address }}</div>
  </div>
</template>

<script>
import MapIcon from "@/components/Icons/map";

export default {
  name: "SellerAddress",
  components: { MapIcon },
  props: {
    address:{
      type: String,
      default: "Some placeholder address"
    }
  }
}
</script>

<style lang="scss">
@import "seller-address";
</style>
