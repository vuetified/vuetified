<template>
<v-card flat>
        <v-container fluid>

            <v-card-title>

            <v-tooltip top>
            <v-btn flat icon color="red lighten-2" slot="activator" @click="emptyCart()" v-if="count > 0">
            <v-icon>remove_shopping_cart</v-icon>
            </v-btn>
            <span>Empty Cart</span>
            </v-tooltip>

            <v-text-field
                v-if="items.length > 0"
                append-icon="search"
                label="Search For Product In Cart"
                single-line
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
                <td class="title text-xs-left primary--text">{{ props.item.name }}
                    <span v-if="props.item.options !== {}">
                        <span  class="info--text caption" v-for="(option,key) in props.item.options" :key="key">({{ option }})</span>
                    </span>
                </td>
                <td class="title text-xs-left primary--text">{{ props.item.qty }}</td>
                <td class="title text-xs-left primary--text">{{ props.item.price | currency(currency) }}</td>
                <td class="title text-xs-left primary--text">{{ props.item.subtotal | currency(currency) }}</td>
                <td class="title text-xs-center">

                    <v-edit-dialog
                    @open="tmp = props.item"
                    @save="updateCartItem(tmp)"
                    large
                    lazy
                    >
                    <v-btn flat color="teal lighten-2">
                    <v-icon>fa-edit</v-icon>
                    </v-btn>
                    <div slot="input" class="mt-3 text-xs-center title primary--text">Update Qty</div>

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
                    <v-btn flat icon color="red lighten-2" @click.native="removeFromCart(props.item.id)">
                    <v-icon>delete_forever</v-icon>
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
                { text: 'Name', value: 'name', align: 'left', sortable: true },
                { text: 'Qty', value: 'qty', align: 'left', sortable: true },
                { text: 'Price', value: 'price', align: 'left', sortable: true },
                { text: 'Amount', value: 'subtotal', align: 'left', sortable: true },
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
        console.log(self.items)
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
            if (tmp.qty > 999) {
                tmp.qty = 999
            }
            let payload = {qty: tmp.qty, rowId: tmp.rowId}

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
