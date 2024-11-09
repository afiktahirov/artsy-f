<template>
  <el-form
    :model="form"
    :rules="rules"
    v-loading="pending"
    ref="addReviewForm"
    label-position="top"
    class="add-review-form"
  >
    <el-form-item prop="rating" :label="$t('add_review_form.overall_rating')">
      <star-rating
        :increment="1"
        :star-size="24"
        v-model="form.rating"
        active-color="#000000"
      />
    </el-form-item>

    <el-form-item prop="body" :label="$t('add_review_form.about_product')">
      <el-input :rows="5" type="textarea" v-model="form.body" />
    </el-form-item>

    <image-uploader ref="uploader" :max-count="3" @change="handleUploaderChange" />

    <el-button class="w-100 mt-6" type="info" @click="submitForm">
      {{ $t("action.send") }}
    </el-button>
  </el-form>
</template>

<script>
import ImageUploader from "@/components/ImageUploader";

export default {
  name: "AddReviewForm",
  components: { ImageUploader },
  data() {
    return {
      pending: false,
      form: {
        rating: 5,
        body: "",
        images: []
      },
      rules: {
        body: [{ required: true, message: this.$t("errors.required"), trigger: "change" }],
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.addReviewForm.validate(async (isValid) => {
        if (!this.pending && isValid) {
          this.pending = true;
          this.$store.dispatch("products/addReviewToProduct", {
            id: this.$route.params.id, data: this.form
          })
            .then(() => {
              this.resetForm()
              this.$notify({
                customClass: "success",
                title: this.$t("messages.successfull_operation").toString(),
                message: this.$t("messages.your_comment_is_on_moderation").toString(),
              })
            })
            .catch(() => {
              this.pending = false
            })
        }
      })
    },

    handleUploaderChange(files) {
      this.form.images = files
    },

    resetForm() {
      this.pending = false
      this.form.images = []
      this.$refs.uploader.images = []
      this.$refs.addReviewForm.resetFields()
    }
  }
}
</script>

<style lang="scss">
@import "add-review-form";
</style>
