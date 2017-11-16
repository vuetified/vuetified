<template>
  <main-layout  :style="{ paddingTop: `100px`, backgroundColor: `white` }">
    <v-container  fluid>
      <dash-panels :unpaid="unpaid" :paid="paid" :sent="sent" :received="received" :total="total" :unsent="unsent" :done="done"></dash-panels>
      <v-container fluid>

            <v-data-table
                :headers="headers"
                :items="items"
                light
                expand
            >
            <template slot="items" scope="props">
            <tr>
                <td class="title text-xs-left primary--text">
                    <v-btn color="primary" icon @click="props.expanded = !props.expanded"><v-icon>shopping_basket</v-icon></v-btn>
                    {{ props.item.id }}
                </td>
                <td class="title text-xs-left primary--text">{{ totalAmount(props.item) | currency(currency) }}</td>

                <td class="title text-xs-left primary--text">
                    <v-switch
                        :label="`${props.item.payment.paid ? 'Paid' : 'Unpaid'}`"
                        v-model="props.item.payment.paid"
                        color="teal darken-4"
                        light
                        :disabled="!hasRole('admin')"
                        @change="togglePaid(props.item)"
                        >
                    </v-switch>
                </td>

                <td class="title text-xs-left primary--text">
                    <v-switch
                        :label="`${props.item.shipment.sent ? 'Sent' : 'On-Hold'}`"
                        v-model="props.item.shipment.sent"
                        color="cyan"
                        light
                        :disabled="!hasRole('admin')"
                        @change="toggleSent(props.item)"
                        v-if="props.item.shipment"
                        >
                    </v-switch>
                </td>
                <td class="title text-xs-left primary--text">
                    <v-switch
                        :label="`${props.item.shipment.received ? 'Received' : 'Pending'}`"
                        v-model="props.item.shipment.received"
                        color="light-green"
                        light
                        @change="toggleReceived(props.item)"
                        v-if="props.item.shipment"
                        >
                    </v-switch>
                </td>
                <td class="title text-xs-left primary--text">
                    <v-switch
                        :label="`${props.item.done ? 'Completed' : 'On-Progress'}`"
                        v-model="props.item.done"
                        color="teal lighten-2"
                        light
                        :disabled="!hasRole('admin')"
                        @change="toggleDone(props.item)"
                        >
                    </v-switch>
                </td>
                <td class="title text-xs-center">
                    <v-btn :disabled="!can('edit_order')"  flat icon color="accent" @click.native="setCurrentOrder(props.item)">
                        <v-icon>fa-edit</v-icon>
                    </v-btn>
                    <v-btn :disabled="!can('delete_order')" flat icon color="error" @click.native="deleteOrder(props.item)">
                        <v-icon>fa-trash</v-icon>
                    </v-btn>
                </td>
            </tr>
            </template>

            <template slot="expand" scope="props">
                <v-data-table
                    :items="getItems(props.item.cart)"
                    hide-actions
                    light
                    >
                    <template slot="headers" scope="orders">
                            <th class="text-xs-left">Product</th>
                            <th class="text-xs-left">Qty</th>
                            <th class="text-xs-left">Price</th>
                            <th class="text-xs-left">Tax</th>
                            <th class="text-xs-left">Subtotal</th>
                    </template>
                        <template slot="items" scope="orders">
                        <td class="text-xs-left">{{ orders.item.name }}</td>
                        <td class="text-xs-left">{{ orders.item.qty }}</td>
                        <td class="text-xs-left">{{ orders.item.price | currency(currency) }}</td>
                        <td class="text-xs-left">{{ parseFloat(orders.item.tax).toFixed(2) | currency(currency) }}</td>
                        <td class="text-xs-left">{{ orders.item.subtotal | currency(currency) }}</td>
                        </template>
                </v-data-table>
            </template>

            <template slot="pageText" scope="{ pageStart, pageStop }">
                From {{ pageStart }} to {{ pageStop }}
            </template>

            </v-data-table>
            <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
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
                                <component :is="tab.component" :tab="tab" :order="current_order">
                                </component>
                            </v-card>
                            </v-tabs-content>
                        </v-tabs-items>
                    </v-tabs>
                </v-layout>
                </v-container>
                </v-card>
            </v-dialog>
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
import ShipmentDetails from '../components/dashboard/ShipmentDetails.vue'
import FileUploader from '../components/dashboard/FileUploader.vue'

