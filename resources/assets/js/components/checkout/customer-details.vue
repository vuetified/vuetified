<template>
<v-container fluid>
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
        <v-btn color="primary" @click.native="current_step = 2">Continue</v-btn>
        <v-btn outline color="primary" @click.native="viewCart()">Update Cart</v-btn>
        </form>
      </v-container>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('checkout')

export default {
    computed: {
        ...mapState({
            customer_details: state => state.customer_details
        }),
        current_step: {
            get () {
                return this.$store.getters['wizard/getCurrentStep']
            },
            set (value) {
                this.$store.commit('wizard/setCurrentStep', value)
            }
        }
    },
    mounted () {
        let self = this
        vm.$on('validate_step_1', () => {
            self.$validator.validateAll()
            if (!self.errors.any()) {
                vm.$emit('step_1_validated', true)
                self.setCustomerDetails(self.customer_details)
            } else {
                vm.$emit('step_1_validated', false)
            }
        })
    },
    methods: {
        ...mapMutations([
            'setCustomerDetails'
        ]),
        viewCart () {
            let self = this
            return self.$nextTick(() => self.$router.push({ name: 'cart' }))
        }
    }
}
</script>

<style>

</style>
