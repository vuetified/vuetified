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
              v-model="shipping_details.address_2"
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
              v-model="shipping_details.city"
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
              v-model="shipping_details.country"
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
            v-model="shipping_details.zip_code"
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
            v-model="shipping_details.state_province"
            v-validate="'required'"
            data-vv-name="state_province"
            :error-messages="errors.collect('state_province')"
            prepend-icon="place"
            :light="true"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-btn outline color="primary" @click.native="submit()">Update</v-btn>
        </form>
</v-container>
</template>

<script>
export default {
    props: ['tab'],
    data: () => ({
        shipping_details: {
            address_1: '',
            address_2: '',
            city: '',
            country: '',
            zip_code: '',
            state_province: ''
        }
    }),
    watch: {
        tab (newValue) {
            this.shipping_details = newValue
        }
    },
    methods: {
        submit () {
            console.log('form submitted')
        }
    }

}
</script>

<style>

</style>
