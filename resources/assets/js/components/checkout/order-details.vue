<template>
  <form @submit.prevent="checkout()">
        <v-layout row>
          <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
              class="primary--text"
              name="first_name"
              label="First Name"
              v-model="customer_details.first_name"
              v-validate="'required|max:255'"
              data-vv-name="first_name"
              :error-messages="errors.collect('first_name')"
              prepend-icon="fa-user"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
              class="primary--text"
              name="last_name"
              label="Last Name"
              v-model="customer_details.last_name"
              v-validate="'required|max:255'"
              data-vv-name="last_name"
              :error-messages="errors.collect('last_name')"
              prepend-icon="fa-user"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
              class="primary--text"
              name="email"
              label="Email"
              v-model="customer_details.email"
              v-validate="'required|email'"
              data-vv-name="email"
              :error-messages="errors.collect('email')"
              prepend-icon="email"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
            class="primary--text"
            name="contact_no"
            label="Contact No."
            v-model="customer_details.contact_no"
            v-validate="'required|numeric'"
            data-vv-name="contact_no"
            :error-messages="errors.collect('contact_no')"
            prepend-icon="fa-phone"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-btn :loading="checkOutForm.busy" :disabled="errors.any()"  type="submit" :class="{primary: !checkOutForm.busy, error: checkOutForm.busy}"  @click.native="submit()">Submit</v-btn>
        <v-btn outline color="primary" @click.native="back()">Back</v-btn>
        </form>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('checkout')

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
        }
    },
    methods: {
        ...mapActions([
            'checkout'
        ]),
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
