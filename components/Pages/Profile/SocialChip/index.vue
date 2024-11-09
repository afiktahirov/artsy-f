<template>
  <a
    class="social-chip d-flex align-center"
    :class="{ 'social-chip_attached': attached }"
    :href="attached ? `javascript:void(0)` : `${$config.baseURL}/auth/social/attach-account?driver=${socialType}`"
  >
    <div class="social-chip__icon">
      <slot name="icon" />
    </div>
    <div class="social-chip__label">
      {{ attached ? $t("social_chip.connected") : label }}
    </div>
    <button class="social-chip__button" v-if="attached">
      <close-icon />
    </button>
  </a>
</template>

<script>
import CloseIcon from "@/components/Icons/close"

export default {
  name: "SocialChip",
  components: { CloseIcon },
  props: {
    attached: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    },
    socialType: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import "social-chip";
</style>
