<template>
  <el-form v-loading="pending" class="upgrade-plan-form">
    <el-alert
      effect="dark"
      type="warning"
      class="mb-6"
      :closable="false"
      :title="$t('upgrade_plan.alert')"
    />

    <el-form-item :label="$t('upgrade_plan.extension')">
      <template v-for="pg in packages">
        <el-radio v-model="form.packageId" :label="pg.id">{{ $t("upgrade_plan.days_count", { count: pg.days }) }} / {{ pg.price }} ₼</el-radio>
      </template>
    </el-form-item>
    <el-form-item :label="$t('upgrade_plan.payment_method')">
      <el-radio v-model="form.method" label="card">{{ $t("upgrade_plan.bank_card") }}</el-radio>
    </el-form-item>

    <el-button class="w-100 mt-4" type="info" :disabled="!form.packageId" @click="onSubmit">
      {{ $t("action.purchase") }}
    </el-button>
  </el-form>
</template>

<script>
export default {
  name: "UpgradePlanForm",
  props: {
    packages: {
      type: Array,
      default: () => ([])
    },
  },
  data() {
    return {
      pending: false,
      form: {
        packageId: 0,
        method: "card",
      }
    }
  },
  methods: {
    async onSubmit() {
      try {
        this.pending = true
        const res = await this.$store.dispatch("profile/makeProductVip", {
          productId: this.$route.params.id,
          packageId: this.form.packageId
        })
        window.location = res.data.redirectUrl
      } catch (error) {
        this.pending = false
      }
    }
  }
}
</script>

<style lang="scss">
@import "upgrade-plan-form";
</style>
