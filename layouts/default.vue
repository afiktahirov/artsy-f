<template>
  <div id="root">
    <app-header />
    <main class="content">
      <nuxt />
    </main>
    <app-footer />
  </div>
</template>

<script>
import AppHeader from "@/components/Layout/Header";
import AppFooter from "@/components/Layout/Footer";

export default {
  name: "Layout",
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      loading: true
    }
  },
  mounted() {
    this.loading = false;
  }
}
</script>
