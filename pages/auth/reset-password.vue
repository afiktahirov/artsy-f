<template>
  <auth-layout background="/images/register-bg.png">
    <template #default>
      <div class="auth-form">
        <h1 class="auth-form__title">{{ $t("auth.reset_password.label") }}</h1>
        <p class="auth-form__subtitle">{{ $t("auth.reset_password.placeholder") }}</p>
        <el-form :model="form" :rules="rules" ref="resetPassForm" @submit.native.prevent="submitForm">
          <el-form-item prop="email">
            <el-input type="email" v-model="form.email" :placeholder="$t('placeholder.email')" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="form.password" :placeholder="$t('placeholder.new_password')" show-password />
          </el-form-item>
          <el-form-item prop="password_conformation">
            <el-input type="password" v-model="form.password_conformation" :placeholder="$t('placeholder.repeat_new_password')" show-password />
          </el-form-item>
          <el-button class="w-100 mt-1" type="info" @click="submitForm">
            {{ $t("action.submit") }}
          </el-button>
        </el-form>
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
  name: "ResetPasswordPage",
  layout: "auth",
  components: { AuthLayout },
  data() {
    const validatePassword2 = (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error(this.$t("errors.required").toString()));
      } else if (value !== this.form.password) {
        callback(new Error(this.$t("errors.passwords_not_match").toString()));
      } else {
        callback();
      }
    }

    return {
      pending: false,
      form: {
        email: "",
        token: "",
        password: "",
        password_conformation: ""
      },
      rules: {
        email: [
          { required: true, message: this.$t("errors.required"), trigger: "change" },
          { type: "email", message: this.$t("errors.not_email"), trigger: "blur" },
        ],
        password: [
          { required: true, message: this.$t("errors.required"), trigger: "change" },
          { min: 6, message: this.$t("errors.min_length", { count: 6 }), trigger: "change" },
        ],
        password_conformation: [{ validator: validatePassword2, trigger: "change" }],
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.resetPassForm.validate(async (isValid) => {
        if (!this.pending && isValid) {
          try {
            this.pending = true
            await this.$store.dispatch("user/resetPassword", this.form)
            await this.$router.push(this.localeRoute("auth-login"))
            this.$notify({
              customClass: "success",
              title: this.$t("messages.successfull_operation").toString(),
              message: this.$t("messages.password_successfully_updated").toString(),
            })
          } catch(error) {
            this.pending = false
          }
        }
      })
    }
  },
  mounted() {
    const { token } = this.$route.query
    this.form.token = token || ""
  }
};
</script>
