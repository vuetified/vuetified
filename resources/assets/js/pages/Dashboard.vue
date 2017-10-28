<template>
  <main-layout  :style="{ paddingTop: `100px`, backgroundColor: `white` }">
    <v-container  fluid>
      <dash-panels :unpaid="unpaid" :paid="paid" :sent="sent" :received="received" :total="total" :unsent="unsent"></dash-panels>
      <v-container fluid>

            <v-data-table
                :headers="headers"
                :items="items"
                :light="true"
            >
            <template slot="items" scope="props">
            <tr @click="props.expanded = !props.expanded">
                <td class="title text-xs-left primary--text">{{ props.item.id }}</td>
                <td class="title text-xs-left primary--text">{{ totalAmount(props.item) | currency(currency) }}</td>
                <td class="title text-xs-left primary--text">{{ props.item.payment.paid ? 'Paid' : 'Unpaid' }}</td>
                <td class="title text-xs-left primary--text">{{ props.item.shipment.sent ? 'Sent' : 'On-Hold' }}</td>
                <td class="title text-xs-left primary--text">{{ props.item.shipment.received ? 'Received' : 'Pending' }}</td>
                <td class="title text-xs-center">
                    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
                        <v-btn flat icon color="accent" slot="activator" @click.native="setCurrentOrder(props.item)">
                            <v-icon>fa-edit</v-icon>
                        </v-btn>
                        <v-card :light="true">
                        <v-toolbar  color="accent">
                            <v-btn icon @click.native="dialog = false" class="error--text">
                            <v-icon>close</v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-toolbar-title class="primary--text">Update Order No. {{ current_order.id }}</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-toolbar-items>
                            <v-btn  flat @click.native="dialog = false" class="info--text">Save</v-btn>
                            </v-toolbar-items>
                        </v-toolbar>
                        <v-container fluid>
                            <v-tabs v-model="active.name">
                                <v-tabs-bar class="accent">
                                <v-tabs-item
                                v-for="(tab,key) in tabs"
                                :key="key"
                                :href="'#' + tab.name"
                                ripple
                                >
                                {{tab.name}}
                                </v-tabs-item>
                                <v-tabs-slider color="primary"></v-tabs-slider>
                                </v-tabs-bar>
                                <v-tabs-items>
                                    <v-tabs-content
                                    v-for="(tab, key) in tabs"
                                    :key="key"
                                    :id="tab.name"
                                    >
                                    <v-card flat :light="true">
                                        <component :is="tab.component" :tab="tab">
                                        </component>
                                    </v-card>
                                    </v-tabs-content>
                                </v-tabs-items>
                            </v-tabs>
                        </v-layout>
                        </v-container>
                        </v-card>
                    </v-dialog>
                </td>
                <td class="title text-xs-left">
                    <v-switch v-if="hasRole('admin')"
                        v-model="props.item.done"
                        color="red"
                        :light="true"
                        :disabled="!hasRole('admin')"
                        >
                    </v-switch>
                    <v-btn v-else flat icon color="red lighten-2">
                    <v-icon v-if="props.item.done">fa-check-square-o</v-icon>
                    <v-icon v-else>fa-square-o</v-icon>
                    </v-btn>
                </td>
            </tr>
            </template>

             <template slot="expand" scope="props">
                <v-card flat :light="true">
                    <v-container fluid>
                        <v-layout row wrap v-for="(item , key) in getItems(props.item.cart)" :key="key">
                                    <v-spacer></v-spacer>
                                    <span class="title blue-grey--text">Product: {{ item.name }}</span>
                                    <v-spacer></v-spacer>

                                    <span class="title blue-grey--text">Qty: {{ item.qty }}</span>
                                    <v-spacer></v-spacer>

                                    <span class="title blue-grey--text">Price: {{ item.price | currency(currency) }}</span>
                                    <v-spacer></v-spacer>

                                    <span class="title blue-grey--text">Tax: {{ parseFloat(item.tax).toFixed(2) | currency(currency) }}</span>
                                    <v-spacer></v-spacer>

                                    <span class="title blue-grey--text">Subtotal: {{ item.subtotal }}</span>
                                    <v-spacer></v-spacer>
                        </v-layout>
                    </v-container>
                </v-card>
            </template>

            <template slot="pageText" scope="{ pageStart, pageStop }">
                From {{ pageStart }} to {{ pageStop }}
            </template>

            </v-data-table>
      </v-container>
    </v-container>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import Theme from '../mixins/theme'
import Acl from '../mixins/acl'
import DashPanels from '../partials/DashPanels.vue'
import CustomerDetails from '../components/dashboard/CustomerDetails.vue'
import PaymentDetails from '../components/dashboard/PaymentDetails.vue'
import ShippingDetails from '../components/dashboard/ShippingDetails.vue'

export default {
    mixins: [Theme, Acl],
    components: {
        MainLayout,
        DashPanels,
        CustomerDetails,
        PaymentDetails,
        ShippingDetails
    },
    data: () => ({
        contentClass: { 'grey': true, 'lighten-4': true, 'accent--text': true },
        currency: '₱',
        dialog: false,
        /* panels */
        total: 0,
        paid: 0,
        sent: 0,
        received: 0,
        done: 0,
        /* table */
        headers: [
            /* remove sort and value since we cant access dot anotation in item */
            { text: 'Order No.', value: 'id', align: 'left', sortable: true },
            { text: 'Amount', align: 'left', sortable: false },
            { text: 'Paid', align: 'left', sortable: false },
            { text: 'Sent', align: 'left', sortable: false },
            { text: 'Received', align: 'left', sortable: false },
            { text: 'Update', align: 'center', sortable: false },
            { text: 'Completed', align: 'left', sortable: false }
        ],
        items: [],
        /* current updated item */
        current_order: {},
        /* tabs */
        tabs: [
            {name: 'customer details', component: 'customer-details'},
            {name: 'shipping details', component: 'shipping-details'},
            {name: 'payment', component: 'payment-details'}
        ],
        active: {
            name: 'customer details'
        }

    }),
    computed: {
        unpaid () {
            return this.total - this.paid
        },
        unsent () {
            return this.total - this.sent
        }
    },
    mounted () {
        this.fetchPanelStats()
    },
    methods: {
        getCart (cart) {
            return JSON.parse(cart)
        },
        getItems (cart) {
            return Object.values(JSON.parse(cart)['items'])
        },
        setCurrentOrder (order) {
            this.current_order = order
            /* Check for Shipment Type if Meet Up Or Pick Up Remove Shipping Details From Tabs */
            let customer = Object.assign({name: 'customer details', component: 'customer-details'}, JSON.parse(this.current_order.customer_details))
            let shipping = Object.assign({name: 'shipping details', component: 'shipping-details'}, JSON.parse(this.current_order.shipping_details))
            let payment = Object.assign({name: 'payment details', component: 'payment-details'}, this.current_order.payment)

            this.tabs = [
                customer,
                shipping,
                payment
            ]
        },
        fetchPanelStats () {
            let self = this
            axios.get(route('api.panel.stats')).then((response) => {
                self.items = response.data.orders
                self.total = response.data.total
                self.sent = response.data.sent
                self.paid = response.data.paid
                self.received = response.data.received
                self.done = response.data.done
            })
        },
        totalAmount (item) {
            let cart = JSON.parse(item.cart)
            let total = parseFloat(cart.total) + parseFloat(item.shipment.shipping_fee)
            return total.toFixed(2)
        }
    }
}
</script>
