<template>
<div>
    <v-layout row>
          <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
              class="primary--text"
              label="Total Price"
              v-model="subtotal"
              readonly
              prepend-icon="fa-shopping-bag"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row v-if="tax > 0">
          <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
              class="primary--text"
              label="Tax"
              v-model="tax"
              readonly
              prepend-icon="fa-percent"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row v-if="courier.details.rate > 0">
            <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
              class="primary--text"
              label="Shipping Fee"
              :value="courier.details.rate"
              readonly
              prepend-icon="local_shipping"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
              class="primary--text"
              label="Total Amount"
              :value="total_amount"
              readonly
              prepend-icon="fa-money"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-btn v-if="getModeOfPayment.slug ==='paypal'" @click.native="paypalcallback()" :loading="checkOutForm.busy" :disabled="errors.any()"  :class="{primary: !checkOutForm.busy, error: checkOutForm.busy}">Pay Via Paypal <v-icon right dark>fa-paypal</v-icon></v-btn>
        <v-btn v-else-if="getModeOfPayment.slug ==='bitcoin'" @click.native="bitcoincallback()" :loading="checkOutForm.busy" :disabled="errors.any()"  :class="{primary: !checkOutForm.busy, error: checkOutForm.busy}">Pay Via Bitcoin <v-icon right dark>fa-btc</v-icon></v-btn>
        <v-btn v-else-if="getModeOfPayment.slug ==='credit-card'" @click.native="stripecallback()" :loading="checkOutForm.busy" :disabled="errors.any()"  :class="{primary: !checkOutForm.busy, error: checkOutForm.busy}">Pay Via Stripe <v-icon right dark>fa-cc-stripe</v-icon></v-btn>
        <v-btn v-else @click.native="submit()" :loading="checkOutForm.busy" :disabled="errors.any()"  :class="{primary: !checkOutForm.busy, error: checkOutForm.busy}">Submit <v-icon right dark>send</v-icon></v-btn>
        <v-btn :disabled="errors.any()" outline color="primary" @click.native="back()">Back</v-btn>
</div>

</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState, mapGetters } = createNamespacedHelpers('checkout')

export default {
    data: () => ({
        checkOutForm: new AppForm(App.forms.checkOutForm)
    }),
    computed: {
        ...mapState({
            customer_details: state => state.customer_details,
            shipping_details: state => state.shipping_details,
            courier: state => state.courier,
            mop: state => state.mop
        }),
        ...mapGetters([
            'getModeOfPayment'
        ]),
        items: {
            get () {
                return this.$store.getters['cart/getItems']
            },
            set (value) {
                this.$store.commit('cart/setItems', value)
            }
        },
        subtotal: {
            get () {
                return this.$store.getters['cart/getSubTotal']
            },
            set (value) {
                this.$store.commit('cart/setSubTotal', value)
            }
        },
        tax: {
            get () {
                return this.$store.getters['cart/getTax']
            },
            set (value) {
                this.$store.commit('cart/setTax', value)
            }
        },
        total: {
            get () {
                return this.$store.getters['cart/getTotal']
            },
            set (value) {
                this.$store.commit('cart/setTotal', value)
            }
        },
        current: {
            get () {
                return this.$store.getters['wizard/getCurrent']
            },
            set (value) {
                this.$store.commit('wizard/setCurrent', value)
            }
        },
        step: {
            get () {
                return this.$store.getters['wizard/getStep']
            },
            set (value) {
                this.$store.commit('wizard/setStep', value)
            }
        },

        next: {
            get () {
                return this.$store.getters['wizard/getNext']
            },
            set (value) {
                this.$store.commit('wizard/setNext', value)
            }
        },
        previous: {
            get () {
                return this.$store.getters['wizard/getPrevious']
            },
            set (value) {
                this.$store.commit('wizard/setPrevious', value)
            }
        },
        steps () {
            return this.$store.getters['wizard/getActiveSteps']
        },
        total_amount () {
            let total = parseFloat(this.total)
            let fee = parseFloat(this.courier.details.rate)
            return (total + fee).toFixed(2)
        }
    },
    methods: {
        ...mapActions([
            'checkout'
        ]),
        paypalcallback () {
            console.log('paying with paypal')
        },
        bitcoincallback () {
            console.log('paying with bitcoin')
        },
        stripecallback () {
            console.log('paying with stripe')
        },
        submit () {
            let self = this
            // set Customer Details
            if (_.find(self.steps, { 'component': 'customer-details', 'active': true }) !== undefined) {
                self.checkOutForm.customer_details = self.customer_details
            }
            // set Delivery Method
            if (_.find(self.steps, { 'component': 'delivery-method', 'active': true }) !== undefined) {
                self.checkOutForm.courier = self.courier
            }
            // set Shipping Details
            if (_.find(self.steps, { 'component': 'shipping-details', 'active': true }) !== undefined) {
                self.checkOutForm.shipping_details = self.shipping_details
            } else {
                // No Shipment
                delete self.checkOutForm.shipping_details
                delete self.checkOutForm.shipping_fee
            }
            if (_.find(self.steps, { 'component': 'mode-of-payment', 'active': true }) !== undefined) {
                self.checkOutForm.mop = self.mop
            }
            // set Cart
            self.checkOutForm.cart.items = self.items
            self.checkOutForm.cart.subtotal = self.subtotal
            self.checkOutForm.cart.tax = self.tax
            self.checkOutForm.cart.total = self.total
            // check if all active steps are validated
            let count = self.steps.length
            let validated = _.filter(self.steps, { 'validated': true }).length
            // Usual Error is if any of the step is not validated form object is not new up
            if (count === validated) {
                self.checkout(self.checkOutForm)
                // empty cart
                this.$store.dispatch('cart/resetCart')
                // reset wizard
                this.$store.dispatch('wizard/resetWizard')
                // reset checkout is already inside dispatch checkout
                self.$router.push({name: 'home'})
            } else {
                // if by chance not all steps are validated , show an error message
                self.$popup({ message: 'Checkout Form Has An Error', backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
            }
        },

        back () {
            let self = this
            self.$validator.validateAll()
            self.setValidated()
            self.$store.dispatch('wizard/move', self.previous)
        },
        setValidated () {
            if (!this.errors.any()) {
                this.current.validated = true
            } else {
                this.current.validated = false
            }
            this.$store.commit('wizard/setStepValidated', this.current)
        }
    }
}
</script>

<style>

</style>
