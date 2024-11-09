<template>
  <el-row :type="type" class="flex-wrap" :gutter="isMobile ? 12 : 20">
    <slot />
  </el-row>
</template>

<script>
import mediaQuery from "@/mixins/mediaQuery";

export default {
  name: "EnhancedRow",
  mixins: [mediaQuery],
  props: {
    type: String,
    default: ""
  }
}
</script>
