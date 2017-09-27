<template>
  <v-card class="grey lighten-1 mb-5" height="200px"></v-card>
</template>

<script>
export default {
    props: ['orders'],
    data: () => ({
        order_details: [{
            description: null,
            currency: null,
            item_id: null,
            item_type: null,
            price: null,
            vat: null
        }
        ]
    })
}
</script>

<style>

</style>
