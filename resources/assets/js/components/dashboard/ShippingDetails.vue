<template>
<v-container fluid>
    <form>
        <v-layout row>
          <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
              class="primary--text"
              name="address_1"
              label="Address 1"
              v-model="addressForm.shipping_details.address_1"
              v-validate="'required|max:255'"
              data-vv-name="address_1"
              :error-messages="errors.collect('address_1')"
              prepend-icon="fa-address-book"
              :light="true"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
              class="primary--text"
              name="address_2"
              label="Address 2"
              v-model="addressForm.shipping_details.address_2"
              v-validate="'required|max:255'"
              data-vv-name="address_2"
              :error-messages="errors.collect('address_2')"
              prepend-icon="fa-address-book-o"
              :light="true"
            ></v-text-field>
          </v-flex>

        </v-layout>
        <v-layout row>
            <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
              class="primary--text"
              name="city"
              label="City"
              v-model="addressForm.shipping_details.city"
              v-validate="'required|max:255'"
              data-vv-name="city"
              :error-messages="errors.collect('city')"
              prepend-icon="location_city"
              :light="true"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
              class="primary--text"
              name="country"
              label="Country"
              v-model="addressForm.shipping_details.country"
              v-validate="'required|max:255'"
              data-vv-name="country"
              :error-messages="errors.collect('country')"
              prepend-icon="fa-fa"
              :light="true"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
            class="primary--text"
            name="zip_code"
            label="Zip Code"
            v-model="addressForm.shipping_details.zip_code"
            v-validate="'required'"
            data-vv-name="zip_code"
            :error-messages="errors.collect('zip_code')"
            prepend-icon="markunread_mailbox"
            :light="true"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
            class="primary--text"
            name="state_province"
            label="State | Province"
            v-model="addressForm.shipping_details.state_province"
            v-validate="'required'"
            data-vv-name="state_province"
            :error-messages="errors.collect('state_province')"
            prepend-icon="place"
            :light="true"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-btn light color="primary" :loading="addressForm.busy" :disabled="errors.any()"  @click.native="submit()" :class="{primary: !addressForm.busy, error: addressForm.busy}" class="white--text">Update</v-btn>
        </form>
</v-container>
</template>

<script>
export default {
    props: ['tab', 'order'],
    data: () => ({
        addressForm: new AppForm(App.forms.addressForm)
    }),
    watch: {
        tab (newValue) {
            this.shipping_details = newValue
            this.addressForm.shipping_details.address_1 = newValue.address_1
            this.addressForm.shipping_details.address_2 = newValue.address_2
            this.addressForm.shipping_details.city = newValue.city
            this.addressForm.shipping_details.country = newValue.country
            this.addressForm.shipping_details.zip_code = newValue.zip_code
            this.addressForm.shipping_details.state_province = newValue.state_province
        }
    },
    methods: {
        submit () {
            console.log('form submitted')
            let self = this
            self.addressForm.busy = true
            App.post(route('api.orders.shipping_details', {order: self.order.id}), self.addressForm).then(({message}) => {
                self.addressForm.busy = false
                self.order.shipping_details = JSON.stringify(self.addressForm.shipping_details)
                vm.$popup({ message: message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
            }).catch(({errors, message}) => {
                if (errors) {
                    console.log(errors)
                }
                if (message) {
                    vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
                }
                self.addressForm.busy = false
            })
        }
    }

}
</script>

<style>

</style>
