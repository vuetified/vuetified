<template>
<v-container fluid>
    <form>
        <v-layout row>
            <v-flex xs12 text-xs-center>
                <p class="subheader primary--text">Payment Gateway Details:</p>
            </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
            class="primary--text"
            name="mop"
            label="Mode Of Payment"
            v-model="payment.gateway.name"
            readonly
            :light="true"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row v-for="(value,key,index) in payment.gateway.details" :key="key" :index="index">
          <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
            class="primary--text"
            name="key"
            :label="toProperCase(key)"
            :value="value"
            readonly
            :light="true"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 text-xs-center>
                <p class="subheader primary--text">Payment Details:</p>
            </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
              class="primary--text"
              name="transaction_no"
              label="Transaction No"
              v-model="payment.transaction_no"
              v-validate="'required|max:255'"
              data-vv-name="Transaction No"
              :error-messages="errors.collect('Transaction No')"
              prepend-icon="fa-hashtag"
              :light="true"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
              class="primary--text"
              name="account_name"
              label="Account Name"
              v-model="payment.account_name"
              v-validate="'required|max:255'"
              data-vv-name="Account Name"
              :error-messages="errors.collect('Account Name')"
              prepend-icon="fa-id-card"
              :light="true"
            ></v-text-field>
          </v-flex>

        </v-layout>
        <v-layout row>
            <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
              class="primary--text"
              name="account_no"
              label="Account No."
              v-model="payment.account_no"
              v-validate="'required|max:255'"
              data-vv-name="Account No"
              :error-messages="errors.collect('Account No')"
              prepend-icon="fa-credit-card"
              :light="true"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
              class="primary--text"
              name="amount"
              label="Amount"
              v-model.number="payment.amount"
              v-validate="'required|min_value:1'"
              data-vv-name="amount"
              :error-messages="errors.collect('amount')"
              prepend-icon="fa-money"
              hint="Amount You Paid"
            persistent-hint
              :light="true"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
            class="primary--text"
            name="currency"
            label="Currency"
            v-model="payment.currency"
            v-validate="'required'"
            data-vv-name="currency"
            :error-messages="errors.collect('currency')"
            prepend-icon="fa-usd"
            hint="Currency Of Your Payment"
            persistent-hint
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
        payment: {
            id: '',
            transaction_no: '',
            account_name: '',
            account_no: '',
            amount: '',
            currency: '',
            gateway: {
                id: '',
                name: '',
                slug: '',
                group: '',
                avatar: '',
                details: '',
                model: ''
            }
        }
    }),
    watch: {
        tab (newValue) {
            this.payment = newValue
        }
    },
    methods: {
        toProperCase (key) {
            let newStr = key.replace(/_/g, ' ')
            return newStr.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
        },
        submit () {
            console.log('form submitted')
        }

    }

}
</script>

<style>

</style>
