<template>
  <div class="auth-layout d-flex">
    <div class="auth-layout__content d-flex direction-column">
      <div>
        <nuxt-link class="auth-layout__content-logo" :to="$localePath('index')">
          <el-image src="/images/logo.svg" />
        </nuxt-link>

        <div class="auth-layout__content-link">
          <slot name="link" />
        </div>
      </div>

      <div class="auth-layout__content-body">
        <slot name="default" />
      </div>

      <div class="auth-layout__content-footer">
        <slot name="content-footer" />
      </div>
    </div>

    <div class="auth-layout__background d-none d-md-block">
      <el-image :src="background" fit="cover" alt="Auth bg" />
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
  props: {
    background: {
      type: String,
      default: "/images/login-bg.png"
    }
  }
}
</script>

<style lang="scss">
@import "auth-layout";
</style>
