<template>
  <main-layout  :style="{ paddingTop: `100px`, backgroundColor: `white` }">
    <v-container  fluid>
      <v-layout row wrap>
        <!-- make a card to display this -->
        <v-flex xs12 md4 text-xs-center>
            <h3 class="primary--text">Orders: {{ total }}</h3>
        </v-flex>
        <v-flex xs12 md4 text-xs-center>
            <h3 class="primary--text">Unpaid: {{ unpaid }} </h3>
        </v-flex>
        <v-flex xs12 md4 text-xs-center>
            <h3 class="primary--text">Paid: {{ paid }}</h3>
        </v-flex>
        <v-flex xs12 md4 text-xs-center>
            <h3 class="primary--text">On-Hold: {{ unsent }} </h3>
        </v-flex>
        <v-flex xs12 md4 text-xs-center>
            <h3 class="primary--text">On-Delivery: {{ sent }}</h3>
        </v-flex>
        <v-flex xs12 md4 text-xs-center>
            <h3 class="primary--text">Received: {{ received }} </h3>
        </v-flex>
      </v-layout>

      <v-container fluid>
            <v-card-title>
            <v-text-field
                append-icon="search"
                label="Search Orders No."
                v-model="search"
                color="info"
                :light="true"
            ></v-text-field>

            </v-card-title>

            <v-data-table
                :headers="headers"
                :items="items"
                :search="search"
                v-model="selected"
                selected-key="id"
                select-all
                :light="true"

            >
            <template slot="items" scope="props">
                <td>
                    <v-checkbox
                    color="primary"
                    hide-details
                    v-model="props.selected"
                    >
                    </v-checkbox>
                </td>
                <td class="title text-xs-left primary--text">{{ props.item.id }}</td>
                <td class="title text-xs-left primary--text">{{ totalAmount(props.item) | currency(currency) }}</td>
                <td class="title text-xs-left primary--text">{{ props.item.payment.paid ? 'Paid' : 'Unpaid' }}</td>
                <td class="title text-xs-left primary--text">{{ props.item.shipment.sent ? 'On-Delivery' : 'On-Hold' }}</td>
                <td class="title text-xs-left primary--text">{{ props.item.shipment.received ? 'Received' : 'Not Yet' }}</td>
                <td class="title text-xs-center">
                    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
                        <v-btn flat icon color="accent" slot="activator" @click.native="setCurrentOrder(props.item)">
                            <v-icon>fa-edit</v-icon>
                        </v-btn>
                        <v-card :light="true">
                        <v-toolbar  color="primary">
                            <v-btn icon @click.native="dialog = false" dark>
                            <v-icon>close</v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-toolbar-title>Update Order No. {{ props.item.id }}</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-toolbar-items>
                            <v-btn dark flat @click.native="dialog = false">Save</v-btn>
                            </v-toolbar-items>
                        </v-toolbar>
                        <v-container fluid>
                            <v-layout row wrap>
                            <!-- View Cart -->
                            <v-flex xs12 text-xs-center>
                                <h3 class="primary--text">View Cart Details</h3>
                            </v-flex>
                            <!-- Customer Details -->
                            <v-flex xs12 text-xs-center>
                                <h3 class="primary--text">View Customer Details</h3>
                            </v-flex>
                            <!-- Shipping Details -->
                            <v-flex xs12 text-xs-center>
                                <h3 class="primary--text">View Shipping Details</h3>
                            </v-flex>
                            <!-- Mode Of Payment -->
                            <v-flex xs12 text-xs-center>
                                <h3 class="primary--text">View Mode Of Payment</h3>
                            </v-flex>
                            <!-- Upload Receipt -->
                            <v-flex xs12 text-xs-center>
                                <h3 class="primary--text">Upload Receipt</h3>
                            </v-flex>
                            <!-- Update Status -->
                            <v-flex xs12 text-xs-center>
                                <h3 class="primary--text">Update Status</h3>
                            </v-flex>
                        </v-layout>
                        </v-container>
                        </v-card>
                    </v-dialog>
                </td>
                <td class="title text-xs-left">
                    <v-switch v-if="admin"
                        v-model="props.item.done"
                        color="red"
                        :light="true"
                        :disabled="!admin"
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

export default {
    mixins: [Theme],
    data: () => ({
        contentClass: { 'grey': true, 'lighten-4': true, 'accent--text': true },
        admin: false,
        currency: '₱',
        dialog: false,
        total: 0,
        paid: 0,
        sent: 0,
        received: 0,
        done: 0,
        search: '',
        selected: [],
        headers: [
            { text: 'Order No.', value: 'id', align: 'left', sortable: true },
            { text: 'Amount', value: 'totalAmount', align: 'left', sortable: true },
            { text: 'Paid', value: 'paid', align: 'left', sortable: true },
            { text: 'Sent', value: 'sent', align: 'left', sortable: true },
            { text: 'Received', value: 'received', align: 'left', sortable: true },
            { text: 'Update', align: 'center', sortable: false },
            { text: 'Completed', align: 'left', sortable: true }
        ],
        items: [],
        /* current updated item */
        current_order: {}
    }),
    computed: {
        unpaid () {
            return this.total - this.paid
        },
        unsent () {
            return this.total - this.sent
        }
    },
    components: {
        MainLayout
    },
    mounted () {
        this.fetchPanelStats()
    },
    methods: {
        setCurrentOrder (order) {
            this.current_order = order
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
