import { mapState, mapGetters } from "vuex";

export default {
  props: {
    product: {
      type: Object,
      default: () => ({
        id: "0",
        status: "moderation",
        image: "/images/products/3.png",
        title: "Products title Products title Products title Products title Products title Products title",
        description: "Products description Products description Products description Products description Products description Products description",
        price: 100.99,
        price_with_discount: 120.99,
        discount: 0,
        rating: 4,
        ratings_count: 775,
        is_wish: false,
        is_top_seller: false,
        owner: {
          full_name: "Owner full name",
          avatar: "",
          phone: "+994 50 550 50 50",
        },
      })
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state.favourites.loading
    }),
    ...mapGetters({
      favourites: 'favourites/getFavourites'
    }),
    isFavourite() {
      return this.favourites.some(product => product.id === this.product.id)
    },
    productStatus() {
      switch (this.product.status) {
        case "active":
          return {
            title: this.$t("show_by.active"),
            view: "success"
          }
        case "disabled":
          return {
            title: this.$t("show_by.disabled"),
            view: "danger"
          }
        default:
          return {
            title: this.$t("show_by.on_moderation"),
            view: ""
          }
      }
    }
  },
  methods: {
    async addToFavourites(productId) {
      this.$nuxt.$loading.start();
      try {
        await this.$store.dispatch("favourites/add", productId)
        this.$notify({
          customClass: "success",
          title: this.$t("messages.successfull_operation").toString(),
          message: this.$t("messages.product_added_to_wishlist").toString(),
        })
      } catch (error) {}
    },

    async removeFromFavourites(productId) {
      this.$nuxt.$loading.start();
      try {
        await this.$store.dispatch("favourites/delete", productId)
        this.$notify({
          customClass: "success",
          title: this.$t("messages.successfull_operation").toString(),
          message: this.$t("messages.product_removed_from_wishlist").toString(),
        })
      } catch (error) {}
    }
  }
}
