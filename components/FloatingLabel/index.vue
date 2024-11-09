<template>
  <div
    tabindex="0"
    :class="{
      'floating-label': true,
      'floating-label--focused': labelFocused
    }"
    @focusin="setIsFocused(true)"
    @focusout="setIsFocused(false)"
  >
    <slot />
    <label class="floating-label__text">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: "FloatingLabel",
  props: {
    label: {
      type: String | Object,
      required: true
    },
    value: {
      type: String | Number | Array,
      required: true
    }
  },
  data() {
    return {
      isFocused: false
    }
  },
  computed: {
    labelFocused() {
      return this.isFocused || Boolean(this.value)
    }
  },
  methods: {
    setIsFocused(boolean) {
      this.isFocused = boolean;
    }
  }
}
</script>

<style lang="scss">
@import "floating-label";
</style>
