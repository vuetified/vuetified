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
    </v-stepper-content>
    <!-- STEP 2 Label -->
    <v-stepper-step step="2" :complete="current_step > 2" :rules="[() => step_2_validated]">
        <span class="primary--text">Shipment Details</span>
        <small class="info--text">Fill Up Shipping Details</small>
    </v-stepper-step>
    <v-stepper-content step="2">
        <!-- Step 2 Component -->
        <shipping-details></shipping-details>
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
    </v-stepper-content>
    <!-- STEP 5 Label -->
    <v-stepper-step step="5" :complete="current_step > 5" :rules="[() => step_5_validated]">
        <span class="primary--text">Place Order</span>
        <small class="info--text">Send Mail</small>
    </v-stepper-step>
    <v-stepper-content step="5">
        <!-- Step 5 Component -->
        <order-details></order-details>
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
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('wizard')

export default {
    mixins: [Theme],
    components: {
        ModalLayout,
        OrderDetails,
        ShippingDetails,
        CustomerDetails,
        ModeOfPayment,
        SuccessOrder,
        DeliveryMethod
    },
    data: () => ({
        footerClass: {'primary--text': true, 'accent': true}
    }),
    computed: {
        ...mapGetters([
            'getCurrentStep',
            'getStepOne',
            'getStepTwo',
            'getStepThree',
            'getStepFour',
            'getStepFive'
        ]),
        current_step: {
            get () {
                return this.getCurrentStep
            },
            set (value) {
                this.setCurrentStep(value)
            }
        },
        step_1_validated: {
            get () {
                return this.getStepOne
            },
            set (value) {
                this.setStepOne(value)
            }
        },
        step_2_validated: {
            get () {
                return this.getStepTwo
            },
            set (value) {
                this.setStepTwo(value)
            }
        },
        step_3_validated: {
            get () {
                return this.getStepThree
            },
            set (value) {
                this.setStepThree(value)
            }
        },
        step_4_validated: {
            get () {
                return this.getStepFour
            },
            set (value) {
                this.setStepFour(value)
            }
        },
        step_5_validated: {
            get () {
                return this.getStepFive
            },
            set (value) {
                this.setStepFive(value)
            }
        }
    },

    methods: {
        ...mapMutations([
            'setCurrentStep',
            'setStepOne',
            'setStepTwo',
            'setStepThree',
            'setStepFour',
            'setStepFive'
        ]),
        redirectBack () {
            let self = this
            self.$router.push({path: '/cart'})
        }

    },
    mounted () {
        let self = this
        /* redirect if no Item in the Cart */
        if (self.$store.getters['cart/getCount'] === 0) {
            self.$router.push({path: '/'})
        }
        vm.$on('step_1_validated', (payload) => {
            self.step_1_validated = payload
        })
        vm.$on('step_2_validated', (payload) => {
            self.step_2_validated = payload
        })
        vm.$on('step_3_validated', (payload) => {
            self.step_3_validated = payload
        })
        vm.$on('step_4_validated', (payload) => {
            self.step_4_validated = payload
        })
        vm.$on('step_5_validated', (payload) => {
            self.step_5_validated = payload
        })
    }
}
</script>
<style scoped>
.stepper .stepper__step--inactive  .stepper__step__step {
    color: #BA9A5A;
}
</style>
