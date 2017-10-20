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
        </form>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters, mapState, mapMutations } = createNamespacedHelpers('checkout')

export default {
    computed: {
        ...mapState({
            cart: state => state.cart,
            customer_details: state => state.customer_details,
            shipping_details: state => state.shipping_details,
            courier: state => state.courier,
            form: state => state.form
        }),
        ...mapGetters([
            'getStepOne',
            'getStepTwo',
            'getStepThree',
            'getStepFour',
            'getStepFive'
        ])
    },
    mounted () {
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
            'setForm'
        ])
    }
}
</script>

<style>

</style>
