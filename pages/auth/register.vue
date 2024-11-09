<template>
  <auth-layout background="/images/register-bg.png">
    <template #link>
      {{ $t("auth.with_account") }}
      <nuxt-link :to="$localePath('auth-login')">{{ $t('auth.login') }}</nuxt-link>
    </template>

    <template #default>
      <div class="auth-form">
        <h1 class="auth-form__title">{{ $t("auth.registration") }}</h1>
        <el-form :model="form" :rules="rules" ref="registerForm" @keyup.native.enter="submitForm">
          <el-form-item prop="name">
            <el-input type="text" v-model="form.name" :placeholder="$t('placeholder.username')" />
          </el-form-item>
          <el-form-item prop="email">
            <el-input type="email" v-model="form.email" :placeholder="$t('placeholder.email')" />
          </el-form-item>
          <el-form-item prop="phone">
            <el-input v-model="form.phone" v-mask="'+994 ### ## ##'" :placeholder="$t('placeholder.phone_number')" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="form.password" :placeholder="$t('placeholder.password')" show-password />
          </el-form-item>
          <el-button class="w-100 mt-1" type="info" @click="submitForm">
            {{ $t("auth.sign_up") }}
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
import AppleIcon from "@/components/Icons/auth-apple";
import GoogleIcon from "@/components/Icons/auth-google";
import FacebookIcon from "@/components/Icons/auth-facebook";

export default {
  name: "RegisterPage",
  layout: "auth",
  components: { AuthLayout, AppleIcon, GoogleIcon, FacebookIcon },
  data() {
    return {
      pending: false,
      form: {
        name: "",
        email: "",
        phone: "",
        password: "",
      },
      rules: {
        name: [{ required: true, message: this.$t("errors.required"), trigger: "change" }],
        email: [
          { required: true, message: this.$t("errors.required"), trigger: "change" },
          { type: "email", message: this.$t("errors.not_email"), trigger: "blur" },
        ],
        phone: [{ required: true, message: this.$t("errors.required"), trigger: "change" }],
        password: [{ required: true, message: this.$t("errors.required"), trigger: "change" }],
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.registerForm.validate(async (isValid) => {
        if (!this.pending && isValid) {
          try {
            this.pending = true;
            await this.$store.dispatch("user/register", this.form);
          } catch(error) {
            this.pending = false;
          }
        }
      })
    }
  }
}
</script>
