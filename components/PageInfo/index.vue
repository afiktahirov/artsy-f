<template>
  <div class="page-info d-flex flex-wrap align-center justify-space-between">
    <h2 class="page-info__title">
      <slot name="title" />
    </h2>
    <div class="page-info__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script>
export default {
  name: "PageInfo"
}
</script>

<style lang="scss">
@import "page-info";
</style>
