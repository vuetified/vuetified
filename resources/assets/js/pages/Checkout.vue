<template>
  <modal-layout>
    <!-- ToolBar Slot -->
    <v-toolbar class="accent" slot="toolbar">
    <v-btn flat icon color="primary" @click.native="redirectBack()">
        <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-toolbar-title class="text-xs-center primary--text">Checkout Order Form</v-toolbar-title>
    <v-spacer></v-spacer>
    </v-toolbar>
    <!-- Main Slot -->
    <v-stepper v-model="current_step" vertical>
    <!-- STEP 1 Label -->
    <v-stepper-step step="1" :complete="current_step > 1" :rules="[() => step_1_validated]">
        <span class="primary--text">Customer Details</span>
        <small class="info--text">Fill Up Customer Info</small>
    </v-stepper-step>
    <v-stepper-content step="1">
        <!-- Step 1 Component -->
        <customer-details></customer-details>
        <!-- Step 1 Buttons -->
        <v-btn color="primary" @click.native="stepHop(parseInt(2))">Continue</v-btn>
        <v-btn outline color="primary" @click.native="viewCart()">Update Cart</v-btn>
    </v-stepper-content>
    <!-- STEP 2 Label -->
    <v-stepper-step step="2" :complete="current_step > 2" :rules="[() => step_2_validated]">
        <span class="primary--text">Shipment Details</span>
        <small class="info--text">Fill Up Shipping Details</small>
    </v-stepper-step>
    <v-stepper-content step="2">
        <!-- Step 2 Component -->
        <shipping-details></shipping-details>
        <!-- Step 2 Buttons -->
        <v-btn color="primary" @click.native="stepHop(parseInt(3))">Continue</v-btn>
        <v-btn outline color="primary" @click.native="current_step = 1">Back</v-btn>
    </v-stepper-content>
    <!-- STEP 3 Label -->
    <v-stepper-step step="3" :complete="current_step > 3" :rules="[() => step_3_validated]">
        <span class="primary--text">Delivery Method</span>
        <small class="info--text">Choose Courier</small>
    </v-stepper-step>
    <v-stepper-content step="3">
        <!-- Step 3 Component -->
        <delivery-method></delivery-method>
        <!-- Step 3 Buttons -->
        <v-btn color="primary" @click.native="stepHop(parseInt(4))">Continue</v-btn>
        <v-btn outline color="primary" @click.native="current_step = 2">Back</v-btn>
    </v-stepper-content>
    <!-- STEP 4 Label -->
    <v-stepper-step step="4" :complete="current_step > 4" :rules="[() => step_4_validated]">
        <span class="primary--text">Mode of Payment</span>
        <small class="info--text">Select Payment Options</small>
    </v-stepper-step>
    <v-stepper-content step="4">
        <!-- Step 4 Component -->
        <mode-of-payment></mode-of-payment>
        <!-- Step 4 Buttons -->
        <v-btn color="primary" @click.native="stepHop(parseInt(5))">Continue</v-btn>
        <v-btn outline color="primary" @click.native="current_step = 3">Back</v-btn>
    </v-stepper-content>
    <!-- STEP 5 Label -->
    <v-stepper-step step="5" :complete="current_step > 5" :rules="[() => step_5_validated]">
        <span class="primary--text">Place Order</span>
        <small class="info--text">Send Mail</small>
    </v-stepper-step>
    <v-stepper-content step="5">
        <!-- Step 5 Component -->
        <order-details></order-details>
        <!-- Step 5 Buttons -->
        <v-btn color="primary" @click.native="stepHop(parseInt(6))">Submit</v-btn>
        <v-btn outline color="primary" @click.native="current_step = 4">Back</v-btn>
    </v-stepper-content>
    <!-- End Stepper -->
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
import SuccessOrder from '../components/checkout/success-order.vue'
import DeliveryMethod from '../components/checkout/delivery-method.vue'
import Theme from '../mixins/theme'

export default {
    mixins: [Theme],
    data: () => ({
        current_step: 1,
        footerClass: {'primary--text': true, 'accent': true},
        checkoutForm: new AppForm(App.forms.checkoutForm),
        step_1_validated: false,
        step_2_validated: false,
        step_3_validated: false,
        step_4_validated: false,
        step_5_validated: false
    }),
    components: {
        ModalLayout,
        OrderDetails,
        ShippingDetails,
        CustomerDetails,
        ModeOfPayment,
        SuccessOrder,
        DeliveryMethod
    },
    mounted () {
        let self = this
        Bus.$on('step_1_validated', () => {
            self.step_1_validated = true
        })
        Bus.$on('step_2_validated', () => {
            self.step_2_validated = true
        })
        Bus.$on('step_3_validated', (courier) => {
            console.log(courier)
            self.step_3_validated = true
        })
        Bus.$on('step_4_validated', (mop) => {
            console.log(mop)
            self.step_4_validated = true
        })
        Bus.$on('step_5_validated', () => {
            self.step_5_validated = true
        })
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
        },
        stepHop (step) {
            let self = this

            switch (step) {
            case 2:
                Bus.$emit('validate_step_1')
                if (self.step_1_validated) {
                    self.current_step = step
                }
                break
            case 3:
                Bus.$emit('validate_step_2')
                if (self.step_2_validated) {
                    self.current_step = step
                }
                break
            case 4:
                Bus.$emit('validate_step_3')
                if (self.step_3_validated) {
                    self.current_step = step
                }
                break
            case 5:
                Bus.$emit('validate_step_4')
                if (self.step_4_validated) {
                    self.current_step = step
                }
                break
            default:
                Bus.$emit('validate_step_5')
                if (self.step_5_validated) {
                    self.current_step = step
                    console.log('placed_order')
                }
                break
            }
        }
    }
}
</script>
<style scoped>
.stepper .stepper__step--inactive  .stepper__step__step {
    color: #BA9A5A;
}
</style>
