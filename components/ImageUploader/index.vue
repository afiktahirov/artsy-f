<template>
  <div class="image-uploader">
    <h3 class="image-uploader__title">{{ $t("image_uploader.title") }}</h3>
    <p class="image-uploader__subtitle">{{ $t("image_uploader.subtitle") }}</p>

    <div class="image-uploader__grid scrollable-x d-flex" :style="`--grid-size: ${100 / maxCount}%`">
      <div
        :key="`trigger-${index}`"
        v-for="(image, index) in images"
        class="image-uploader__grid-item"
      >
        <div class="image-uploader__preview">
          <el-image :src="image" fit="cover" />
          <div class="image-uploader__preview-actions d-flex align-center justify-center">
            <button type="button" @click="deleteFile(index)">
              <trash-icon />
            </button>
          </div>
        </div>
      </div>

      <div
        :key="`preview-${index}`"
        class="image-uploader__grid-item"
        v-for="(_, index) in Array(maxCount).splice(images.length)"
      >
        <button
          type="button"
          @click="triggerUploadFile"
          class="image-uploader__trigger"
        >
          <upload-icon />
        </button>
      </div>
    </div>

    <el-dialog
      append-to-body
      @closed="resetCropper"
      :visible.sync="cropperVisible"
      class="image-uploader__cropper-dialog"
    >
      <vue-cropper v-if="selectedFile" :src="selectedFile" ref="cropper" :aspect-ratio="1" />
      <div slot="footer">
        <el-button type="info" size="medium" @click="handleCrop">
          {{ $t("action.save") }}
        </el-button>
      </div>
    </el-dialog>

    <input accept="image/*" @change="handleChange" type="file" ref="file" hidden>
  </div>
</template>

<script>
import UploadIcon from "@/components/Icons/upload-cloud";
import TrashIcon from "@/components/Icons/trash";

export default {
  name: "ImageUploader",
  components: { UploadIcon, TrashIcon },
  props: {
    maxCount: {
      type: Number,
      default: 4
    },
    uploadedImages: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedFile: null,
      cropperVisible: false,
      images: [...this.uploadedImages]
    }
  },
  methods: {
    handleChange() {
      const file = this.$refs.file.files[0]

      if (!file) return
      if (!this.$isValidFileSize(file)) return

      const reader = new FileReader()
      reader.onload = (e) => {
        this.cropperVisible = true
        this.selectedFile = e.target.result
      }
      reader.readAsDataURL(file)
    },

    triggerUploadFile() {
      this.$refs.file.click()
    },

    deleteFile(index) {
      this.$refs.file.value = ""
      this.images.splice(index, 1)
      this.$emit("change", this.images)
    },

    resetCropper() {
      this.selectedFile = null
      this.cropperVisible = false
    },

    handleCrop() {
      this.resetCropper()
      this.images.push(this.$refs.cropper.getCroppedCanvas().toDataURL())
      this.$emit("change", this.images)
    }
  }
}
</script>

<style lang="scss">
@import "image-uploader";
</style>
