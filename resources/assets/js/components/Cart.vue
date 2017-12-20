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
          color="success" 
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
  </modal-layout>
</template>
<script>
import ModalLayout from '../layouts/ModalLayout'
import Basket from './Basket.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('cart')

export default {
    components: {
        ModalLayout,
        Basket
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
            let self = this
            return self.$nextTick(() => self.$router.push({ name: 'checkout' }))
        }
    }
}
</script>
