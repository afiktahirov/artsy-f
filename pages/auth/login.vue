<template>
  <auth-layout>
    <template #link>
      {{ $t("auth.without_account") }}
      <nuxt-link :to="$localePath('auth-register')">{{ $t('auth.register') }}</nuxt-link>
    </template>

    <template #default>
      <div class="auth-form">
        <h1 class="auth-form__title">{{ $t("auth.login_into_account") }}</h1>
        <el-form :model="form" :rules="rules" ref="loginForm" @keyup.native.enter="submitForm">
          <el-form-item prop="email">
            <el-input type="email" v-model="form.email" :placeholder="$t('placeholder.email')" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="form.password" :placeholder="$t('placeholder.password')" show-password />
          </el-form-item>
          <nuxt-link class="auth-form__forgot-pass" :to="$localePath('auth-forgot-password')">
            <lock-icon />
            {{ $t("auth.forgot_password.label") }}
          </nuxt-link>
          <el-button class="w-100 mt-1" type="info" @click="submitForm">
            {{ $t("auth.login") }}
          </el-button>
        </el-form>

        <el-divider>{{ $t("auth.or_continue_with") }}</el-divider>

        <ul class="auth-links">
          <li class="auth-links__item">
            <a class="auth-links__link" :href="`${$config.baseURL}/auth/social?driver=google`">
              <google-icon />
            </a>
          </li>
          <li class="auth-links__item">
            <a class="auth-links__link" :href="`${$config.baseURL}/auth/social?driver=facebook`">
              <facebook-icon />
            </a>
          </li>
        </ul>
      </div>
    </template>

    <template #content-footer>
      <p class="policy-agreement">
        {{ $t("auth.policy_agreement.text") }}
        <nuxt-link :to="$localePath('privacy-policy')">
          {{ $t("auth.policy_agreement.link_text") }}
        </nuxt-link>
      </p>
    </template>
  </auth-layout>
</template>

<script>
import AuthLayout from "@/components/AuthLayout";
import LockIcon from "@/components/Icons/lock.vue";
import AppleIcon from "@/components/Icons/auth-apple.vue";
import GoogleIcon from "@/components/Icons/auth-google.vue";
import FacebookIcon from "@/components/Icons/auth-facebook.vue";

export default {
  name: "LoginPage",
  layout: "auth",
  components: { AuthLayout, LockIcon, AppleIcon, GoogleIcon, FacebookIcon },
  data() {
    return {
      pending: false,
      form: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          { required: true, message: this.$t("errors.required"), trigger: "change" },
          { type: "email", message: this.$t("errors.not_email"), trigger: "blur" },
        ],
        password: [{ required: true, message: this.$t("errors.required"), trigger: "change" }],
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate(async (isValid) => {
        if (!this.pending && isValid) {
          try {
            this.pending = true;
            await this.$store.dispatch("user/login", this.form);
          } catch(error) {
            this.pending = false;
          }
        }
      })
    }
  }
}
</script>
