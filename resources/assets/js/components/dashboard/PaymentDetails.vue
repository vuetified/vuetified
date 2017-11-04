<template>
<v-container fluid>
  <v-layout row v-if="paymentForm.gateway">
    <v-flex xs12 text-xs-center>
        <p class="subheader primary--text">Gateway Details:</p>
    </v-flex>
  </v-layout>
  <v-layout row v-if="paymentForm.gateway">
    <v-flex xs12 sm12 md12  lg12  xl12>
      <v-text-field
      class="primary--text"
      name="mop"
      label="Mode Of Payment"
      v-model="paymentForm.gateway.name"
      readonly
      :light="true"
      ></v-text-field>
    </v-flex>
  </v-layout>
  <div v-if="paymentForm.gateway">
    <v-layout row v-for="(value,key,index) in paymentForm.gateway.details" :key="key" :index="index">
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
  </div>
  <v-layout row>
    <v-flex xs12 text-xs-center>
        <p class="subheader primary--text">Payment Details:</p>
    </v-flex>
  </v-layout>
  <v-layout row v-if="order.receipt">
    <v-flex xs12 sm12 md12  lg12  xl12>
      <v-text-field
      class="primary--text"
      label="Receipt"
      v-model="order.receipt"
      prepend-icon="fa-file"
      append-icon="fa-download"
      :append-icon-cb="() => (viewAttachment(order.receipt))"
      hint="View Receipt"
      persistent-hint
      :light="true"
      readonly
      ></v-text-field>
    </v-flex>
  </v-layout>
  <v-layout row>
    <v-flex xs12 sm12 md12  lg12  xl12>
      <v-text-field
        class="primary--text"
        name="transaction_no"
        label="Transaction No"
        v-model="paymentForm.transaction_no"
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
    <v-dialog
    persistent
    v-model="dialog"
    lazy
    full-width
    light
    >
    <v-text-field
    slot="activator"
    label="Date Paid"
    v-model="paymentForm.date_paid"
    prepend-icon="event"
    v-validate="'required'"
    data-vv-name="Date Paid"
    :error-messages="errors.collect('Date Paid')"
    light
    readonly
    >
    </v-text-field>
    <v-date-picker v-model="paymentForm.date_paid" scrollable actions light>
      <template scope="{ save, cancel }">
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
          <v-btn flat color="primary" @click="save">OK</v-btn>
        </v-card-actions>
      </template>
    </v-date-picker>
    </v-dialog>
    </v-flex>
  </v-layout>
  <v-layout row>
      <v-flex xs12 sm12 md12  lg12  xl12>
      <v-text-field
        class="primary--text"
        name="account_name"
        label="Account Name"
        v-model="paymentForm.account_name"
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
        v-model="paymentForm.account_no"
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
        v-model.number="paymentForm.amount"
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
      v-model="paymentForm.currency"
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
  <v-btn light color="primary" :loading="paymentForm.busy" :disabled="errors.any()"  @click.native="submit()" :class="{primary: !paymentForm.busy, error: paymentForm.busy}" class="white--text">Update</v-btn>
</v-container>
</template>

<script>
export default {
    props: ['tab', 'order'],
    data: () => ({
        dialog: false,
        paymentForm: new AppForm(App.forms.paymentForm)
    }),
    watch: {
        tab (newValue) {
            this.paymentForm.id = newValue.id
            this.paymentForm.date_paid = newValue.date_paid ? moment(newValue.date_paid).format('YYYY-MM-DD') : null
            this.paymentForm.transaction_no = newValue.transaction_no
            this.paymentForm.account_name = newValue.account_name
            this.paymentForm.account_no = newValue.account_no
            this.paymentForm.amount = newValue.amount
            this.paymentForm.currency = newValue.currency
            this.paymentForm.gateway = newValue.gateway
        }
    },
    methods: {
        viewAttachment (path) {
            window.open(path)
        },
        toProperCase (key) {
            let newStr = key.replace(/_/g, ' ')
            return newStr.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
        },
        submit () {
            let self = this
            self.paymentForm.busy = true
            App.post(route('api.orders.payment_details', {order: self.order.id}), self.paymentForm).then(({message}) => {
                self.paymentForm.busy = false
                // edit the array of orders by passing the whole object of each order
                self.order.payment.transaction_no = self.paymentForm.transaction_no
                self.order.payment.account_name = self.paymentForm.account_name
                self.order.payment.account_no = self.paymentForm.account_no
                self.order.payment.amount = self.paymentForm.amount
                self.order.payment.currency = self.paymentForm.currency
                self.order.payment.date_paid = self.paymentForm.date_paid
                vm.$popup({ message: message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
            }).catch(({errors, message}) => {
                if (errors) {
                    console.log(errors)
                }
                if (message) {
                    vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
                }
                self.paymentForm.busy = false
            })
        }

    }

}
</script>

<style>

</style>
