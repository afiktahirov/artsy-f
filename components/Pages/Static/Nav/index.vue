<template>
  <ul class="nav scrollable-x">
    <li class="nav-item">
      <nuxt-link class="nav-link" :to="$localePath('about')">
        {{ $t("static_pages_nav.how_platform_works.label") }}
      </nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link" :to="$localePath('safe-shopping')">
        {{ $t("static_pages_nav.safe_shopping.label") }}
      </nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link" :to="$localePath('faq')">
        {{ $t("static_pages_nav.have_questions.label") }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "StaticPagesNav"
}
</script>
