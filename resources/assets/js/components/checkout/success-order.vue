<template>
  <v-card class="grey lighten-1 mb-5" height="200px"></v-card>
</template>

<script>
export default {
    props: ['email'],
    data: () => ({

    }),
    methods: {
        login () {
            console.log('Logining In To Customer Dashboard')
        }
    }
}
</script>

<style>

</style>
