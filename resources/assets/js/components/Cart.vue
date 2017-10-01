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
            <v-btn class="success--text" flat @click.native="checkout()" v-if="cart.items.length > 0">Checkout<v-icon right dark>payment</v-icon></v-btn>
            <v-btn class="warning--text" flat @click.native="redirectBack()" v-else>Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <basket :cart="cart"></basket>
      </v-card>
    </modal>
</template>

<script>
import Basket from './Basket.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters, mapMutations } = createNamespacedHelpers('cart')

export default {
    data: () => ({
        cart: {
            items: [],
            tax: 0,
            subtotal: 0,
            total: 0,
            count: 0
        }
    }),
    computed: {
        ...mapGetters({
            getItems: 'getItems',
            getTax: 'getTax',
            getSubTotal: 'getSubTotal',
            getTotal: 'getTotal',
            getCount: 'getCount'
        }),
        isDark () {
            return this.dark === true
        }
    },
    components: {
        Basket
    },
    mounted () {
        let self = this
        self.cart = {
            items: Object.values(self.getItems),
            tax: self.getTax,
            subtotal: self.getSubTotal,
            total: self.getTotal,
            count: self.getCount
        }
        self.$modal.show('cart-modal')
        Bus.$on('close-cart', () => {
            self.redirectBack()
        })
    },
    methods: {
        ...mapActions({
            addItem: 'addItem',
            removeItem: 'removeItem',
            destroyCart: 'destroyCart',
            updateItem: 'updateItem'
        }),
        ...mapMutations({
            setItems: 'setItems',
            setTax: 'setTax',
            setSubTotal: 'setSubTotal',
            setTotal: 'setTotal',
            newCartForm: 'newForm'
        }),
        exceedOrderLimit () {
            return this.cart.items.length > 999
        },
        redirectBack () {
            let self = this
            self.$router.push({path: self.$store.state.route.from.fullPath})
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
