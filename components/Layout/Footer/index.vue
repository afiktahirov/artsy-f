<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="container d-flex flex-wrap align-center justify-space-between">
        <nuxt-link class="footer-logo d-flex" :to="$localePath('index')">
          <el-image src="/images/logo-light.svg" />
        </nuxt-link>

        <ul class="social-links">
          <li class="social-links__item">
            <a class="social-links__link" href="https://instagram.com" target="_blank" rel="noreferrer">
              <instagram-icon />
            </a>
          </li>
          <li class="social-links__item">
            <a class="social-links__link" href="https://facebook.com" target="_blank" rel="noreferrer">
              <facebook-icon />
            </a>
          </li>
          <li class="social-links__item">
            <a class="social-links__link" href="https://youtube.com" target="_blank" rel="noreferrer">
              <youtube-icon />
            </a>
          </li>
          <li class="social-links__item">
            <a class="social-links__link" href="https://linkedin.com" target="_blank" rel="noreferrer">
              <linkedin-icon />
            </a>
          </li>
        </ul>
      </div>
    </div>
    <!-- footer top -->

    <div class="footer-bottom">
      <div class="container d-flex flex-wrap align-center justify-space-between">
        <ul class="footer-links">
          <li class="footer-links__item">
            <nuxt-link :to="$localePath('terms-of-use')">{{ $t("pages.terms_of_use") }}</nuxt-link>
          </li>
          <li class="footer-links__item">
            <nuxt-link :to="$localePath('privacy-policy')">{{ $t("pages.privacy_policy") }}</nuxt-link>
          </li>
        </ul>

        <p class="copyrights">{{ $t("placeholder.copyrights") }}</p>
      </div>
    </div>
    <!-- footer bottom -->
  </footer>
</template>

<script>
import InstagramIcon from "@/components/Icons/instagram";
import FacebookIcon from "@/components/Icons/facebook";
import YoutubeIcon from "@/components/Icons/youtube";
import LinkedinIcon from "@/components/Icons/linkedin";

export default {
  name: "AppFooter",
  components: { InstagramIcon, FacebookIcon, YoutubeIcon, LinkedinIcon }
}
</script>

<style lang="scss">
@import "footer";
</style>
