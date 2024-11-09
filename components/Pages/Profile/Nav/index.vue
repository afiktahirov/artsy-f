<template>
  <ul class="nav scrollable-x">
    <li class="nav-item">
      <nuxt-link class="nav-link" :to="$localePath('profile-products')">
        {{ $t("profile_nav.my_products") }}
      </nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link" :to="$localePath('profile-info')">
        {{ $t("profile_nav.personal_cabinet") }}
      </nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link" :to="$localePath('profile-payments')">
        {{ $t("profile_nav.payments") }}
      </nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link" :to="$localePath('profile-settings')">
        {{ $t("profile_nav.settings") }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ProfileNav"
}
</script>

<style lang="scss">
@import "profile-nav";
</style>
