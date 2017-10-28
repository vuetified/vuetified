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
              prepend-icon="fa-id-card"
              :light="true"
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
              prepend-icon="fa-id-card-o"
              :light="true"
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
              :light="true"
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
        customer_details: {
            first_name: '',
            last_name: '',
            email: '',
            contact_no: ''
        }
    }),
    watch: {
        tab (newValue) {
            this.customer_details = newValue
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
