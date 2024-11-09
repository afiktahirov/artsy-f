<template>
  <section class="page">
    <page-header :title="$t('pages.update_publication')">
      <el-breadcrumb class="scrollable-x" separator="/">
        <el-breadcrumb-item :to="$localePath('index')">{{ $t("pages.main") }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t("pages.update_publication") }}</el-breadcrumb-item>
      </el-breadcrumb>
    </page-header>

    <div class="page-body">
      <div class="container">
        <create-product-form @submit="handleUpdateProduct" :initialData="details" />
      </div>
    </div>
    <!-- page body -->
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import PageHeader from "@/components/PageHeader";
import CreateProductForm from "@/components/Pages/Profile/ProductForm";

export default {
  name: "ProfileProductEdit",
  middleware: ["auth"],
  components: { PageHeader, CreateProductForm },
  computed: {
    ...mapGetters({
      details: "profile/getProductDetails",
    }),
  },
  methods: {
    handleUpdateProduct(formData) {
      debugger;
    }
  },
  async asyncData({ store, params }) {
    await store.dispatch("profile/fetchProductDetails", params.id);
  }
}
</script>
