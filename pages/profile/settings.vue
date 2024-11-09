<template>
  <section class="page merchant-settings-page">
    <merchant-card :details="$auth.user" />

    <div class="page-body">
      <div class="container">
        <profile-nav />

        <el-row :gutter="20">
          <el-col :span="24">
            <block-title>{{ $t("profile.connected_accounts") }}</block-title>
          </el-col>
          <!-- <el-col :md="8" :sm="12">
            <social-chip :label="$t('social_chip.connect_with', { type: 'Apple' })" social-type="apple" :attached="$auth.user.has_apple">
              <apple-icon slot="icon" />
            </social-chip>
          </el-col> -->
          <el-col :sm="12">
            <social-chip :label="$t('social_chip.connect_with', { type: 'Google' })" social-type="google" :attached="$auth.user.has_google">
              <google-icon slot="icon" />
            </social-chip>
          </el-col>
          <el-col :sm="12">
            <social-chip :label="$t('social_chip.connect_with', { type: 'Facebook' })" social-type="facebook" :attached="$auth.user.has_facebook">
              <facebook-icon slot="icon" />
            </social-chip>
          </el-col>
        </el-row>

        <el-divider />

        <el-row>
          <el-col :md="8" :sm="12">
            <block-title>{{ $t("profile.change_password") }}</block-title>

            <el-form ref="settingsForm" :model="form" :rules="rules">
              <el-form-item prop="current_password">
                <el-input
                  show-password
                  type="password"
                  v-model="form.current_password"
                  :placeholder="$t('placeholder.current_password')"
                />
              </el-form-item>

              <el-form-item prop="password">
                <el-input
                  show-password
                  type="password"
                  v-model="form.password"
                  :placeholder="$t('placeholder.new_password')"
                />
              </el-form-item>

              <el-button class="w-100" type="info" @click="submitForm">
                {{ $t("action.change") }}
              </el-button>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- page body -->
  </section>
</template>

<script>
import MerchantCard from "@/components/MerchantCard";
import ProfileNav from "@/components/Pages/Profile/Nav";
import BlockTitle from "@/components/BlockTitle";
import SocialChip from "@/components/Pages/Profile/SocialChip";

import AppleIcon from "@/components/Icons/auth-apple";
import GoogleIcon from "@/components/Icons/auth-google";
import FacebookIcon from "@/components/Icons/auth-facebook.vue";

export default {
  name: "ProfileSettings",
  middleware: ["auth"],
  components: { BlockTitle, MerchantCard, ProfileNav, SocialChip, AppleIcon, GoogleIcon, FacebookIcon },
  data() {
    return {
      pending: false,
      form: {
        current_password: "",
        password: "",
        id: this.$auth.user.id,
        avatar: null,
        cover: null,
        name: this.$auth.user.name,
        email: this.$auth.user.email,
        phone: this.$auth.user.phone,
        address: this.$auth.user.address,
        description: this.$auth.user.description
      },
      rules: {
        current_password: [
          { required: true, message: this.$t("errors.required"), trigger: "change" },
          { min: 6, message: this.$t("errors.min_length", { count: 6 }).toString(), trigger: "change" },
        ],
        password: [
          { required: true, message: this.$t("errors.required"), trigger: "change" },
          { min: 6, message: this.$t("errors.min_length", { count: 6 }).toString(), trigger: "change" },
        ],
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.settingsForm.validate(async (isValid) => {
        if (!this.pending && isValid) {
          try {
            this.pending = true;
            await this.$store.dispatch("user/updateDetails", this.form)
            this.$notify({
              customClass: "success",
              title: this.$t("messages.successfull_operation").toString(),
              message: this.$t("messages.details_successfully_updated").toString(),
            })
          } catch(error) {
            this.pending = false;
          }
        }
      })
    }
  }
}
</script>
