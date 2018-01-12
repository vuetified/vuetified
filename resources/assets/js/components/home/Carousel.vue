<template>
  <v-carousel 
    icon="crop_square" 
    class="primary--text"
  >
    <v-carousel-item 
      v-for="(item,i) in images" 
      :src="item.src" 
      :key="i"
    >
      <div class="headline text-xs-center">
        <h3 
          class="white--text" 
          v-if="item.headline"
        > 
        <span >{{ item.headline }}</span></h3>
        <p 
          class="white--text title"
          v-if="item.subheader" 
        ><span >{{ item.subheader }}</span></p>
        <v-btn 
          class="primary white--text" 
          @click.native.prevent="goToLink(item.buttonlink)"
          v-if="item.buttontext"
        >
          {{ item.buttontext }} 
          <v-icon 
            right 
            dark
          >{{ item.icon }}</v-icon>
        </v-btn>
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
            {src: '/img/checkoutprocess.jpg', headline: 'Easy Shopping Experience', subheader: 'So Many Ways To Pay, Credit Card, Online Payment, Bank Deposit and COD', 'buttontext': 'Shop Now', 'buttonlink': '/products', 'icon': 'fa-shopping-bag '},
            {src: '/img/parallax4.jpg', headline: 'Interested But Still Undecided?', 'subheader': 'Our Customer Service Is Open For Your Questions', 'buttontext': 'Contact Us', 'buttonlink': '/support', 'icon': 'textsms'}
        ]
    }),
    mounted () {
        let self = this
        if (self.isLoggedIn()) {
            self.images.forEach(image => {
                if (image.buttonlink === '/register') {
                    image.buttonlink = '/dashboard'
                }
            })
        }
    },
    methods: {
        goToLink (link) {
            this.$router.push({ path: link })
        }
    }
    
}
</script>

<style>

</style>
