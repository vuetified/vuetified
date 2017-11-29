<template>
<v-container fluid class="pa-0 ma-0" :class="[contentClass]">
    <v-layout row wrap>
    <v-flex xs12 sm12 md3 lg3 xl3>
        <v-subheader class="headline primary--text">Featured Products</v-subheader>
        <v-list dense :class="[contentClass]">
        <v-link v-for="(product,key) in products" :key="key" :title="toProperCase(product.name)" :href="`/products/${product.slug}`"></v-link>
        </v-list>
    </v-flex>
    <v-flex xs12 sm12 md3 lg3 xl3>
        <v-subheader class="headline primary--text">Featured Food Carts</v-subheader>
        <v-list dense :class="[contentClass]">
        <v-link v-for="(foodcart,key) in foodcarts" :key="key" :title="toProperCase(foodcart.name)" :href="`/products/${foodcart.slug}`"></v-link>
        </v-list>
    </v-flex>
    <v-flex xs12 sm12 md3 lg3 xl3>
        <v-subheader class="headline primary--text">Social Media</v-subheader>
        <v-list dense :class="[contentClass]">
        <v-link
        v-for="(value,key,index) in social_links" :key="key" :index="index"
        :title="toProperCase(key)" :href="value"
        >
        </v-link>
        </v-list>
    </v-flex>
    <v-flex xs12 sm12 md3 lg3 xl3>
    <v-subheader class="headline primary--text">Contact Details</v-subheader>
    <v-list class="accent">
        <v-list-tile v-for="(value,key,index) in contact_details" :key="key" :index="index">
            <v-list-tile-content>
            <v-list-tile-title class="caption">{{ toProperCase(key) }}: {{ toProperCase(value) }}</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
    </v-flex>
    </v-layout>
</v-container>

</template>

<script>
import VLink from '../components/VLink.vue'
export default {
    data: () => ({
        contentClass: {'accent': true},
        contact_details: App.sponsor.contact_details,
        social_links: App.sponsor.social_links,
        products: [],
        foodcarts: []
    }),
    components: {
        VLink
    },
    mounted () {
        this.getFoodCart()
        this.getSupplements()
    },
    methods: {
        toProperCase (key) {
            let newStr = key.replace(/_/g, ' ')
            return newStr.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
        },
        getFoodCart () {
            let self = this
            axios.get(route('api.product.getFeaturedProducts', {slug: 'food-cart'})).then((response) => {
                self.foodcarts = response.data
            })
        },
        getSupplements () {
            let self = this
            axios.get(route('api.product.getFeaturedProducts', {slug: 'supplements'})).then((response) => {
                self.products = response.data
            })
        }
    }

}
</script>

<style>

</style>
