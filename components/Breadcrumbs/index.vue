<template>
  <el-breadcrumb class="scrollable-x" separator="/">
    <el-breadcrumb-item :to="$localePath('index')">{{ $t("pages.main") }}</el-breadcrumb-item>
    <el-breadcrumb-item
      :key="breadcrumb.id"
      v-for="breadcrumb in breadcrumbs"
      :to="$localePath('category-id-products', { id: breadcrumb.id })"
    >
      {{ breadcrumb.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "Breadcrumbs",
  props: {
    items: {
      type: Object,
      required: true
    }
  },
  computed: {
    breadcrumbs() {
      return this.$breadcrumbsGenerator(this.items)
    }
  },
}
</script>
