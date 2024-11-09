<template>
  <div class="upload-avatar">
    <block-title>{{ $t("upload_avatar.title") }}</block-title>
    <block-subtitle>{{ $t("upload_avatar.subtitle") }}</block-subtitle>

    <div class="upload-avatar__preview d-flex justify-center align-center">
      <button
        class="trigger-upload-avatar d-flex align-center justify-center"
        @click="triggerUploadAvatar"
        type="button"
      >
        <camera-icon />
      </button>

      <el-image :src="imagePreview" alt="Merchant avatar">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
    </div>

    <input accept="image/*" @change="handleChange" type="file" ref="avatar" hidden>
  </div>
</template>

<script>
import BlockTitle from "@/components/BlockTitle";
import BlockSubtitle from "@/components/BlockSubtitle";
import CameraIcon from "@/components/Icons/camera";

export default {
  name: "UploadAvatar",
  components: { BlockTitle, BlockSubtitle, CameraIcon },
  data() {
    return {
      imagePreview: null,
      maxFileSize: 1000000,
    }
  },
  methods: {
    triggerUploadAvatar() {
      this.$refs.avatar.click();
    },

    handleChange() {
      const file_input = this.$refs.avatar;

      if (file_input.files[0]) {
        // Size validation
        const file_size = file_input.files[0].size;

        if (file_size >= this.maxFileSize) {
          // this.$toast.error(this.$t("file_max_1mb"));
          file_input.value = "";
          return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
          this.imagePreview = e.target.result;
          // TODO: emit action
        }

        reader.readAsDataURL(file_input.files[0]);
      }
    },
  }
}
</script>

<style lang="scss">
@import "upload-avatar";
</style>
