<template>
  <section class="page merchant-info-page">
    <merchant-card
      editable
      :details="$auth.user"
      @cover-change="handleFileChange($event, 'cover')"
      @avatar-change="handleFileChange($event, 'avatar')"
    />

    <div class="page-body">
      <div class="container">
        <profile-nav />

        <el-row>
          <el-col :lg="16">
            <el-form :model="form" :rules="rules" ref="personalInfoForm" @keyup.native.enter="submitForm">
              <block-title>{{ $t("profile.about_me") }}</block-title>

              <el-row :gutter="20">
                <el-col :sm="12">
                  <el-form-item>
                    <floating-label :value="form.name" :label="$t('placeholder.username')">
                      <el-input :value="form.name" readonly />
                    </floating-label>
                  </el-form-item>
                </el-col>
                <el-col :sm="12">
                  <el-form-item prop="phone">
                    <floating-label :value="form.phone" :label="$t('placeholder.phone_number')">
                      <el-input v-model="form.phone" v-mask="'(###)-###-##-##'" />
                    </floating-label>
                  </el-form-item>
                </el-col>
                <!-- <el-col :sm="12">
                  <el-form-item prop="category">
                    <floating-label :value="form.category" :label="$t('placeholder.shop_category')">
                      <el-input v-model="form.category" />
                    </floating-label>
                  </el-form-item>
                </el-col> -->
                <el-col :sm="12">
                  <el-form-item prop="address">
                    <floating-label :value="form.address" :label="$t('placeholder.address')">
                      <el-input v-model="form.address" />
                    </floating-label>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item prop="description">
                    <floating-label :value="form.description" :label="$t('placeholder.short_info')">
                      <el-input
                        :rows="5"
                        type="textarea"
                        maxlength="200"
                        show-word-limit
                        v-model="form.description"
                      />
                    </floating-label>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-divider />

              <el-row>
                <el-col :sm="12">
                  <upload-avatar />
                  <el-button class="w-100" type="info" @click="submitForm">
                    {{ $t("action.save_changes") }}
                  </el-button>
                </el-col>
              </el-row>
            </el-form>
            <!-- form -->
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- page body -->
  </section>
</template>

<script>
import MerchantCard from "@/components/MerchantCard";
import FloatingLabel from "@/components/FloatingLabel";
import ProfileNav from "@/components/Pages/Profile/Nav";
import BlockTitle from "@/components/BlockTitle";
import UploadAvatar from "@/components/Pages/Profile/UploadAvatar";
import InfoIcon from "@/components/Icons/info-circle";

export default {
  name: "ProfileInfo",
  middleware: ["auth"],
  components: { MerchantCard, FloatingLabel, ProfileNav, BlockTitle, UploadAvatar, InfoIcon },
  data() {
    return {
      pending: false,
      form: {
        name: "",
        email: "",
        phone: "",
        address: "",
        description: "",
        avatar: "",
        cover: "",
      },
      rules: {
        name: [{ required: true, message: this.$t("errors.required"), trigger: "blur" }],
        email: [
          { required: true, message: this.$t("errors.required"), trigger: "blur" },
          { type: "email", message: this.$t("errors.not_email"), trigger: "blur" },
        ],
        phone: [{ required: true, message: this.$t("errors.required"), trigger: "blur" }],
        // category: [{ required: true, message: this.$t("errors.required"), trigger: "blur" }],
        address: [{ required: true, message: this.$t("errors.required"), trigger: "blur" }],
        description: [{ required: true, message: this.$t("errors.required"), trigger: "blur" }],
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.personalInfoForm.validate(async (isValid) => {
        if (!this.pending && isValid) {
          try {
            this.pending = true
            await this.$store.dispatch("user/updateDetails", this.form)
            this.$notify({
              customClass: "success",
              title: this.$t("messages.successfull_operation").toString(),
              message: this.$t("messages.details_successfully_updated").toString(),
            })
          } catch(error) {
            this.pending = false
          }
        }
      })
    },

    handleFileChange(file, field) {
      this.form[field] = file
    },
  },
  mounted() {
    this.form = { ...this.$auth.user }
  }
}
</script>
