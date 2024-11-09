<template>
  <section class="page">
    <page-header :title="$t('pages.safe_shopping')">
      <el-breadcrumb class="scrollable-x" separator="/">
        <el-breadcrumb-item :to="$localePath('index')">{{ $t("pages.main") }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t("pages.safe_shopping") }}</el-breadcrumb-item>
      </el-breadcrumb>
    </page-header>

    <div class="page-body">
      <div class="container">
        <static-nav />

        <template v-if="!data.body">
          <el-empty class="pt-10" :description="$t('placeholder.no_data_to_show')" />
        </template>
        <template v-else>
          <el-row>
            <el-col :md="18">
              <editor-body v-html="data.body" />
            </el-col>
          </el-row>
        </template>
      </div>
    </div>
    <!-- page body -->
  </section>
</template>

<script>
import { mapState } from "vuex";

import PageHeader from "@/components/PageHeader";
import EditorBody from "@/components/EditorBody";
import StaticNav from "@/components/Pages/Static/Nav";

export default {
  name: "SafeShoppingPage",
  components: { PageHeader, EditorBody, StaticNav },
  computed: {
    ...mapState({
      data: ({ pages }) => pages.safeShopping.data
    })
  },
  async asyncData({ store }) {
    await store.dispatch("pages/fetchSafeShopping")
  }
}
</script>
