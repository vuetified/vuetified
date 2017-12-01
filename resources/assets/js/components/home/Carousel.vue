<template>
  <v-carousel icon="crop_square" class="primary--text">
        <v-carousel-item  v-for="(item,i) in images" :src="item.src" :key="i">
            <div class="caption text-xs-center">
            <h3 class="white--text"> <span style="background-color:#103050;opacity:0.75;">{{ item.headline }}</span></h3>
            <p class="white--text headline" ><span style="background-color:#607D8B;opacity:0.75;">{{ item.subheader }}</span></p>
            <v-btn class="primary white--text" @click.native.prevent="goToLink(item.buttonlink)">{{ item.buttontext }} <v-icon right dark>{{ item.icon }}</v-icon></v-btn>
            </div>
        </v-carousel-item>
    </v-carousel>
</template>

<script>
import Acl from '../../mixins/acl'
export default {
    mixins: [Acl],
    data: () => ({
        images: [
            {src: '/img/parallax1.jpg', headline: 'Amazing Organic Health Products', 'subheader': 'Choose From A Wide Variety of Health And Organic Products', 'buttontext': 'See All Products', 'buttonlink': '/products', 'icon': 'shopping_basket'},
            {src: '/img/parallax2.jpg', headline: 'Competetive Low Cost Foodcart Franchise', 'subheader': 'Start For As Low As P73,600  ONLY!', 'buttontext': 'Be A Franchisee Now!', 'buttonlink': '/categories/food-cart', 'icon': 'store_mall_directory'},
            {src: '/img/parallax3.jpg', headline: 'Want To Resell Our Product?', 'subheader': 'Why Not Get Paid For Referring New Consumer?', 'buttontext': 'Be A Reseller', 'buttonlink': '/register', 'icon': 'person_pin'},
            {src: '/img/parallax4.jpg', headline: 'Interested But Still Undecided?', 'subheader': 'Our Customer Service Is Open For Your Questions', 'buttontext': 'Contact Us', 'buttonlink': '/support', 'icon': 'textsms'}
        ]
    }),
    methods: {
        goToLink (link) {
            this.$router.push({ path: link })
        }
    },
    mounted () {
        let self = this
        if (self.isLoggedIn()) {
            self.images.forEach(image => {
                if (image.buttonlink === '/register') {
                    image.buttonlink = '/dashboard'
                }
            })
        }
    }
}
</script>

<style>

</style>
