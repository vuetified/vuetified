<template>
<modal-layout>
    <!-- Start ToolBar Slot -->
    <v-toolbar class="accent" slot="toolbar">
        <!-- Arrow Back -->
        <v-btn flat icon color="error" @click.native="home()">
            <v-icon>fa-times</v-icon>
        </v-btn>

        <v-spacer></v-spacer>
        <!-- Modal Title -->
        <v-toolbar-title class="text-xs-center primary--text">
            Checkout Order Form
        </v-toolbar-title>

        <v-spacer></v-spacer>

    </v-toolbar>
    <!-- End ToolBar Slot -->

    <!-- Start Content Slot -->
    <v-stepper v-model="current_step">

        <v-stepper-header>

            <template v-for="(step,key) in activeSteps">

                <v-stepper-step
                :key="key"
                :step="parseInt(key + 1)"
                :complete="current_step > ( key + 1 )"
                >
                    <span class="primary--text">{{ step.title }}</span>
                    <small class="info--text">{{ step.subtitle }}</small>
                </v-stepper-step>

                <v-divider :key="key" v-if="parseInt(key + 1) !== activeSteps.length">
                </v-divider>

            </template>

        </v-stepper-header>

        <v-stepper-content
            :step="parseInt(key + 1)"
            v-for="(step,key) in activeSteps"
            :key="key"
        >
            <v-card style="min-height: 600px;">
                <component :is="step.component">
                </component>
            </v-card>

        </v-stepper-content>

    </v-stepper>
    <!-- End Content Slot -->

    <!-- Start Footer Slot -->
    <v-footer :class="[footerClass]" fixed slot="footer">
    <v-spacer></v-spacer>
    <span>© {{ year }} {{ domain }} ® | {{ trademark }}™</span>
    <v-spacer></v-spacer>
    </v-footer>
    <!-- End Footer Slot -->

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
        steps: [
            {title: 'Customer Details', subtitle: 'Fill Up Customer Info', component: 'customer-details', active: true},
            {title: 'Delivery Method', subtitle: 'Choose Courier', component: 'delivery-method', active: true},
            {title: 'Shipment Details', subtitle: 'Fill Up Shipping Details', component: 'shipping-details', active: true},
            {title: 'Mode of Payment', subtitle: 'Select Payment Options', component: 'mode-of-payment', active: true},
            {title: 'Purchase', subtitle: 'Create Order', component: 'order-details', active: true}
        ],
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
        activeSteps () {
            return _.filter(this.steps, _.iteratee(['active', true]))
        },
        nodelivery () {
            let courier = this.$store.getters['checkout/getDeliveryMethod']
            let couriers = this.$store.getters['checkout/getCouriers']
            let pickup = _.filter(couriers, _.iteratee(['group', 'Pick Up Location']))
            let meetup = _.filter(couriers, _.iteratee(['group', 'Meet Up']))
            if (_.includes(pickup, courier) | _.includes(meetup, courier)) {
                return false
            } else {
                return true
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
        },
        home () {
            let self = this
            self.$router.push({path: '/'})
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
