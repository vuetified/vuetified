<template>
<v-container fluid>
        <v-layout row v-if="shipmentForm.courier">
            <v-flex xs12 text-xs-center>
                <p class="subheader primary--text">Delivery Method:</p>
            </v-flex>
        </v-layout>
        <v-layout row v-if="shipmentForm.courier">
          <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
            class="primary--text"
            name="mop"
            label="Mode Of Payment"
            v-model="shipmentForm.courier.name"
            readonly
            :light="true"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <div v-if="shipmentForm.courier">
            <v-layout row v-for="(value,key,index) in shipmentForm.courier.details" :key="key" :index="index">
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
                <p class="subheader primary--text">Shipment Status:</p>
            </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm12 md12  lg12  xl12>
            <!-- read Only if not admin -->
            <v-text-field
              class="primary--text"
              name="tracking_no"
              label="Tracking No"
              v-model="shipmentForm.tracking_no"
              v-validate="'required|max:255'"
              data-vv-name="Tracking No"
              :error-messages="errors.collect('Tracking No')"
              prepend-icon="fa-truck"
              :light="true"
              :disabled="!hasRole('admin')"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
            @click="showSentModal"
            label="Date Sent"
            v-model="shipmentForm.date_sent"
            prepend-icon="event"
            v-validate="'required'"
            data-vv-name="Date Sent"
            :error-messages="errors.collect('Date Sent')"
            light
            readonly
            >
            </v-text-field>
            <v-dialog
            persistent
            v-model="modal1"
            lazy
            full-width
            light
            >

            <v-date-picker v-model="shipmentForm.date_sent" scrollable actions light>
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
            <v-checkbox :disabled="!hasRole('admin')" v-bind:label="`Sent`" v-model="shipmentForm.sent" light></v-checkbox>
          </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
            @click="showReceivedModal"
            label="Date Received"
            v-model="shipmentForm.date_received"
            prepend-icon="event"
            v-validate="'required'"
            data-vv-name="Date Received"
            :error-messages="errors.collect('Date Received')"
            light
            readonly
            >
            </v-text-field>
            <v-dialog
            persistent
            v-model="modal2"
            lazy
            full-width
            light
            >
            <v-date-picker v-model="shipmentForm.date_received" scrollable actions light>
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
            <v-checkbox :disabled="!can('edit_order') || !hasRole('admin')" v-bind:label="`Received`" v-model="shipmentForm.received" light></v-checkbox>
          </v-flex>
        </v-layout>
        <v-btn light color="primary" :loading="shipmentForm.busy" :disabled="errors.any()"  @click.native="submit()" :class="{primary: !shipmentForm.busy, error: shipmentForm.busy}" class="white--text">Update</v-btn>
</v-container>
</template>

<script>
import Acl from '../../mixins/acl'

export default {
    mixins: [Acl],
    props: ['tab', 'order'],
    data: () => ({
        modal1: false,
        modal2: false,
        shipmentForm: new AppForm(App.forms.shipmentForm)
    }),
    watch: {
        tab (newValue) {
            this.shipmentForm.id = newValue.id
            this.shipmentForm.courier = newValue.courier
            this.shipmentForm.shipping_fee = newValue.shipping_fee
            this.shipmentForm.currency = newValue.currency
            this.shipmentForm.tracking_no = newValue.tracking_no
            this.shipmentForm.sent = newValue.sent
            this.shipmentForm.date_sent = newValue.date_sent ? moment(newValue.date_sent).format('YYYY-MM-DD') : null
            this.shipmentForm.received = newValue.received
            this.shipmentForm.date_received = newValue.date_received ? moment(newValue.date_received).format('YYYY-MM-DD') : null
        }
    },
    methods: {
        showSentModal () {
            if (this.hasRole('admin')) {
                this.modal1 = true
            }
        },
        showReceivedModal () {
            if (this.can('edit_order') | this.hasRole('admin')) {
                this.modal2 = true
            }
        },
        toProperCase (key) {
            let newStr = key.replace(/_/g, ' ')
            return newStr.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
        },
        submit () {
            let self = this
            self.shipmentForm.busy = true
            App.post(route('api.orders.shipment_details', {order: self.order.id}), self.shipmentForm).then(({message}) => {
                self.shipmentForm.busy = false
                // edit the array of orders by passing the whole object of each order
                self.order.shipment.tracking_no = self.shipmentForm.tracking_no
                self.order.shipment.sent = self.shipmentForm.sent
                self.order.shipment.date_sent = self.shipmentForm.date_sent
                self.order.shipment.received = self.shipmentForm.received
                self.order.shipment.date_received = self.shipmentForm.date_received
                vm.$popup({ message: message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
            }).catch(({errors, message}) => {
                if (errors) {
                    console.log(errors)
                }
                if (message) {
                    vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
                }
                self.shipmentForm.busy = false
            })
        }

    }

}
</script>

<style>

</style>
