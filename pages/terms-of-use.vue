<template>
  <section class="page">
    <page-header :title="$t('pages.terms_of_use')">
      <el-breadcrumb class="scrollable-x" separator="/">
        <el-breadcrumb-item :to="$localePath('index')">{{ $t("pages.main") }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t("pages.terms_of_use") }}</el-breadcrumb-item>
      </el-breadcrumb>
    </page-header>

    <div class="page-body">
      <div class="container">
        <ul class="nav scrollable-x">
          <li class="nav-item">
            <nuxt-link class="nav-link" :to="$localePath('terms-of-use')">
              {{ $t("pages.terms_of_use") }}
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" :to="$localePath('privacy-policy')">
              {{ $t("pages.privacy_policy") }}
            </nuxt-link>
          </li>
        </ul>

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

export default {
  name: "TermsOfUsePage",
  components: { PageHeader, EditorBody },
  computed: {
    ...mapState({
      data: ({ pages }) => pages.termsOfUse.data
    })
  },
  async asyncData({ store }) {
    await store.dispatch("pages/fetchTermsOfUse")
  }
}
</script>
