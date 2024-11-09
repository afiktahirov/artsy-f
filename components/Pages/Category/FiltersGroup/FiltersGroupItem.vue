<template>
  <div class="filters-group__item">
    <el-collapse v-model="accordionState">
      <el-collapse-item :title="title" :name="1">
        <div class="filters-group__item-content">
          <div class="mb-4" v-if="items.length > 10">
            <el-input
              size="medium"
              v-model="search"
              suffix-icon="el-icon-search"
              :placeholder="$t('placeholder.search')"
            />
          </div>

          <el-checkbox-group v-model="data" @change="handleChange">
            <el-checkbox v-for="item in filteredItems" :key="item.id" :label="item.id">
              {{item.title ? item.title : item.value}}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: "FiltersGroupItem",
  props: {
    title: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      accordionState: 1,
      search: "",
      data: [],
    }
  },
  computed: {
    filteredItems: {
      get() {
        if (this.search.trim() !== "") {
          return this.items.filter((item) => {
            if (item.title) {
              return item.title.toLowerCase().startsWith(this.search.toLowerCase())
            } else {
              return item.value.toLowerCase().startsWith(this.search.toLowerCase())
            }
          })
        } else {
          return this.items
        }
      }
    }
  },
  methods: {
    handleChange() {
      this.$emit("change", this.data);
    }
  }
}
</script>
