<template>
  <section class="main-page">
    <intro-slider />
    <vip-offers />
    <SecondBanners />
    <latest-publications />
    <brands-slider />
    <how-it-works />

    <template v-if="showPopup">
      <div class="popup-container">
        <div class="popup">
          <p>{{ message }}</p>
          <button @click="closePopup">{{ this.$t("pop_up.button") }}</button>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
import IntroSlider from "@/components/Pages/Home/IntroSlider";
import VipOffers from "@/components/Pages/Home/VipOffers";
import Banners from "@/components/Pages/Home/BannersSlider";
import LatestPublications from "@/components/Pages/Home/LatestPublications";
import BrandsSlider from "@/components/Pages/Home/BrandsSlider";
import HowItWorks from "@/components/Pages/Home/HowItWorks";
import SecondBanners from "@/components/Pages/Home/SecondBanners";
import Cookies from 'js-cookie';

export default {
  name: "HomePage",
  components: {
    IntroSlider,
    VipOffers,
    Banners,
    LatestPublications,
    BrandsSlider,
    HowItWorks,
    SecondBanners,
  },
  data() {
    return {
      showPopup: false,
      message: "",
    };
  },
  watch: {
    "$route.query.status": function (newStatus) {
      if (newStatus) {
        this.showPopup = true;
        if (newStatus === "success") {
          this.message = this.$t('pop_up.success'); 
        } else if (newStatus === "error") {
          this.message = this.$t('pop_up.error'); 
        } else {
          this.message = this.$t('pop_up.failed'); 
        }
      }
    },
  },
  mounted() {
    const googleToken = Cookies.get('google_auth_token');


    if (googleToken) {
      this.handleGoogleCallback(googleToken);
    }

    // Payment status kontrolü
    if (this.$route.query.paymentStatus) {
      this.showPopup = true;
      const status = this.$route.query.paymentStatus;
      if (status === "success") {
        this.message = this.$t('pop_up.success');
      } else if (status === "error") {
        this.message = this.$t('pop_up.error'); 
      } else {
        this.message = this.$t('pop_up.failed');
      }
    }
  },
  methods: {
    closePopup() {
      this.showPopup = false;
      
      this.$router.push({ path: this.$route.path });
    },
    async handleGoogleCallback(token) {
      try {
        await this.$auth.strategy.token.set('Bearer ' + token);
        
        await this.$auth.fetchUserOnce();
        
        Cookies.remove('google_auth_token');
        
      } catch (error) {
        console.error('Google callback handling error:', error);
        // Hata durumunda login sayfasına yönlendir
        this.$router.push('/auth/login');
      }
    }
  },
  async asyncData({ store }) {
    await Promise.all([
      store.dispatch("home/fetchBanners"),
      store.dispatch('home/fetchPopularCustomers'),
      store.dispatch('home/fetchVipProducts', { perPage: 8 }),
      store.dispatch('home/fetchLatestProducts', { perPage: 8 }),
      store.dispatch('home/fetchSecondBanners')
    ]);
  },
};
</script>

<style>
.popup-container{
  position: fixed;
  inset: 0;
  background-color: #00000080;
  z-index: 999;
}
.popup {
  position: fixed;
  top: 30%;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  min-width: 400px;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
}
.popup button{
  background-color: #000;
  border-radius: 5px;
  color: #fff;
  padding: 12px 21px;
}
.popup p {
  font-size: 20px;
  font-weight: 500;
}
</style>
