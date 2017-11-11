<template>
<v-container fluid class="pa-0 ma-0" :class="[contentClass]">
    <v-layout row wrap>
    <v-flex xs12 sm12 md3 lg3 xl3>
        <v-subheader class="headline primary--text">Featured Products</v-subheader>
        <v-list dense :class="[contentClass]">
        <v-link title="Grape juice with Garcinia Cambogia" :href="'/products/grape-juice-with-garcinia-cambogia'"></v-link>
        <v-link title="Organic Pure Barley Powered Drink" :href="'/products/organic-pure-barley-powdered-drink'"></v-link>
        <v-link title="Coffee Mix with Glutathione" :href="'/products/coffee-mix-with-glutathione'"></v-link>
        <v-link title="Choco Barley Powered Drink" :href="'/products/choco-barley-powdered-drink'"></v-link>
        <v-link title="Organic Pure Barley Capsules" :href="'/products/organic-pure-barley-capsules'"></v-link>
        <v-link title="Organic Pure Barley Powdered Drink" :href="'/products/organic-pure-barley-powdered-drink'"></v-link>
        </v-list>
    </v-flex>
    <v-flex xs12 sm12 md3 lg3 xl3>
        <v-subheader class="headline primary--text">Featured Food Carts</v-subheader>
        <v-list dense :class="[contentClass]">
        <v-link title="Mang Siomai" :href="'/products/mang-siomai'"></v-link>
        <v-link title="Hongkong Fried Noodles" :href="'/products/hongkong-fried-noodles'"></v-link>
        <v-link title="Dumpling King" :href="'/products/dumpling-king'"></v-link>
        <v-link title="Chinky Pao" :href="'/products/chinky-pao'"></v-link>
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
        social_links: App.sponsor.social_links
    }),
    components: {
        VLink
    },
    methods: {
        toProperCase (key) {
            let newStr = key.replace(/_/g, ' ')
            return newStr.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
        }
    }

}
</script>

<style>

</style>
