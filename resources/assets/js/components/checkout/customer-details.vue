<template>
  <v-card class="grey lighten-1 mb-5" height="200px"></v-card>
</template>

<script>
export default {
    props: ['orders'],
    data: () => ({
        customer_details: {
            first_name: null,
            middle_name: null,
            last_name: null,
            email: null,
            contact_no: null
        }

    })
}
</script>

<style>

</style>
