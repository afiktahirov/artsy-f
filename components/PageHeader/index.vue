<template>
  <div class="page-header">
    <div class="container">
      <h1 class="page-header__title">{{ title }}</h1>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  props: {
    title: {
      type: String,
      default: "Title"
    }
  }
}
</script>

<style lang="scss">
@import "page-header";
</style>
