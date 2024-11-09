<template>
  <section class="page faq-page">
    <page-header :title="$t('static_pages_nav.have_questions.label')">
      <el-breadcrumb class="scrollable-x" separator="/">
        <el-breadcrumb-item :to="$localePath('index')">{{ $t("pages.main") }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('static_pages_nav.have_questions.label') }}</el-breadcrumb-item>
      </el-breadcrumb>
    </page-header>

    <div class="page-body">
      <div class="container">
        <static-nav />

        <template v-if="!faq.length">
          <el-empty class="pt-10" :description="$t('placeholder.no_data_to_show')" />
        </template>

        <template v-else>
          <block-title>{{ $t("faq.title") }}</block-title>

          <el-row>
            <el-col :lg="16">
              <el-collapse v-model="activeAccordion" accordion>
                <template v-for="item in faq">
                  <el-collapse-item :title="item.title" :name="item.id" :key="item.id">
                    <div v-html="item.description" />
                  </el-collapse-item>
                </template>
              </el-collapse>
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
import StaticNav from "@/components/Pages/Static/Nav";
import BlockTitle from "@/components/BlockTitle";

export default {
  name: "FAQPage",
  components: { PageHeader, StaticNav, BlockTitle },
  data() {
    return {
      activeAccordion: "1"
    }
  },
  computed: {
    ...mapState({
      faq: ({ pages }) => pages.faq.data || [],
    })
  },
  async asyncData({ store }) {
    await store.dispatch("pages/fetchFaq")
  }
}
</script>
