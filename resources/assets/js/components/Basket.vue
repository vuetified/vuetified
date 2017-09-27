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
      <td class="title text-xs-left info--text">
        <v-avatar>
            <img :src="props.item.image" :alt="props.item.name">
        </v-avatar>
      </td>
      <td class="title text-xs-left info--text">{{ props.item.name }}</td>
      <td class="title text-xs-left info--text">{{ props.item.price }}</td>
      <td class="title text-xs-left info--text">{{ props.item.qty }}</td>
      <td class="title text-xs-left info--text">{{ props.item.total }}</td>
    </template>
    <template slot="footer">
      <td colspan="100%">
        <strong class="right headline primary--text" style="padding-right:200px;">Total:</strong>
      </td>
    </template>
  </v-data-table>
</template>

<script>
export default {
    props: ['orders'],
    data () {
        return {
            search: '',
            selected: [],
            headers: [
                { text: 'Product ID', value: 'id', align: 'left', sortable: true },
                { text: 'Product Image', value: 'image', align: 'left' },
                { text: 'Product Name', value: 'name', align: 'left' },
                { text: 'Product Price', value: 'price', align: 'left' },
                { text: 'Quantity', value: 'qty', align: 'left' },
                { text: 'Total', value: 'total', align: 'left' }

            ],
            items: [
                {
                    value: false,
                    id: 1,
                    image: 'https://vuetifyjs.com/static/doc-images/john.jpg',
                    name: 'Frozen Yogurt',
                    price: 1,
                    qty: 6.0,
                    total: 6
                },
                {
                    value: false,
                    id: 2,
                    image: 'https://vuetifyjs.com/static/doc-images/john.jpg',
                    name: 'Yogurt',
                    price: 2,
                    qty: 7.0,
                    total: 14
                },
                {
                    value: false,
                    id: 3,
                    image: 'https://vuetifyjs.com/static/doc-images/john.jpg',
                    name: 'Beans',
                    price: 8,
                    qty: 6.0,
                    total: 48
                }
            ]
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
        Bus.$on('add-order', (order) => {
            self.orders.push(order)
        })
        Bus.$on('remove-order', (order) => {
            let index = _.findIndex(self.orders, { id: order.id })
            self.$delete(self.orders, index)
        })
        Bus.$on('update-order', (order) => {
            let index = _.findIndex(self.orders, { id: order.id })
            self.$set(self.orders, index, order)
        })
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
