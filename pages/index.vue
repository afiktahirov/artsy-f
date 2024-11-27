<template>
  <section class="main-page">
    <intro-slider />
    <vip-offers />
    <!-- <banners /> -->
    <SecondBanners /> 
    <latest-publications />
    <brands-slider />
    <how-it-works />
  </section>
</template>

<script>
import IntroSlider from "@/components/Pages/Home/IntroSlider";
import VipOffers from "@/components/Pages/Home/VipOffers";
import Banners from "@/components/Pages/Home/BannersSlider";
import LatestPublications from "@/components/Pages/Home/LatestPublications";
import BrandsSlider from "@/components/Pages/Home/BrandsSlider";
import HowItWorks from "@/components/Pages/Home/HowItWorks";
import SecondBanners from "@/components/Pages/Home/SecondBanners"

export default {
  name: 'HomePage',
  components: { IntroSlider, VipOffers, Banners, LatestPublications, BrandsSlider, HowItWorks, SecondBanners },
  comments: {
    IntroSlider
  },
  async asyncData({ store }) {
    await Promise.all([
      store.dispatch("home/fetchBanners"),
      store.dispatch('home/fetchPopularCustomers'),
      store.dispatch('home/fetchVipProducts', { perPage: 8 }),
      store.dispatch('home/fetchLatestProducts', { perPage: 8 }),
      store.dispatch('home/fetchSecondBanners')
    ])
  }
}
</script>