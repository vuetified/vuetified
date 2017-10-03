<template>
<v-app>
    <main>
       <v-container fluid pa-0 ma-0>
           <v-layout row>

               <v-data-table
                :headers="headers"
                :items="items"
                v-model="selected"
                selected-key="id"
                select-all
                no-data-text="You Have No Orders Yet, Continue Shopping..."
                class="info--text"
            >
                <template slot="headerCell" scope="props">
                <span v-tooltip:bottom="{ 'html': props.header.text }">
                    {{ props.header.text }}
                </span>
                </template>
                <template slot="items" scope="props">
                <td>
                    <v-checkbox
                    color="primary"
                    hide-details
                    v-model="props.selected"
                    ></v-checkbox>
                </td>
                <td class="title text-xs-left info--text">{{ props.item.id }}</td>
                <td class="title text-xs-left info--text">{{ props.item.name }}</td>
                <td class="title text-xs-left info--text">{{ props.item.price | currency(currency) }}</td>
                <td class="title text-xs-left info--text">{{ props.item.qty }}</td>
                <td class="title text-xs-left info--text">{{ props.item.subtotal | currency(currency) }}</td>
                <td class="title text-xs-center info--text">
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
            </v-data-table>
           </v-layout>
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
     </main>

  </v-app>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('cart')

export default {
    data () {
        return {
            currency: '₱',
            /* Table Specific */
            search: '',
            selected: [],
            headers: [
                { text: 'Product ID', value: 'id', align: 'left', sortable: true },
                { text: 'Product Name', value: 'name', align: 'left' },
                { text: 'Product Price', value: 'price', align: 'left' },
                { text: 'Quantity', value: 'qty', align: 'left' },
                { text: 'Total', value: 'total', align: 'left' },
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
        }),
        avatarSize () {
            return `${this.size}px`
        },
        isDark () {
            return this.dark === true
        }
    },
    mounted () {
        let self = this
        self.items = Object.values(self.getItems)
        self.selected = self.items
        self.tax = self.getTax
        self.subtotal = self.getSubTotal
        self.total = self.getTotal
        self.count = self.getCount
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
        closeCart () {
            Bus.$emit('close-cart')
        }
    },
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
