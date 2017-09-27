<template>
  <v-card class="grey lighten-1 mb-5" height="200px"></v-card>
</template>

<script>
export default {
    props: ['email'],
    data: () => ({

    }),
    methods: {
        sendMail () {
            console.log('sending email')
        }
    }
}
</script>

<style>

</style>
