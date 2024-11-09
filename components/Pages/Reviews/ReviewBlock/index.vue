<template>
  <div class="review-block">
    <div class="review-block__author-date d-flex justify-space-between">
      <div class="review-block__author-rating">
        <p class="review-block__author">Review Author</p>
        <div class="review-block__rating d-flex align-items">
          <client-only>
            <star-rating
              :rating="4.5"
              :star-size="14"
              :increment="0.3"
              :read-only="true"
              active-color="#000000"
            />
          </client-only>
          <!-- TODO: image -->
        </div>
      </div>
      <span class="review-block__date">05.06.22</span>
    </div>
    <!-- author / date -->

    <div class="review-block__content">
      <div class="review-block__text">
        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
        <p>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
      </div>

      <div class="review-block__images">
        <div class="review-block__image">
          <el-image :src="images[0]" :preview-src-list="images" class="d-inline-flex align-center justify-center" fit="cover">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
        <div class="review-block__image">
          <el-image :src="images[1]" :preview-src-list="images" class="d-inline-flex align-center justify-center" fit="cover">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
        <div class="review-block__image">
          <el-image :src="images[2]" :preview-src-list="images" class="d-inline-flex align-center justify-center" fit="cover">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
      </div>
    </div>
    <!-- content -->
  </div>
</template>

<script>
import format from "date-fns/format";

export default {
  name: "ReviewBlock",
  props: {
    review: {
      type: Object,
      default: () => ({
        id: null,
        body: "",
        rating: 0,
        images: [],
        created_at: null,
        product_id: null,
        customer: {
          id: null,
          name: ""
        }
      })
    }
  },
  data() {
    return {
      images: [
        "/images/product-gallery/0.jpg",
        "/images/product-gallery/1.jpg",
        "/images/product-gallery/2.jpg"
      ]
    }
  },
  computed: {
    formattedDate() {
      // return format(new Date(this.review.created_at), "dd.mm.yy")
    }
  }
}
</script>

<style lang="scss">
@import "review-block.scss";
</style>
