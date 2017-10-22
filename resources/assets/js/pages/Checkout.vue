<template>
<modal-layout>
    <!-- Start ToolBar Slot -->
    <v-toolbar class="accent" slot="toolbar">
        <!-- Arrow Back -->
        <v-btn flat icon color="error" @click.native="redirectBack()">
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
    <v-stepper v-model="step">

        <v-stepper-header>

            <template v-for="(active,key) in getActiveSteps">

                <v-stepper-step
                :key="key"
                :step="parseInt(key + 1)"
                :complete="parseInt(step) > parseInt(key + 1)"
                :rules="[() => getActiveSteps[key].validated]"
                >
                    <span class="primary--text">{{ active.title }}</span>
                    <small class="info--text">{{ active.subtitle }}</small>
                </v-stepper-step>

                <v-divider :key="key" v-if="parseInt(key + 1) !== getActiveSteps.length">
                </v-divider>

            </template>

        </v-stepper-header>

        <v-stepper-content
            :step="parseInt(key + 1)"
            v-for="(active,key) in getActiveSteps"
            :key="key"
        >
            <v-card style="min-height: 600px;">
                <component :is="active.component">
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
        footerClass: {'primary--text': true, 'accent': true}
    }),
    computed: {
        ...mapGetters([
            'getActiveSteps',
            'getStep'
        ]),
        step: {
            get () {
                return this.getStep
            },
            set (value) {
                this.setStep(value)
            }
        }
    },
    methods: {
        ...mapMutations([
            'setStep',
            'setSteps'
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
    }
}
</script>
<style scoped>
.stepper .stepper__step--inactive  .stepper__step__step {
    color: #BA9A5A;
}
</style>
