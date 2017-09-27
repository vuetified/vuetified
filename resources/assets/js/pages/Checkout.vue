<template>
  <main-layout>
    <v-stepper v-model="current_step" vertical>
    <v-stepper-step step="1" :complete="current_step > 1">
      Verify Orders
      <small>Order Details</small>
    </v-stepper-step>
    <v-stepper-content step="1">
      <order-details></order-details>
      <v-btn primary @click.native="current_step = 2">Continue</v-btn>
      <v-btn flat @click.native="viewCart()">Update Cart</v-btn>
    </v-stepper-content>
    <v-stepper-step step="2" :complete="current_step > 2">Fill Up Shipping Details
      <small>Shipping Details</small>
    </v-stepper-step>
    <v-stepper-content step="2">
      <shipping-details></shipping-details>
      <v-btn primary @click.native="current_step = 3">Continue</v-btn>
      <v-btn flat @click.native="current_step = 1">Back</v-btn>
    </v-stepper-content>
    <v-stepper-step step="3" :complete="current_step > 3">Fill Up Personal Info
      <small>Your Account Details</small>
    </v-stepper-step>
    <v-stepper-content step="3">
      <customer-details></customer-details>
      <v-btn primary @click.native="current_step = 4">Continue</v-btn>
      <v-btn flat @click.native="current_step = 2">Back</v-btn>
    </v-stepper-content>
    <v-stepper-step step="4" :complete="current_step > 4">Select Payment Options
      <small>Mode of Payment</small>
    </v-stepper-step>
    <v-stepper-content step="4">
      <mode-of-payment></mode-of-payment>
      <v-btn primary @click.native="current_step = 5">Submit</v-btn>
      <v-btn flat @click.native="current_step = 3">Back</v-btn>
    </v-stepper-content>
    <v-stepper-step step="5" :complete="current_step > 5" :rules="checkEmail()">Check Your Email
      <small>Verify Your Email</small>
    </v-stepper-step>
    <v-stepper-content step="5">
      <verify-email></verify-email>
      <v-btn primary @click.native="current_step = 6">Submit</v-btn>
      <v-btn flat @click.native="current_step = 4">Back</v-btn>
    </v-stepper-content>
    <v-stepper-step step="6">Login To Your Account
      <small>Track Your Order Status</small>
    </v-stepper-step>
    <v-stepper-content step="6">
      <success-order></success-order>
      <v-btn primary @click="login()">Login</v-btn>
      <v-btn flat @click.native="current_step = 5">Shop More Item</v-btn>
    </v-stepper-content>
  </v-stepper>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import OrderDetails from '../components/checkout/order-details.vue'
import ShippingDetails from '../components/checkout/shipping-details.vue'
import CustomerDetails from '../components/checkout/customer-details.vue'
import ModeOfPayment from '../components/checkout/mode-of-payment.vue'
import VerifyEmail from '../components/checkout/verify-email.vue'
import SuccessOrder from '../components/checkout/success-order.vue'

export default {
    props: ['orders'],
    data: () => ({
        current_step: 0,
        checkoutForm: new AppForm(App.forms.checkoutForm)
    }),
    components: {
        MainLayout,
        OrderDetails,
        ShippingDetails,
        CustomerDetails,
        ModeOfPayment,
        VerifyEmail,
        SuccessOrder
    },
    methods: {
        verifyEmail () {
            self.current_step = 6
            console.log('Please Wait For Sending Payment', self.current_step)
        },
        viewCart () {
            let self = this
            return self.$nextTick(() => self.$router.push({ name: 'cart' }))
        },
        login () {
            let self = this
            console.log('Loggin In...')
            self.current_step = 1
        },
        checkEmail () {
            return [() => true]
        }
    }
}
</script>
