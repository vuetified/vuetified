<template>
  <form>
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
        <v-btn color="primary" @click.native="current_step = 1">Submit</v-btn>
        <v-btn outline color="primary" @click.native="current_step = 4">Back</v-btn>
        </form>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters, mapState, mapMutations } = createNamespacedHelpers('checkout')

export default {
    data: () => ({
        checkoutForm: new AppForm(App.forms.checkoutForm)
    }),
    computed: {
        ...mapState({
            customer_details: state => state.customer_details,
            shipping_details: state => state.shipping_details,
            courier: state => state.courier,
            mop: state => state.mop
        }),
        cartItems: {
            get () {
                return this.$store.getters['cart/getItems']
            },
            set (value) {
                this.$store.commit('cart/setItems', value)
            }
        },
        cartSubTotal: {
            get () {
                return this.$store.getters['cart/getSubTotal']
            },
            set (value) {
                this.$store.commit('cart/setSubTotal', value)
            }
        },
        cartTax: {
            get () {
                return this.$store.getters['cart/getTax']
            },
            set (value) {
                this.$store.commit('cart/setTax', value)
            }
        },
        cartTotal: {
            get () {
                return this.$store.getters['cart/getTotal']
            },
            set (value) {
                this.$store.commit('cart/setTotal', value)
            }
        },
        current_step: {
            get () {
                return this.$store.getters['wizard/getCurrentStep']
            },
            set (value) {
                this.$store.commit('wizard/setCurrentStep', value)
            }
        }
    },
    methods: {
        ...mapActions([
            'checkout'
        ]),
        ...mapMutations([
            'setShippingDetails',
            'setCustomerDetails',
            'setModeOfPayment',
            'setDeliveryMethod',
            'newForm',
            'setForm',
            'setCouriers',
            'setGateways'
        ])
    }
}
</script>

<style>

</style>
