<template>
<v-container fluid>
    <v-layout row>
        <v-flex xs12 sm12 md12  lg12  xl12>
            <p>{{ tab.name }}</p>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
export default {
    props: ['tab']

}
</script>

<style>

</style>
