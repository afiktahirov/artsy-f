<template>
  <el-row v-loading.fullscreen="loading">
    <el-col :lg="16">
      <el-form ref="productForm" :model="form" :rules="rules">
        <block-title>{{ $t("product_form.title") }}</block-title>
        <block-subtitle>{{ $t("product_form.subtitle") }}</block-subtitle>

        <enhanced-row type="flex">
          <el-col :span="24">
            <el-form-item prop="title">
              <floating-label :value="form.title" :label="$t('product_form.product_name')">
                <el-input v-model="form.title" />
              </floating-label>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="description">
              <floating-label :value="form.description" :label="$t('product_form.product_description')">
                <el-input v-model="form.description" type="textarea" :rows="5" />
              </floating-label>
            </el-form-item>
          </el-col>

          <el-col :sm="12">
            <el-form-item prop="category_id">
              <floating-label :value="form.category_id" :label="$t('product_form.category')">
                <el-select v-model="form.category_id" placeholder="">
                  <template v-for="category in categories">
                    <el-option :key="category.id" :value="category.id" :label="category.title" />
                  </template>
                </el-select>
              </floating-label>
            </el-form-item>
          </el-col>

          <el-col :sm="12">
            <el-form-item prop="tag_ids">
              <floating-label :value="form.tag_ids" :label="$t('product_form.tags')">
                <el-select v-model="form.tag_ids" multiple  @focus="isFocused = true" @blur="isFocused = false"
                   placeholder=" ">
                  <template v-for="tag in tags">
                    <el-option  :key="tag.id" :value="tag.id" :label="tag.title" />
                  </template>
                </el-select>
              </floating-label>
            </el-form-item>
          </el-col>

          <!-- <el-col :sm="12" v-for="(attr, index) in attributes" :key="attr.id">
            <el-form-item prop="attributes">
              <floating-label :value="form.attributes.get(index)" :label="attr.title">
                <el-select :value="form.attributes.get(index)" @change="handleAttributeChange($event, index)"
                  placeholder="">
                  <el-option v-for="item in attr.values" :key="item.id" :value="item.id" :label="item.value" />
                </el-select>
              </floating-label>
            </el-form-item>
          </el-col> -->

          <el-col :sm="24">
            <el-divider class="mt-4 mb-8" />
          </el-col>

          <el-col :sm="12">
            <el-form-item prop="price">
              <floating-label :value="form.price" :label="$t('product_form.price')">
                <el-input type="number" v-model="form.price" />
              </floating-label>
            </el-form-item>
          </el-col>

          <template v-if="has_discount">
            <el-col :sm="12">
              <el-form-item prop="discount_type">
                <floating-label :value="form.discount_type" :label="$t('product_form.discount_type')">
                  <el-select v-model="form.discount_type" placeholder="">
                    <el-option value="fixed" :label="$t('product_form.fixed_discount')" />
                    <el-option value="percent" :label="$t('product_form.percent_discount')" />
                  </el-select>
                </floating-label>
              </el-form-item>
            </el-col>
            <el-col :sm="12">
              <el-form-item prop="discount">
                <floating-label :value="form.discount" :label="$t('product_form.discount_size')">
                  <el-input type="number" v-model="form.discount" />
                </floating-label>
              </el-form-item>
            </el-col>
            <el-col :sm="12">
              <el-form-item>
                <floating-label :value="final_price" :label="$t('product_form.final_price')">
                  <el-input type="number" :value="final_price" readonly />
                </floating-label>
              </el-form-item>
            </el-col>
          </template>

          <el-col :span="24">
            <div class="mt-2 mb-3">
              <el-checkbox v-model="has_discount" :label="$t('product_form.has_discount')" />
            </div>
            <div>
              <el-checkbox v-model="form.is_preorder" :label="$t('product_form.required_preorder')" />
            </div>
          </el-col>
        </enhanced-row>

        <el-divider class="mt-10" />

        <el-form-item prop="images">
          <image-uploader @change="handleUploaderChange" :uploadedImages="form.images" />
        </el-form-item>

        <enhanced-row>
          <el-col :sm="12">
            <el-button class="w-100 mt-5" type="info" @click="submitForm">
              {{ $t("product_form.publish_product") }}
            </el-button>
          </el-col>
        </enhanced-row>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import FloatingLabel from "@/components/FloatingLabel";
