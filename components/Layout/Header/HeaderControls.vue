<template>
  <ul class="header-controls">
    <li class="header-controls__item">
      <el-dropdown trigger="click">
        <button>
          <globe-icon />
        </button>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="locale in $i18n.localeCodes" :key="locale">
            <a :href="switchLocalePath(locale)">{{ locale.toUpperCase() }}</a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </li>
    <li class="header-controls__item">
      <el-badge :value="pagination.total || 0">
        <nuxt-link class="header-controls__link d-inline-flex" :to="$localePath('favourites')">
          <heart-icon />
        </nuxt-link>
      </el-badge>
    </li>
    <li class="header-controls__item">
      <template v-if="!$auth.loggedIn">
        <nuxt-link class="header-controls__link d-inline-flex" :to="$localePath('auth-login')">
          <profile-icon />
        </nuxt-link>
      </template>
      <template v-else>
        <user-dropdown />
      </template>
    </li>
  </ul>
</template>

<script>
import { mapState } from "vuex";
import UserDropdown from "@/components/Layout/UserDropdown";
import GlobeIcon from "@/components/Icons/globe.vue";
import HeartIcon from "@/components/Icons/heart.vue";
import ProfileIcon from "@/components/Icons/user-profile.vue";

export default {
  name: "HeaderControls",
  components: { UserDropdown, GlobeIcon, HeartIcon, ProfileIcon },
  computed: {
    ...mapState({
      pagination: ({ favourites }) => favourites.asyncData.meta || {}
    })
  }
}
</script>
