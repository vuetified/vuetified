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
                        <v-toolbar  color="primary">
                            <v-btn icon @click.native="dialog = false">
                            <v-icon>close</v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-toolbar-title>Update Order No. {{ current_order.id }}</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-toolbar-items>
                            <v-btn  flat @click.native="dialog = false">Save</v-btn>
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

            </template>

            <template slot="pageText" scope="{ pageStart, pageStop }">
                From {{ pageStart }} to {{ pageStop }}
            </template>

            </v-data-table>
      </v-container>
      <!-- Table to View All Orders -->
      <!-- Modal To Load Each Order Details -->
    </v-container>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import Theme from '../mixins/theme'
import Acl from '../mixins/acl'
import DashPanels from '../partials/DashPanels.vue'
import CartDetails from '../components/dashboard/CartDetails.vue'
import CustomerDetails from '../components/dashboard/CustomerDetails.vue'
import PaymentDetails from '../components/dashboard/PaymentDetails.vue'
import ShippingDetails from '../components/dashboard/ShippingDetails.vue'

export default {
    mixins: [Theme, Acl],
    components: {
        MainLayout,
        DashPanels,
        CartDetails,
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
            {name: 'order details', component: 'cart-details'},
            {name: 'customer details', component: 'customer-details'},
            {name: 'shipping details', component: 'shipping-details'},
            {name: 'payment', component: 'payment-details'}
        ],
        active: {
            name: 'order details'
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
    watch: {
        active (newVal) {
            console.log(newVal)
        }
    },
    methods: {
        next (tab) {
            this.active = tab
        },
        setCurrentOrder (order) {
            this.current_order = order
            this.tabs =
            [
                Object.assign({name: 'order details', component: 'cart-details'}, JSON.parse(this.current_order.cart)),
                Object.assign({name: 'customer details', component: 'customer-details'}, JSON.parse(this.current_order.customer_details)),
                Object.assign({name: 'shipping details', component: 'shipping-details'}, this.current_order.shipment),
                Object.assign({name: 'payment details', component: 'payment-details'}, this.current_order.payment)
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

<style scoped>
.application--dark .table {
    background-color: #F5F5F5 !important;
    color: #103050 !important;
}
.application--dark .input-group:not(.input-group--error) label {
    /* color: rgba(255,255,255,0.7); */
}

</style>
