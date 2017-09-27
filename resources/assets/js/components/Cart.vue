<template>
    <modal name="cart-modal" :adaptive="true" width="100%" height="100%" :clickToClose="false">
        <v-card :flat="true">
        <v-toolbar class="accent">
          <v-btn icon @click.native="redirectBack()">
            <v-icon class="primary--text">arrow_back</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-title class="text-xs-center primary--text">Shopping Cart</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
              <!-- If There is no User Account Login Yet Redirect to Authentication Page -->
            <v-btn class="success--text" flat @click.native="checkout()" v-if="orders.length > 0">Checkout<v-icon right dark>payment</v-icon></v-btn>
            <v-btn class="warning--text" flat @click.native="redirectBack()" v-else>Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <basket :orders="orders"></basket>
      </v-card>
    </modal>
</template>

<script>
import Basket from './Basket.vue'
export default {
    data: () => ({
        orders: [
            []
        ]
        // item name
        // item no.
        // item price
        // item qty
        // shipping fix rate
    }),
    computed: {

        isDark () {
            return this.dark === true
        }
    },
    components: {
        Basket
    },
    // when add to cart event is triggered
    // add one item on the cart
    // toggle on the dialog to true
    // update the cart qty , price, 
    mounted () {
        let self = this
        self.$modal.show('cart-modal')
        Bus.$on('close-cart', () => {
            self.redirectBack()
        })
    },
    methods: {
        exceedOrderLimit () {
            return this.orders.length > 999
        },
        redirectBack () {
            let self = this
            return self.$nextTick(() => self.$router.go(-1))
        },
        checkout () {
            let self = this
            return self.$nextTick(() => self.$router.push({ name: 'checkout' }))
            // show shipping details page , for non auth users.
            // verify in the server for express checkout the email.
            // if registered email then 
        }
    }
}
</script>

<style lang="scss" scoped>
.shopping-cart {
    position:absolute;
    right:15px;
    top:20px;
}
</style>
