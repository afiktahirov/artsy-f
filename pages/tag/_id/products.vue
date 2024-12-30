<template>
    <div>
        <page-header :title="tags.title">
            <breadcrumbs :items="tags" />
        </page-header>
        <div class="page-body">
            <div class="container">

                <el-row :gutter="20">

                    <el-col :span="24" :xl="18">
                        <template v-if="!products.length">
                            <el-empty :description="$t('placeholder.no_data_to_show')" />
                        </template>

                        <template v-else>
                            <enhanced-row type="flex" :gutter="20">
                                <template v-for="product in products">
                                    <el-col :xl="8" :lg="6" :md="8" :span="12" :key="product.id">
                                        <product-card :product="product" />
                                    </el-col>
                                </template>
                            </enhanced-row>
                        </template>
                    </el-col>
                    <!-- col (products) -->
                </el-row>

                <recently-viewed />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import EnhancedRow from "@/components/EnhancedRow";
import PageHeader from "@/components/PageHeader";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageInfo from "@/components/PageInfo";
import ProductCard from "@/components/ProductCard";
import FiltersGroup from "@/components/Pages/Category/FiltersGroup";
import RecentlyViewed from "@/components/RecentlyViewed";
import Pagination from "@/components/Pagination";
import ArrowsIcon from "@/components/Icons/arrows-vertical";
import FilterIcon from "@/components/Icons/filter";

export default {
    name: "TagProductsPage",
    components: {
        EnhancedRow,
        PageHeader,
        Breadcrumbs,
        PageInfo,
        ProductCard,
        FiltersGroup,
        RecentlyViewed,
        Pagination,
        ArrowsIcon,
        FilterIcon
    },
    data() {
        return {
            filters: {
                tagIds: null,
            }
        }
    },
    computed: {
        ...mapState({
            loading: ({ products }) => products.loading,
            pagination: ({ products }) => products.asyncData.meta
        }),
        ...mapGetters({
            tags: "products/getTag",
            products: "products/getFilterTags"
        })
    },
    mounted() {
        console.log(this.tags)
    },
    watch: {
        "$route.query"(query) {
            const paramsId = this.$route.params.id;

            Promise.all([
                this.$store.dispatch("products/fetchTag", params.id),
                this.$store.dispatch("products/fetchTagsByTagId", paramsId),
            ]).then(() => {
                this.$scrollTo("#root");
            })
        }
    },
    methods: {
        handleChange() {
            this.$router.push({
                query: {
                    ...this.$mapObjectToQuery({
                        ...this.$route.query,
                        ...this.filters
                    }),
                }
            })
        },
    },
    async asyncData({ store, query, params }) {
        await Promise.all([
            store.dispatch("products/fetchTag", params.id),
            store.dispatch("products/fetchRecentlyViewed"),
            store.dispatch("products/fetchTagsByTagId", params.id),
        ])
    }
}
</script>