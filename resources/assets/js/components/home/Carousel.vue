<template>
  <v-carousel icon="crop_square" class="primary--text">
        <v-carousel-item  v-for="(item,i) in images" :src="item.src" :key="i">
            <div class="caption text-xs-center">
            <h3 class="white--text"> {{ item.headline }}</h3>
            <h5 class="white--text" >{{ item.subheader }}</h5>
            <v-btn class="primary white--text" @click.native.prevent="goToLink(item.buttonlink)">{{ item.buttontext }} <v-icon right dark>{{ item.icon }}</v-icon></v-btn>
            </div>
        </v-carousel-item>
    </v-carousel>
</template>

<script>
export default {
    data: () => ({
        images: [
            {src: '/img/parallax1.jpg', headline: 'Amazing Organic Health Products', 'subheader': 'Choose From A Wide Variety of Health And Organic Products', 'buttontext': 'See All Products', 'buttonlink': '/products', 'icon': 'shopping_basket'},
            {src: '/img/parallax2.jpg', headline: 'Competetive Low Cost Foodcart Franchise', 'subheader': 'Start For As Low As P16,888 ONLY!', 'buttontext': 'Be A Franchisee Now!', 'buttonlink': '/categories/food-cart', 'icon': 'store_mall_directory'},
            {src: '/img/parallax3.jpg', headline: 'Want To Resell Our Product?', 'subheader': 'Why Not Get Paid For Referring New Consumer?', 'buttontext': 'Be A Reseller', 'buttonlink': '/register', 'icon': 'person_pin'},
            {src: '/img/parallax4.jpg', headline: 'Interested But Still Undecided?', 'subheader': 'Our Customer Service Is Open For Your Questions', 'buttontext': 'Contact Us', 'buttonlink': '/support', 'icon': 'textsms'}
        ]
    }),
    methods: {
        goToLink (link) {
            this.$router.push({ path: link })
        }
    }
}
</script>

<style>

</style>
