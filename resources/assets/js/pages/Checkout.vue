<template>
  <modal-layout>
    <!-- ToolBar Slot -->
    <v-toolbar class="accent" slot="toolbar">
    <v-btn icon @click.native="redirectBack()">
        <v-icon class="primary--text">arrow_back</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-toolbar-title class="text-xs-center primary--text">Checkout Order Form</v-toolbar-title>
    <v-spacer></v-spacer>
    </v-toolbar>
    <!-- Main Slot -->
    <v-stepper v-model="current_step" vertical>
    <!-- STEP 1 Label -->
    <v-stepper-step step="1" :complete="current_step > 1">
        <span class="primary--text">Customer Details</span>
        <small class="info--text">Fill Up Customer Info</small>
    </v-stepper-step>
    <v-stepper-content step="1">
        <!-- Step 1 Component -->
        <customer-details :form="checkoutForm"></customer-details>
        <!-- Step 1 Buttons -->
        <v-btn primary @click.native="current_step = 2">Continue</v-btn>
        <v-btn outline color="primary" class="primary--text" @click.native="viewCart()">Update Cart</v-btn>
    </v-stepper-content>
    <!-- STEP 2 Label -->
    <v-stepper-step step="2" :complete="current_step > 2">
        <span class="primary--text">Shipment Details</span>
        <small class="info--text">Fill Up Shipping Details</small>
    </v-stepper-step>
    <v-stepper-content step="2">
        <!-- Step 2 Component -->
        <shipping-details :form="checkoutForm"></shipping-details>
        <!-- Step 2 Buttons -->
        <v-btn primary @click.native="current_step = 3">Continue</v-btn>
        <v-btn outline color="primary" class="primary--text" @click.native="current_step = 1">Back</v-btn>
    </v-stepper-content>
    <!-- STEP 3 Label -->
    <v-stepper-step step="3" :complete="current_step > 3">
        <span class="primary--text">Mode of Payment</span>
        <small class="info--text">Select Payment Options</small>
    </v-stepper-step>
    <v-stepper-content step="3">
        <!-- Step 3 Component -->
        <mode-of-payment :form="checkoutForm"></mode-of-payment>
        <!-- Step 3 Buttons -->
        <v-btn primary @click.native="current_step = 4">Continue</v-btn>
        <v-btn outline color="primary" class="primary--text" @click.native="current_step = 2">Back</v-btn>
    </v-stepper-content>
    <!-- STEP 4 Label -->
    <v-stepper-step step="4" :complete="current_step > 4">
        <span class="primary--text">Purchase</span>
        <small class="info--text">Verify Order Details</small>
    </v-stepper-step>
    <v-stepper-content step="4">
        <!-- Step 4 Component -->
        <mode-of-payment :form="checkoutForm"></mode-of-payment>
        <!-- Step 4 Buttons -->
        <v-btn primary @click.native="purchase()">Submit</v-btn>
        <v-btn outline color="primary" class="primary--text" @click.native="current_step = 3">Back</v-btn>
    </v-stepper-content>
    </v-stepper>
    <!-- Footer Slot -->
    <v-footer :class="[footerClass]" fixed slot="footer">
    <v-spacer></v-spacer>
    <span>© {{ year }} {{ domain }} ® | {{ trademark }}™</span>
    <v-spacer></v-spacer>
    </v-footer>
  </modal-layout>
</template>

<script>
import ModalLayout from '../layouts/ModalLayout.vue'
import OrderDetails from '../components/checkout/order-details.vue'
import ShippingDetails from '../components/checkout/shipping-details.vue'
import CustomerDetails from '../components/checkout/customer-details.vue'
import ModeOfPayment from '../components/checkout/mode-of-payment.vue'
import VerifyEmail from '../components/checkout/verify-email.vue'
import SuccessOrder from '../components/checkout/success-order.vue'
import Theme from '../mixins/theme'

export default {
    mixins: [Theme],
    props: ['orders'],
    data: () => ({
        current_step: 0,
        footerClass: {'primary--text': true, 'accent': true},
        checkoutForm: new AppForm(App.forms.checkoutForm)
    }),
    components: {
        ModalLayout,
        OrderDetails,
        ShippingDetails,
        CustomerDetails,
        ModeOfPayment,
        VerifyEmail,
        SuccessOrder
    },
    methods: {
        redirectBack () {
            let self = this
            self.$router.push({path: '/cart'})
        },
        purchase () {
            console.log('making purchase')
        },
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
<style scoped>
.stepper .stepper__step--inactive  .stepper__step__step {
    color: #BA9A5A;
}
</style>
