<template>
  <modal-layout>
    <v-toolbar 
      class="accent" 
      slot="toolbar"
    >
      <v-btn 
        flat 
        icon 
        color="white" 
        @click.native="redirectBack()"
      >
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-spacer/>
      <v-toolbar-title class="text-xs-center white--text">Shopping Cart</v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items>
        <!-- If There is no User Account Login Yet Redirect to Authentication Page -->
        <v-btn 
          color="white" 
          flat 
          @click.native="checkout()" 
          v-if="count > 0"
        >
          Checkout
          <v-icon right>payment</v-icon>
        </v-btn>
        <v-btn 
          flat 
          color="white" 
          @click.native="close()" 
          v-else
        >
          Close
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <basket/>
    <check-out-dialog/>
  </modal-layout>
</template>
<script>
import ModalLayout from '../layouts/ModalLayout'
import Basket from './Basket.vue'
import CheckOutDialog from '../components/cart/CheckOutDialog'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('cart')

export default {
    components: {
        ModalLayout,
        Basket,
        CheckOutDialog
    },
    data: () => ({
        count: 0
    }),
    computed: {
        ...mapGetters({
            getCount: 'getCount'
        }),
        isDark () {
            return this.dark === true
        }
    },
    head: {
        title: function () {
            return {
                inner: 'Cart',
                separator: '-',
                complement: App.site.trademark
            }
        },
        // Meta tags
        meta: [
            { name: 'application-name', content: App.site.trademark },
            { name: 'description', content: App.site.description, id: 'desc' }, // id to replace intead of create element
            // Facebook / Open Graph
            { property: 'fb:app_id', content: App.site.fb_id },
            { property: 'og:title', content: App.site.title },
            { property: 'og:type', content: 'website' },
            { property: 'og:image', content: App.site.logo.url },
            { property: 'og:description', content: App.site.description },
            { property: 'og:site_name', content: App.site.trademark },
            { property: 'og:locale', content: 'en_US' },
            { property: 'article:author', content: App.site.trademark }
        ],
        // link tags
        link: [
            { rel: 'canonical', href: window.location.href, id: 'canonical' }
        ]
        
        
    },
    watch: {
        getCount (newValue) {
            let self = this
            self.count = newValue
        }
    },
    mounted () {
        let self = this
        self.count = self.getCount
    },
    methods: {
        redirectBack () {
            let self = this
            self.$router.push({path: self.$store.state.route.from.fullPath})
        },
        close () {
            let self = this
            self.$router.push({path: '/'})
        },
        checkout () {
            Bus.$emit('check-out-dialog')
        }
    }
}
</script>
