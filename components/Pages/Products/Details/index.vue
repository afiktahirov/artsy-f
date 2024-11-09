<template>
  <div class="product-details" v-if="details.title">
    <ul class="product-details__params scrollable-x">
      <li class="product-details__param">
        <calendar-icon />
        {{ formattedDate }}
      </li>
      <li class="product-details__param">
        <eye-icon />
        {{ details.views_count }}
      </li>
      <template v-if="!profileView || details.status === 'active'">
        <li class="product-details__param">
          <el-dropdown trigger="click">
            <button class="d-flex align-center">
              <share-icon />
              {{ $t("product_details.share") }}
            </button>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <share-network
                  network="facebook"
                  :title="details.title"
                  :media="details.images[0]"
                  :url="`https://artsy.com/products/${details.id}`"
                >
                  Facebook
                </share-network>
              </el-dropdown-item>
              <el-dropdown-item>
                <share-network
                  network="twitter"
                  :title="details.title"
                  :media="details.images[0]"
                  :url="`https://artsy.com/products/${details.id}`"
                >
                  Twitter
                </share-network>
              </el-dropdown-item>
              <el-dropdown-item>
                <share-network
                  network="whatsapp"
                  :title="details.title"
                  :media="details.images[0]"
                  :url="`https://artsy.com/products/${details.id}`"
                >
                  Whatsapp
                </share-network>
              </el-dropdown-item>
              <el-dropdown-item>
                <share-network
                  network="telegram"
                  :title="details.title"
                  :media="details.images[0]"
                  :url="`https://artsy.com/products/${details.id}`"
                >
                  Telegram
                </share-network>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </template>
    </ul>

    <el-divider />

    <div class="product-details__info">
      <h2 class="product-details__title">{{ details.title }}</h2>
      <div class="product-details__rating d-flex align-items">
        <client-only>
          <star-rating
            :rating="details.rating"
            :star-size="14"
            :increment="0.3"
            :read-only="true"
            :show-rating="false"
            active-color="#000000"
          />
          <span class="product-details__rating-count">({{ details.ratings_count }})</span>
        </client-only>
      </div>
      <div class="product-details__description">
        <p>{{ details.description }}</p>
      </div>
      <div class="product-details__price d-flex align-center">
        <template v-if="details.price_with_discount">
          <span class="current">{{ details.price_with_discount }} ₼</span>
          <span class="old">{{ details.price }} ₼</span>
        </template>
        <template v-else>
          <span class="current">{{ details.price }} ₼</span>
        </template>
      </div>

      <div class="product-details__tag" v-if="details.is_preorder">{{ $t("product_form.required_preorder") }}</div>
    </div>

    <el-divider />

    <template v-if="details.status === 'disabled'">
      <div class="product-details__actions d-flex flex-wrap">
        <button class="product-details__actions-item d-flex align-center">
          <img src="/images/icons/clock.svg" alt="Clock icon">
          {{ $t("action.restore") }}
        </button>
        <button class="product-details__actions-item d-flex align-center" @click="triggerMakeVip">
          <img src="/images/icons/diamond.svg" alt="Diamond icon">
          {{ $t("action.make_vip") }}
        </button>
      </div>
    </template>
    <template v-else>
      <div class="product-details__seller-info d-flex flex-wrap align-flex-start">
        <seller-phone :phone="details.owner.phone" />
        <seller-badge :image="details.owner.avatar" :name="details.owner.name" />
      </div>
    </template>
  </div>
</template>

<script>
import format from "date-fns/format";
import { az, ru, enGB } from "date-fns/locale";
import SellerPhone from "@/components/SellerPhone";
import SellerBadge from "@/components/SellerBadge";
import ReceiptIcon from "@/components/Icons/receipt";
import CalendarIcon from "@/components/Icons/calendar";
import EyeIcon from "@/components/Icons/eye";
import ShareIcon from "@/components/Icons/share";

export default {
  name: "ProductDetails",
  components: { SellerPhone, SellerBadge, ReceiptIcon, CalendarIcon, EyeIcon, ShareIcon },
  props: {
    details: {
      type: Object,
      required: true
    },
    profileView: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    formattedDate() {
      let locale = ru;

      switch (this.$i18n.locale) {
        case "az":
          locale = az;
          break;
        case "en":
          locale = enGB;
          break;
      }

      return format(new Date(this.details.published_at), "dd MMMM yyyy", { locale })
    }
  },
  methods: {
    triggerMakeVip() {
      this.$emit("on-upgrade-plan")
    }
  }
}
</script>

<style lang="scss">
@import "product-details";
</style>
