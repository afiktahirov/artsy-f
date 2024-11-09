<template>
  <div class="pagination d-flex align-center mt-6">
    <el-pagination
      background
      :total="total"
      :pager-count="5"
      :page-size="selectedSize"
      :current-page="currentPage"
      layout="prev, pager, next"
      @current-change="handlePageChange"
    />

    <el-dropdown @command="handleSizeChange" trigger="click" class="d-none d-md-block">
      <button class="dropdown-trigger">
        {{ $t("show_count.label") }}
        <span>{{ selectedSize }}</span>
        <angle-down-icon />
      </button>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="size in sizeOptions"
          :command="size"
          :key="size"
        >
          {{ size }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import AngleDownIcon from "@/components/Icons/angle-down";

export default {
  name: "Pagination",
  components: { AngleDownIcon },
  props: {
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      sizeOptions: [15, 24, 33, 42],
      selectedSize: 15
    }
  },
  methods: {
    handlePageChange(page) {
      this.$emit("page-change", page);
    },

    handleSizeChange(size) {
      this.selectedSize = size;
      this.$emit("size-change", size);
    }
  },
  mounted() {
    const { perPage = 15 } = this.$route.query;
    if (perPage) {
      this.selectedSize = Number(perPage);
    }
  }
}
</script>

<style lang="scss">
@import "pagination";
</style>
