<template>
  <section class="page">
    <page-header :title="$t('pages.create_publication')">
      <el-breadcrumb class="scrollable-x" separator="/">
        <el-breadcrumb-item :to="$localePath('index')">{{ $t("pages.main") }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t("pages.create_publication") }}</el-breadcrumb-item>
      </el-breadcrumb>
    </page-header>

    <div class="page-body">
      <div class="container">
        <create-product-form @submit="handleCreateProduct" />
      </div>
    </div>
    <!-- page body -->
  </section>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import CreateProductForm from "@/components/Pages/Profile/ProductForm";

export default {
  name: "ProfileCreateProductPage",
  middleware: ["auth"],
  components: { PageHeader, CreateProductForm },
  methods: {
    handleCreateProduct(formData) {
      this.$store.dispatch("profile/createProduct", formData)
        .then(() => {
          this.$notify({
            customClass: "success",
            title: this.$t("messages.successfull_operation").toString(),
            message: this.$t("messages.product_created_successfully").toString(),
          })
          this.$router.push(this.localeRoute("profile-products"))
        })
    }
  },
  async asyncData({ store }) {
    await Promise.all([
      store.dispatch("products/fetchTags"),
    ])
  }
}
</script>
