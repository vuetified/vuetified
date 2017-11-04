<template>
<v-container fluid>
        <v-layout row>
          <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
              class="primary--text"
              name="first_name"
              label="First Name"
              v-model="customerForm.customer_details.first_name"
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
              v-model="customerForm.customer_details.last_name"
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
              v-model="customerForm.customer_details.email"
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
            v-model="customerForm.customer_details.contact_no"
            v-validate="'required|numeric'"
            data-vv-name="contact_no"
            :error-messages="errors.collect('contact_no')"
            prepend-icon="fa-phone"
            :light="true"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-btn light color="primary" :loading="customerForm.busy" :disabled="errors.any()"  @click.native="submit()" :class="{primary: !customerForm.busy, error: customerForm.busy}" class="white--text">Update</v-btn>
</v-container>
</template>

<script>
export default {
    props: ['tab', 'order'],
    data: () => ({
        customerForm: new AppForm(App.forms.customerForm)
    }),
    watch: {
        tab (newValue) {
            this.customerForm.customer_details.first_name = newValue.first_name
            this.customerForm.customer_details.last_name = newValue.last_name
            this.customerForm.customer_details.email = newValue.email
            this.customerForm.customer_details.contact_no = newValue.contact_no
        }
    },
    methods: {
        submit () {
            console.log('form submitted')
            let self = this
            self.customerForm.busy = true
            App.post(route('api.orders.customer_details', {order: self.order.id}), self.customerForm).then(({message}) => {
                self.customerForm.busy = false
                self.order.customer_details = JSON.stringify(self.customerForm.customer_details)
                vm.$popup({ message: message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
            }).catch(({errors, message}) => {
                if (errors) {
                    console.log(errors)
                }
                if (message) {
                    vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
                }
                self.customerForm.busy = false
            })
        }
    }

}
</script>

<style>

</style>
