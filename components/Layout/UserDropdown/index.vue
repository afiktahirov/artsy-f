<template>
  <el-dropdown trigger="click">
    <button>
      <profile-icon />
    </button>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>
        <nuxt-link :to="$localePath('profile-products-create')">
          <plus-icon />
          {{ $t("user_dropdown.add_product") }}
        </nuxt-link>
      </el-dropdown-item>
      <el-dropdown-item>
        <nuxt-link :to="$localePath('profile-products')">
          <trophy-icon />
          {{ $t("user_dropdown.my_products") }}
        </nuxt-link>
      </el-dropdown-item>
      <el-dropdown-item>
        <nuxt-link :to="$localePath('profile-info')">
          <building-icon />
          {{ $t("user_dropdown.personal_info") }}
        </nuxt-link>
      </el-dropdown-item>
      <el-dropdown-item>
        <nuxt-link :to="$localePath('profile-payments')">
          <airplay-icon />
          {{ $t("user_dropdown.payments") }}
        </nuxt-link>
      </el-dropdown-item>
      <el-dropdown-item>
        <nuxt-link :to="$localePath('profile-settings')">
          <building-icon />
          {{ $t("user_dropdown.settings") }}
        </nuxt-link>
      </el-dropdown-item>
      <el-dropdown-item divided>
        <p @click="$auth.logout()">
          <building-icon />
          {{ $t("user_dropdown.logout") }}
        </p>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import ProfileIcon from "@/components/Icons/user-profile";
import PlusIcon from "@/components/Icons/plus";
import TrophyIcon from "@/components/Icons/trophy";
import BuildingIcon from "@/components/Icons/building";
import AirplayIcon from "@/components/Icons/airplay";

export default {
  name: "UserDropdown",
  components: { ProfileIcon, PlusIcon, TrophyIcon, BuildingIcon, AirplayIcon }
}
</script>
