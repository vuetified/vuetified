<template>
<v-container fluid>
        <form>
        <v-layout row>
          <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
              class="primary--text"
              name="address_1"
              label="Address 1"
              v-model="shipping_details.address_1"
              v-validate="'required|max:255'"
              data-vv-name="address_1"
              :error-messages="errors.collect('address_1')"
              prepend-icon="fa-address-book"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
              class="primary--text"
              name="address_2"
              label="Address 2"
              v-model="shipping_details.address_2"
              v-validate="'required|max:255'"
              data-vv-name="address_2"
              :error-messages="errors.collect('address_2')"
              prepend-icon="fa-address-book-o "
            ></v-text-field>
          </v-flex>

        </v-layout>
        <v-layout row>
            <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
              class="primary--text"
              name="city"
              label="City"
              v-model="shipping_details.city"
              v-validate="'required|max:255'"
              data-vv-name="city"
              :error-messages="errors.collect('city')"
              prepend-icon="location_city"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
              class="primary--text"
              name="country"
              label="Country"
              v-model="shipping_details.country"
              v-validate="'required|max:255'"
              data-vv-name="country"
              :error-messages="errors.collect('country')"
              prepend-icon="fa-fa"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
            class="primary--text"
            name="zip_code"
            label="Zip Code"
            v-model="shipping_details.zip_code"
            v-validate="'required'"
            data-vv-name="zip_code"
            :error-messages="errors.collect('zip_code')"
            prepend-icon="markunread_mailbox"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
            class="primary--text"
            name="state_province"
            label="State | Province"
            v-model="shipping_details.state_province"
            v-validate="'required'"
            data-vv-name="state_province"
            :error-messages="errors.collect('state_province')"
            prepend-icon="place"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-btn color="primary" @click.native="forward()">Continue</v-btn>
        <v-btn outline color="primary" @click.native="back()">Back</v-btn>
        </form>
      </v-container>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('checkout')

export default {
    computed: {
        ...mapState({
            shipping_details: state => state.shipping_details
        }),
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
        }
    },
    methods: {
        ...mapMutations([
            'setShippingDetails'
        ]),
        forward () {
            let self = this
            self.$validator.validateAll()
            self.setValidated()
            self.$store.dispatch('wizard/move', self.next)
            self.setShippingDetails(self.shipping_details)
        },
        back () {
            let self = this
            self.$validator.validateAll()
            self.setValidated()
            self.$store.dispatch('wizard/move', self.previous)
            self.setShippingDetails(self.shipping_details)
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
