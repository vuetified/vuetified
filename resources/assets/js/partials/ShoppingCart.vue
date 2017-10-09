<template>
  <v-layout row justify-center>

    <v-dialog
    v-model="dialog"
    persistent
    fullscreen
    transition="dialog-bottom-transition"
     :overlay="false"
    >

      <v-card>

        <v-toolbar dark class="accent">

          <v-btn icon @click.native="close()" dark>
            <v-icon class="error--text">close</v-icon>
          </v-btn>

          <v-spacer></v-spacer>
          <v-toolbar-title class="text-xs-center primary--text">Shopping Cart</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-toolbar-items>
            <v-btn class="success--text" flat @click.native="checkout()" v-if="count > 0">Checkout<v-icon right>payment</v-icon></v-btn>
            <v-btn class="warning--text" flat @click.native="close()" v-else>Close</v-btn>
          </v-toolbar-items>

        </v-toolbar>
        <!-- content -->
        <v-container fluid>

            <v-card-title>

            <v-tooltip top>
            <v-btn flat icon color="error" slot="activator" @click="emptyCart()" v-if="count > 0">
            <v-icon>remove_shopping_cart</v-icon>
            </v-btn>
            <span>Empty | Cart</span>
            </v-tooltip>

            <v-spacer></v-spacer>
            Your Shopping Cart Contents
            <v-spacer></v-spacer>

            <v-text-field
                append-icon="search"
                label="Search"
                single-line
                hide-details
                v-model="search"
            ></v-text-field>

            </v-card-title>

            <v-data-table
                :headers="headers"
                :items="items"
                :search="search"
                v-model="selected"
                selected-key="id"
                select-all
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
                <td class="title text-xs-left">{{ props.item.id }}</td>
                <td class="title text-xs-left">{{ props.item.name }}</td>
                <td class="title text-xs-left">
                    {{ props.item.qty }}
                </td>
                <td class="title text-xs-left">{{ props.item.price | currency(currency) }}</td>
                <td class="title text-xs-left">{{ props.item.subtotal | currency(currency) }}</td>
                <td class="title text-xs-center">

                    <v-edit-dialog
                    @open="tmp = props.item"
                    @save="updateCartItem(tmp)"
                    large
                    lazy
                    >

                    <v-btn icon>
                        <v-icon class="teal--text text--lighten-2">fa-edit</v-icon>
                    </v-btn>

                    <div slot="input" class="mt-3 title primary--text">Update Qty</div>

                    <v-text-field
                    slot="input"
                    label="Edit"
                    v-model="tmp.qty"
                    single-line
                    counter
                    autofocus
                    :rules="[maxCount]"
                    >
                    </v-text-field>

                </v-edit-dialog>

                </td>
                <td class="title text-xs-center">
                    <v-btn icon @click.native="removeFromCart(props.item.id)">
                        <v-icon class="red--text text--lighten-2">delete_forever</v-icon>
                    </v-btn>
                </td>

            </template>

            <template slot="pageText" scope="{ pageStart, pageStop }">
                From {{ pageStart }} to {{ pageStop }}
            </template>

            </v-data-table>

            <v-flex xs12 class="text-xs-right">
                 <v-chip label class="red lighten-2 white--text title">
                    <v-icon left>fa-percent</v-icon> Tax : {{ currency }} {{ tax }}
                </v-chip>
            </v-flex>

            <v-flex xs12 class="text-xs-right">
                <v-chip label class="info white--text title">
                    <v-icon left>shopping_basket</v-icon> Subtotal : {{ currency }} {{ subtotal }}
                </v-chip>
            </v-flex>

            <v-flex xs12 class="text-xs-right">
                <v-chip label class="primary white--text title">
                    <v-icon left>fa-money</v-icon> Total : {{ currency }} {{ total }}
                </v-chip>
            </v-flex>

        </v-container>

      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Theme from '../mixins/theme'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('cart')

export default {
    mixins: [Theme],
    data () {
        return {
            currency: '₱',
            dialog: false,
            search: '',
            selected: [],
            pagination: {},
            headers: [
                { text: 'Id', value: 'id', align: 'left', sortable: false },
                { text: 'Name', value: 'name', align: 'left', sortable: true },
                { text: 'Qty', value: 'qty', align: 'left', sortable: true },
                { text: 'Price', value: 'price', align: 'left', sortable: true },
                { text: 'Total Price', value: 'subtotal', align: 'left', sortable: true },
                { text: 'Update', align: 'center', sortable: false },
                { text: 'Delete', align: 'center', sortable: false }
            ],
            /* Cart Specific */
            items: [],
            tax: 0,
            subtotal: 0,
            total: 0,
            count: 0,
            maxCount: (v) => parseInt(v) <= 999 || 'Max Qty is 999',
            /* current updated item */
            tmp: ''
        }
    },
    computed: {
        ...mapGetters({
            getItems: 'getItems',
            getTax: 'getTax',
            getSubTotal: 'getSubTotal',
            getTotal: 'getTotal',
            getCount: 'getCount'
        })
    },
    mounted () {
        let self = this
        /* populate cart */
        self.items = Object.values(self.getItems)
        self.tax = self.getTax
        self.subtotal = self.getSubTotal
        self.total = self.getTotal
        self.count = self.getCount
        self.selected = self.items
        /* listen when cart is open */
        Bus.$on('shopping-cart-open', () => {
            self.dialog = true
        })
    },
    methods: {
        ...mapActions({
            removeItem: 'removeItem', /* params: product.id , request: rowId */
            destroyCart: 'destroyCart',
            updateItem: 'updateItem' /* params: product.id and product.qty, request: rowId and qty */
        }),
        updateCartItem (tmp) {
            let payload = {qty: tmp.qty, id: tmp.id}
            this.updateItem(payload)
        },
        emptyCart () {
            let self = this
            self.destroyCart()
        },
        removeFromCart (id) {
            let self = this
            self.removeItem(id)
        },
        checkout () {
            let self = this
            self.dialog = false
            return self.$nextTick(() => self.$router.push({ name: 'checkout' }))
        },
        close () {
            this.dialog = false
        }
    },
    /* Check For Update in Store Value for Cart */
    watch: {
        getTax (newValue) {
            let self = this
            self.tax = newValue
        },
        getCount (newValue) {
            let self = this
            self.count = newValue
        },
        getItems (newValue) {
            let self = this
            self.items = Object.values(newValue)
        },
        getSubTotal (newValue) {
            let self = this
            self.subtotal = newValue
        },
        getTotal (newValue) {
            let self = this
            self.total = newValue
        }
    }

}
</script>

<style>

</style>
