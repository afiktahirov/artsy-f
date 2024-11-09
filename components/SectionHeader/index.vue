<template>
  <div class="section-header d-flex flex-wrap align-center justify-space-between">
    <div class="section-header__left d-flex align-center">
      <h2 class="section-header__title">{{ title }}</h2>
      <div class="section-header__controls d-none d-sm-flex">
        <slot name="controls" />
      </div>
    </div>

    <div class="section-header__link">
      <slot name="link" />
    </div>
  </div>
</template>

<script>
export default {
  name: "SectionHeader",
  props: {
    title: {
      type: String,
      default: "Title"
    }
  }
}
</script>

<style lang="scss">
@import "section-header";
</style>
