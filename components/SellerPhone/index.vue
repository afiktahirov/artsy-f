<template>
  <div
    @click="showNumber"
    class="seller-phone d-inline-flex align-center"
    :class="{ 'seller-phone_visible': isPhoneVisible }"
  >
    <div class="seller-phone__icon">
      <call-icon />
    </div>
    <div class="seller-phone__credentials">
      <template v-if="isPhoneVisible">
        <p class="seller-phone__number">{{ phone }}</p>
      </template>
      <template v-else>
        <p class="seller-phone__label">{{ $t(label) }}</p>
        <p class="seller-phone__number">{{ maskedPhone }}</p>
      </template>
    </div>
  </div>
</template>

<script>
import CallIcon from "@/components/Icons/call-plus";

export default {
  name: "SellerPhone",
  components: { CallIcon },
  props: {
    label: {
      type: String,
      default: "seller_phone.show_phone"
    },
    phone: {
      type: String,
      default: "+994 00 000 00 00"
    }
  },
  data() {
    return {
      isPhoneVisible: false
    }
  },
  computed: {
    maskedPhone() {
      return `${this.phone.slice(0, this.phone.length - 5)} ** **`;
    }
  },
  methods: {
    showNumber() {
      this.isPhoneVisible = true;
    }
  }
}
</script>

<style lang="scss">
@import "seller-phone";
</style>