import BlockTitle from "@/components/BlockTitle";
import BlockSubtitle from "@/components/BlockSubtitle";
import EnhancedRow from "@/components/EnhancedRow";
import ImageUploader from "@/components/ImageUploader";

export default {
  name: "CreateProductForm",
  props: {
    initialData: {
      type: Object,
      default: () => ({
        title: "",
        description: "",
        category: {},
        attributes: [],
        price: "",
        discount: "",
        discount_type: "",
        is_preorder: 0,
        images: null,
        tag_ids: []
      })
    }
  },
  components: { FloatingLabel, BlockTitle, BlockSubtitle, EnhancedRow, ImageUploader },
  data() {
    const discountsRequired = (_, value, callback) => {
      if (this.has_discount) {
        if (value.trim() === "") {
          callback(new Error(this.$t("errors.required").toString()))
        } else {
          callback();
        }
      } else {
        callback()
      }
    }

    const discountAmountValidator = (_, value, callback) => {
      if (this.has_discount) {
        if (value.trim() === "") {
          callback(new Error(this.$t("errors.required").toString()))
        } else {
          callback();
        }

        if (this.form.discount_type === "fixed") {
          if (Number(this.form.price) <= Number(this.form.discount)) {
            callback(new Error(this.$t("errors.incorrect_discount_amount").toString()))
          }
        } else if (this.form.discount_type === "percent") {
          if (Number(this.form.discount) >= 100) {
            callback(new Error(this.$t("errors.incorrect_discount_percent").toString()))
          }
        }
      } else {
        callback()
      }
    }

    return {
      has_discount: false,
      form: {
        title: this.initialData.title || "",
        description: this.initialData.description || "",
        category_id: this.initialData.category && this.initialData.category.id || "",
        attributes: new Map(),
        price: this.initialData.price || "",
        discount: "",
        discount_type: "",
        is_preorder: Boolean(this.initialData.is_preorder),
        images: this.initialData.images || [],
        tag_ids: this.initialData.tag_ids || []
      },
      isFocused: false,
      rules: {
        title: [
          { required: true, message: this.$t("errors.required"), trigger: "change" },
          { max: 255, message: this.$t("errors.max_length", { count: 255 }), trigger: "change" },
        ],
        description: [
          { required: true, message: this.$t("errors.required"), trigger: "change" },
          { min: 10, message: this.$t("errors.min_length", { count: 10 }), trigger: "change" },
        ],
        category_id: [
          { required: true, message: this.$t("errors.required"), trigger: "change" },
        ],
        price: [
          { required: true, message: this.$t("errors.required"), trigger: "change" },
        ],
        discount: [
          { validator: discountAmountValidator, trigger: "change" },
        ],
        discount_type: [
          { validator: discountsRequired, trigger: "change" },
        ],
        images: [
          { required: true, message: this.$t("errors.add_images"), trigger: "change" },
        ],
        tag_ids: [
          { required: true, message: this.$t("errors.required"), trigger: "change" },
        ],
      }
    }
  },
  computed: {
    selected_category_id() {
      return this.form.category_id
    },
    final_price() {
      if (Boolean(this.form.discount_type) && Boolean(this.form.price) && Boolean(this.form.discount)) {
        if (this.form.discount_type === "fixed") {
          return this.form.price - this.form.discount
        } else {
          return (this.form.price - ((this.form.price * this.form.discount) / 100)).toFixed(2)
        }
      }
    },
    ...mapState({
      loading: ({ products }) => products.loading,
    }),
    ...mapGetters({
      categories: "layout/getChildCategories",
      attributes: "products/getFilterAttributes",
      tags : "products/getTagIds"
    })
  },
  watch: {
    selected_category_id() {
      this.form.attributes = new Map()
      this.$store.dispatch("products/fetchAttributesByCategoryIds", {
        "filter[categoryIds]": this.selected_category_id
      })
    },
  },
  methods: {
    submitForm() {
      this.$refs.productForm.validate((isValid) => {
        if (isValid) {
          const attributes = [];
          for (const value of this.form.attributes.values()) {
            attributes.push(value)
          }

          this.$emit("submit", {
            ...this.form,
            attributes: attributes
          })
        }
      })
    },

    handleAttributeChange(value, index) {
      this.form.attributes = new Map(this.form.attributes.set(index, value))
    },

    handleUploaderChange(files) {
      this.form.images = files
    },
  },
}
</script>