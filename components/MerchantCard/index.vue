<template>
  <div class="merchant-card">
    <div class="merchant-card__top">
      <div class="merchant-card__cover">
        <template v-if="files.cover">
          <el-image :src="files.cover" :alt="details.name" fit="cover" />
        </template>
        <template v-else>
          <el-image src="/images/merchant-default-cover.jpg" :alt="details.name" fit="cover" />
        </template>
      </div>

      <div class="container d-flex align-flex-end justify-space-between">
        <div class="merchant-card__avatar d-flex justify-center align-center">
          <template v-if="editable">
            <button class="trigger-upload-avatar d-flex align-center justify-center" @click="triggerUploadAvatar">
              <camera-icon />
            </button>
          </template>

          <el-image :src="files.avatar" :alt="details.name" fit="contain">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>

        <template v-if="editable">
          <button class="trigger-upload-cover d-flex align-center justify-center" @click="triggerUploadCover">
            <camera-icon />
          </button>
        </template>
      </div>
    </div>
    <!-- merchant card top -->

    <div class="merchant-card__bottom">
      <div class="container d-flex flex-wrap justify-space-between">
        <div class="merchant-card__bottom-left">
          <div class="merchant-card__name">{{ details.name }}</div>
          <div class="merchant-card__rating">
            <client-only>
              <star-rating
                :rating="details.rating"
                :star-size="16"
                :increment="0.3"
                :read-only="true"
                active-color="#000000"
              />
            </client-only>
          </div>
        </div>

        <div class="merchant-card__bottom-right">
          <div class="merchant-card__description">
            <p>{{ details.description }}</p>
          </div>
          <ul class="merchant-card__tags">
            <li class="merchant-card__tags-item">
              <el-tooltip content="Icon descrpition" :visible-arrow="false">
                <img src="/images/icons/trophy.svg" alt="Icon description">
              </el-tooltip>
            </li>
            <li class="merchant-card__tags-item">
              <el-tooltip content="Icon descrpition" :visible-arrow="false">
                <img src="/images/icons/building.svg" alt="Icon description">
              </el-tooltip>
            </li>
            <li class="merchant-card__tags-item">
              <el-tooltip content="Icon descrpition" :visible-arrow="false">
                <img src="/images/icons/airplay.svg" alt="Icon description">
              </el-tooltip>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- merchant card bottom -->

    <template v-if="editable">
      <input accept="image/*" @change="handleCoverInputChange" type="file" ref="cover" hidden>
      <input accept="image/*" @change="handleAvatarInputChange" type="file" ref="avatar" hidden>
    </template>
  </div>
</template>

<script>
import CameraIcon from "@/components/Icons/camera";

export default {
  name: "MerchantCard",
  components: { CameraIcon },
  props: {
    details: {
      type: Object,
      default: () => ({
        name: "",
        email: "",
        phone: "",
        address: "",
        description: "",
        avatar: null,
        cover: null,
        rating: 0
      })
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      files: {
        cover: this.details.cover || null,
        avatar: this.details.avatar || null,
      }
    }
  },
  methods: {
    triggerUploadCover() {
      this.$refs.cover.click()
    },

    triggerUploadAvatar() {
      this.$refs.avatar.click()
    },

    handleCoverInputChange() {
      const file = this.$refs.cover.files[0]
      if (!this.$isValidFileSize(file)) return
      this.handleSelectFile(file, "cover")
    },

    handleAvatarInputChange() {
      const file = this.$refs.avatar.files[0];
      if (!this.$isValidFileSize(file)) return
      this.handleSelectFile(file, "avatar")
    },

    handleSelectFile(file, name) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.files[name] = e.target.result;
        this.$emit(`${name}-change`, this.files[name])
      }
      reader.readAsDataURL(file)
    },
  }
}
</script>

<style lang="scss">
@import "merchant-card";
</style>
