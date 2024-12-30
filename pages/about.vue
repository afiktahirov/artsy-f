<template>
  <section class="page about-page">
    <page-header :title="$t('static_pages_nav.how_platform_works.label')">
      <el-breadcrumb class="scrollable-x" separator="/">
        <el-breadcrumb-item :to="$localePath('index')">{{ $t("pages.main") }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('static_pages_nav.how_platform_works.label') }}</el-breadcrumb-item>
      </el-breadcrumb>
    </page-header>

    <div class="page-body">
      <div class="container">
        <static-nav />

        <template v-if="!data.body">
          <el-empty class="pt-10" :description="$t('placeholder.no_data_to_show')" />
        </template>
        <template v-else>
          <div class="about-page__content d-flex flex-wrap align-flex-start justify-space-between">
            <div class="about-page__images">
              <div class="background-image" v-if="data.photos[0]">
                <el-image :src="data.photos[0]" fit="cover" />
              </div>
              <div class="foreground-image" v-if="data.photos[1]">
                <el-image :src="data.photos[1]" fit="cover" />
              </div>
            </div>

            <div class="about-page__text">
              <template v-if="!data.body">
                <el-empty class="pt-10" :description="$t('placeholder.no_data_to_show')" />
              </template>
              <template v-else>
                <editor-body v-html="data.body" />
              </template>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import PageHeader from "@/components/PageHeader";
import StaticNav from "@/components/Pages/Static/Nav/index.vue";
import EditorBody from "@/components/EditorBody";

export default {
  name: "AboutPage",
  components: { PageHeader, StaticNav, EditorBody },
  computed: {
    ...mapState({
      data: ({ pages }) => pages.howItWorks.data || {},
    })
  },
  async asyncData({ store }) {
    await store.dispatch("pages/fetchHowItWorks")
  },
  mounted(){
    console.log(this.data)
  }
}
</script>
