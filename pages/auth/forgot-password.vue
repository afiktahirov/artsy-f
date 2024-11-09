<template>
  <auth-layout background="/images/register-bg.png">
    <template #link>
      {{ $t("auth.without_account") }}
      <nuxt-link :to="$localePath('auth-register')">{{ $t('auth.register') }}</nuxt-link>
    </template>

    <template #default>
      <div class="auth-form">
        <template v-if="!emailSent">
          <h1 class="auth-form__title">{{ $t("auth.forgot_password.label") }}</h1>
          <p class="auth-form__subtitle">{{ $t("auth.forgot_password.placeholder") }}</p>
          <el-form :model="form" :rules="rules" ref="forgotPassForm" @submit.native.prevent="submitForm">
            <el-form-item prop="email">
              <el-input type="email" v-model="form.email" :placeholder="$t('placeholder.email')" />
            </el-form-item>
            <el-button class="w-100 mt-1" type="info" @click="submitForm" >
              {{ $t("action.send") }}
            </el-button>
          </el-form>
        </template>

        <template v-else>
          <h1 class="auth-form__title">{{ $t("auth.check_email.title") }}</h1>
          <p class="auth-form__subtitle">{{ $t("auth.check_email.description", { email: "test@test.com" }) }}</p>
          <nuxt-link :to="$localePath('index')">
            <el-button class="w-100 mt-1" type="info">
              {{ $t("action.go_home") }}
            </el-button>
          </nuxt-link>
        </template>
      </div>
    </template>

    <template #content-footer>
      <p class="copyrights">{{ $t("placeholder.copyrights") }}</p>
    </template>
  </auth-layout>
</template>

<script>
import AuthLayout from "@/components/AuthLayout";

export default {
  name: "ForgotPasswordPage",
  layout: "auth",
  components: { AuthLayout },
  data() {
    return {
      pending: false,
      emailSent: false,
      form: {
        email: "",
      },
      rules: {
        email: [
          { required: true, message: this.$t("errors.required"), trigger: "change" },
          { type: "email", message: this.$t("errors.not_email"), trigger: "blur" },
        ],
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.forgotPassForm.validate(async (isValid) => {
        if (!this.pending && isValid) {
          try {
            this.pending = true
            await this.$store.dispatch("user/forgotPassword", this.form)
            this.emailSent = true
          } catch(error) {
            this.emailSent = false
            this.pending = false
          }
        }
      })
    }
  }
}
</script>
