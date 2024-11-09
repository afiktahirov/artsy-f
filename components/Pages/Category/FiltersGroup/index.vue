<template>
  <transition name="el-fade-in">
    <div class="filters-group-wrapper" v-show="isVisible" @click.self="hide">
      <div class="filters-group">
        <template v-if="categories.children.length">
          <filters-group-item
            :items="categories.children"
            @change="handleCategoriesChange"
            :title="$t('placeholder.category')"
          />
        </template>

        <div class="filters-group__item">
          <el-collapse v-model="activeAccordions">
            <el-collapse-item title="Цена" name="price">
              <div class="filters-group__item-content">
                <div class="d-flex align-center mb-4">
                  <el-input
                    size="medium"
                    :max="priceRange[1]"
                    :value="priceRange[0]"
                    @change="emitChanges"
                    @input="handlePriceFromChange"
                    :placeholder="$t('placeholder.from')"
                  />
                  <span class="px-2">-</span>
                  <el-input
                    size="medium"
                    :min="priceRange[0]"
                    :value="priceRange[1]"
                    @change="emitChanges"
                    @input="handlePriceToChange"
                    :placeholder="$t('placeholder.from')"
                  />
                </div>

                <el-slider range :max="3000" v-model="priceRange" :show-tooltip="false" @change="emitChanges" />
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <!-- filters group item (price range) -->

        <template v-for="(attr, index) in attributes">
          <filters-group-item
            :key="attr.id"
            :title="attr.title"
            :items="attr.values"
            @change="handleAttributesChange($event, index)"
          />
        </template>

        <div class="filters-group__item">
          <el-switch
            @change="emitChanges"
            v-model="form.hasDiscount"
            :inactive-text="$t('filters_group.show_with_sale')"
          />
        </div>
      </div>
      <!-- filters group -->
    </div>
    <!-- filters group wapper -->
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import FiltersGroupItem from "./FiltersGroupItem";

export default {
  name: "FiltersGroup",
  components: { FiltersGroupItem },
  data() {
    return {
      isVisible: false,
      activeAccordions: ["price"],
      priceRange: [0, 3000],
      form: {
        categoryIds: null,
        attributeValuesIds: new Map(),
        hasDiscount: false
      }
    }
  },
  computed: {
    ...mapGetters({
      attributes: "products/getFilterAttributes",
      categories: "products/getFilterCategories"
    })
  },
  methods: {
    emitChanges() {
      const attributeValuesIds = [];
      for (const value of this.form.attributeValuesIds.values()) {
        attributeValuesIds.push(...value)
      }

      this.$emit("change", {
        priceMin: this.priceRange[0],
        priceMax: this.priceRange[1],
        hasDiscount: this.form.hasDiscount,
        categoryIds: this.form.categoryIds,
        attributeValuesIds: attributeValuesIds
      })
    },

    handleCategoriesChange(value) {
      this.form.categoryIds = value
      this.emitChanges()
    },

    handleAttributesChange(value, index) {
      this.form.attributeValuesIds.set(index, value);
      this.emitChanges()
    },

    handlePriceFromChange(value) {
      this.priceRange = [value, this.priceRange[1]]
    },

    handlePriceToChange(value) {
      this.priceRange = [this.priceRange[0], value]
    },

    show() {
      this.isVisible = true
      document.body.style.overflow = "hidden"
    },

    hide() {
      this.isVisible = false
      document.body.style.overflow = "auto"
    },
  }
}
</script>

<style lang="scss">
@import "filters-group";
</style>