export default {
    mixins: [Theme, Acl],
    components: {
        MainLayout,
        DashPanels,
        CustomerDetails,
        PaymentDetails,
        ShippingDetails,
        ShipmentDetails,
        FileUploader
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
            { text: 'Completed', align: 'left', sortable: false },
            { text: 'Actions', align: 'center', sortable: false }
        ],
        items: [],
        /* current updated item */
        current_order: {},
        /* tabs */
        tabs: [
            {name: 'customer details', component: 'customer-details'},
            {name: 'shipping details', component: 'shipping-details'},
            {name: 'payment details', component: 'payment-details'},
            {name: 'shipment details', component: 'shipment-details'},
            {name: 'upload receipt', component: 'file-uploader'}
        ],
        active: {
            name: 'customer details'
        },
        toggleForm: new AppForm(App.forms.toggleForm)

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
        let self = this
        self.fetchPanelStats()
        Bus.$on('receipt-uploaded', (order) => {
            let index = _.findIndex(self.items, { id: order.id })
            self.$set(self.items, index, order)
            self.current_order = order
        })
    },
    methods: {
        deleteOrder (order) {
            let self = this
            if (self.can('delete_order') || self.hasRole('admin')) {
                axios.post(route('api.order.destroy', {order: order.id})).then(() => {
                    self.total = self.total - 1
                    if (self.total < 0) {
                        self.total = 0
                    }
                    if (order.payment.paid) {
                        self.paid = self.paid - 1
                        if (self.paid < 0) {
                            self.paid = 0
                        }
                    }
                    if (order.shipment.sent) {
                        self.sent = self.sent - 1
                        if (self.sent < 0) {
                            self.sent = 0
                        }
                    }
                    if (order.shipment.received) {
                        self.received = self.received - 1
                        if (self.received < 0) {
                            self.received = 0
                        }
                    }
                    if (order.done) {
                        self.done = self.done - 1
                        if (self.done < 0) {
                            self.done = 0
                        }
                    }
                    let index = _.findIndex(self.items, { id: order.id })
                    self.$delete(self.items, index)
                    vm.$popup({ message: `Order#${order.id} Deleted!`, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
                }).catch(({errors, message}) => {
                    if (errors) {
                        console.log(errors)
                    }
                    if (message) {
                        console.log(message)
                    }
                })
            } else {
                vm.$popup({ message: 'Action Not Authorized!', backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
            }
        },
        resetToggleForm () {
            this.toggleForm = new AppForm(App.forms.toggleForm)
        },
        togglePaid (order) {
            let self = this
            self.toggleForm.toggle = order.payment.paid
            App.post(route('api.toggle.paid', {order: order.id}), self.toggleForm).then(({message}) => {
                if (order.payment.paid) {
                    this.paid = this.paid + 1
                } else {
                    this.paid = this.paid - 1
                }
                vm.$popup({ message: message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
            }).catch(({errors, message}) => {
                if (errors) {
                    console.log(errors)
                }
                if (message) {
                    vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
                }
                order.payment.paid = !order.payment.paid
            })
        },
        toggleSent (order) {
            let self = this
            self.toggleForm.toggle = order.shipment.sent
            App.post(route('api.toggle.sent', {order: order.id}), self.toggleForm).then(({message}) => {
                if (order.shipment.sent) {
                    this.sent = this.sent + 1
                } else {
                    this.sent = this.sent - 1
                }
                vm.$popup({ message: message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
            }).catch(({errors, message}) => {
                if (errors) {
                    console.log(errors)
                }
                if (message) {
                    vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
                }
                order.shipment.sent = !order.shipment.sent
            })
        },
        toggleReceived (order) {
            let self = this
            self.toggleForm.toggle = order.shipment.received
            App.post(route('api.toggle.received', {order: order.id}), self.toggleForm).then(({message}) => {
                if (order.shipment.received) {
                    this.received = this.received + 1
                } else {
                    this.received = this.received - 1
                }
                vm.$popup({ message: message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
            }).catch(({errors, message}) => {
                if (errors) {
                    console.log(errors)
                }
                if (message) {
                    vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
                }
                order.shipment.received = !order.shipment.received
            })
            console.log('toggle received', order.shipment.received)
        },
        toggleDone (order) {
            let self = this
            self.toggleForm.toggle = order.done
            App.post(route('api.toggle.done', {order: order.id}), self.toggleForm).then(({message}) => {
                if (order.done) {
                    this.done = this.done + 1
                } else {
                    this.done = this.done - 1
                }
                vm.$popup({ message: message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
            }).catch(({errors, message}) => {
                if (errors) {
                    console.log(errors)
                }
                if (message) {
                    vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
                }
                order.done = !order.done
            })
        },
        parseNumber (str) {
            var strg = str || ''
            var decimal = '.'
            strg = strg.replace(/[^0-9$.,]/g, '')
            if (strg.indexOf(',') > strg.indexOf('.')) decimal = ','
            if ((strg.match(new RegExp('\\' + decimal, 'g')) || []).length > 1) decimal = ''
            if (decimal !== '' && (strg.length - strg.indexOf(decimal) - 1 == 3) && strg.indexOf('0' + decimal) !== 0) decimal = ''
            strg = strg.replace(new RegExp('[^0-9$' + decimal + ']', 'g'), '')
            strg = strg.replace(',', '.')
            return parseFloat(strg)
        },
        getCart (cart) {
            return JSON.parse(cart)
        },
        getItems (cart) {
            return Object.values(JSON.parse(cart)['items'])
        },
        setCurrentOrder (order) {
            this.dialog = true
            this.current_order = order
            /* Check for Shipment Type if Meet Up Or Pick Up Remove Shipping Details From Tabs */
            let customer = Object.assign({name: 'customer details', component: 'customer-details'}, JSON.parse(this.current_order.customer_details))
            let shipping = Object.assign({name: 'shipping details', component: 'shipping-details'}, JSON.parse(this.current_order.shipping_details))
            let uploads = Object.assign({name: 'upload receipt', component: 'file-uploader'})
            this.tabs = [
                customer,
                shipping
            ]
            let payment = null
            if (this.current_order.payment) {
                payment = Object.assign({name: 'payment details', component: 'payment-details'}, this.current_order.payment)
                this.tabs.push(payment)
            }
            let shipment = null
            if (this.current_order.shipment) {
                shipment = Object.assign({name: 'shipment details', component: 'shipment-details'}, this.current_order.shipment)
                this.tabs.push(shipment)
            }
            this.tabs.push(uploads)
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
            let total = null
            if (item.shipment) {
                total = this.parseNumber(cart.total) + parseFloat(item.shipment.shipping_fee)
            } else {
                total = this.parseNumber(cart.total)
            }
            return total.toFixed(2)
        }
    },
    watch: {
        items: {
            handler: function () {
                console.log('items changed')
            },
            deep: true
        }
    }
}
</script>

<style scoped>
thead.datatable__progress {
    display: none;
}
</style>
