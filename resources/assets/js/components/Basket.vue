<template>
 <v-data-table
    :headers="headers"
    :items="items"
    v-model="selected"
    selected-key="id"
    select-all
    hide-actions
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
      <td class="title text-xs-left info--text">{{ props.item.price | currency('₱') }}</td>
      <td class="title text-xs-left info--text">{{ props.item.qty }}</td>
      <td class="title text-xs-left info--text">{{ props.item.subtotal | currency('₱') }}</td>
    </template>
    <template slot="footer">
        <td class="title text-xs-left info--text"></td>
        <td class="title text-xs-left info--text"></td>
        <td class="title text-xs-left info--text"></td>
        <td class="title text-xs-left info--text"></td>
        <td class="title text-xs-left info--text"></td>
        <td class="title text-xs-left primary--text">
            <p style="margin-left:-100px;">Tax :<span style="margin-left:78px;">{{ tax | currency('₱') }}</span></p>
            <p style="margin-left:-100px;">Sub-Total :<span style="margin-left:24px;">{{ subtotal | currency('₱') }}</span></p>
            <p style="margin-left:-100px;">Total :<span style="margin-left:67px;">{{ total | currency('₱') }}</span></p>
        </td>
    </template>
  </v-data-table>
</template>

<script>
export default {
    props: ['cart'],
    data () {
        return {
            search: '',
            selected: [],
            headers: [
                { text: 'Product ID', value: 'id', align: 'left', sortable: true },
                { text: 'Product Name', value: 'name', align: 'left' },
                { text: 'Product Price', value: 'price', align: 'left' },
                { text: 'Quantity', value: 'qty', align: 'left' },
                { text: 'Total', value: 'total', align: 'left' }
            ],
            items: [],
            tax: 0,
            subtotal: 0,
            total: 0,
            count: 0
        }
    },
    computed: {
        avatarSize () {
            return `${this.size}px`
        },
        isDark () {
            return this.dark === true
        }
    },
    mounted () {
        let self = this
        self.items = self.cart.items
        self.tax = self.cart.tax
        self.subtotal = self.cart.subtotal
        self.total = self.cart.total
        self.count = self.cart.count
    },
    methods: {
        closeCart () {
            Bus.$emit('close-cart')
        }
    }
}
</script>

<style>

</style>
