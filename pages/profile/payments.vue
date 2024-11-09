<template>
  <section class="page" v-loading.fullscreen="loading">
    <merchant-card :details="$auth.user" />

    <div class="page-body">
      <div class="container" id="scroll-target">
        <profile-nav />

        <block-title>{{ $t("profile.latest_transactions") }}</block-title>

        <el-table :data="transactions" stripe>
          <el-table-column label="№" type="index" />
          <el-table-column prop="product_name" :label="$t('payments_table.product_name')" />
          <el-table-column prop="type" :label="$t('payments_table.type')" />
          <el-table-column prop="status" :label="$t('payments_table.status')" />
          <el-table-column prop="created_at" :label="$t('payments_table.date')" :formatter="dateFormatter" />
          <el-table-column prop="amount" align="right" :label="$t('payments_table.amount')" :formatter="amountFormatter" />
        </el-table>

        <pagination
          v-if="pagination.total > 15"
          :total="pagination.total"
          @page-change="handlePageChange"
          @size-change="handleSizeChange"
          :current-page="pagination.current_page"
        />
      </div>
    </div>
    <!-- page body -->
  </section>
</template>

<script>
import format from "date-fns/format";
import { mapState, mapGetters } from "vuex";
import MerchantCard from "@/components/MerchantCard";
import ProfileNav from "@/components/Pages/Profile/Nav";
import BlockTitle from "@/components/BlockTitle";
import Pagination from "@/components/Pagination";

export default {
  name: "ProfilePayments",
  middleware: ["auth"],
  components: { MerchantCard, ProfileNav, BlockTitle, Pagination },
  data() {
    return {
      filters: {
        page: 1,
        perPage: null,
      },
    }
  },
  computed: {
    ...mapState({
      loading: ({ profile }) => profile.loading,
      pagination: ({ profile }) => profile.transactions.meta || {}
    }),
    ...mapGetters({
      transactions: "profile/getTransactions"
    }),
  },
  watch: {
    "$route.query"(query) {
      this.$store.dispatch("profile/fetchTransactions", query)
        .then(() => {
          this.$scrollTo("#scroll-target");
        })
    }
  },
  methods: {
    handleChange() {
      this.$router.push({
        query: {
          ...this.$mapObjectToQuery({
            ...this.$route.query,
            ...this.filters,
          }),
        }
      })
    },

    handleSizeChange(size) {
      this.filters.perPage = size
      this.handleChange()
    },

    handlePageChange(page) {
      this.filters.page = page
      this.handleChange()
    },

    dateFormatter(row) {
      return format(new Date(row.created_at), "dd.MM.yyyy / hh:ss")
    },

    amountFormatter(row) {
      return `${row.amount} ₼`
    }
  },
  mounted() {
    this.filters = { ...this.filters, ...this.$route.query }
  },
  async asyncData({ store }) {
    await store.dispatch('profile/fetchTransactions')
  }
}
</script>
