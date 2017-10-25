<template>
    <main-layout :class="[contentClass]" :style="{ paddingTop: `100px` }">
    <v-container  fluid>
      <v-layout row wrap>
        <v-flex xs12>
            <h3 class="primary--text">Thank You For Purchasing!</h3>

            <h5 class="info--text">An Instruction on How To Settle Payment</h5>

            <h5 class="info--text">Was Sent To Your Registered Email</h5>
        </v-flex>
        <v-flex xs12 sm12 md4 offset-md4 lg4 offset-lg4 xl4 offset-xl4>
            <v-card-actions>
            <v-btn @click.native="goTo('/dashboard')" block flat class="primary--text primary">View Orders <v-icon right dark>fa-cubes</v-icon></v-btn>
            <v-btn @click.native="goTo('/products')" block flat class="info--text info">Continue Shopping <v-icon right dark>fa-shopping-bag</v-icon></v-btn>
            </v-card-actions>
        </v-flex>
      </v-layout>
    </v-container>
 </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import Theme from '../mixins/theme'

export default {
    mixins: [Theme],
    data: () => ({
        contentClass: { 'grey': true, 'lighten-4': true, 'accent--text': true, 'text-xs-center': true }
    }),
    components: {
        MainLayout
    },
    methods: {
        goTo (route) {
            let self = this
            self.$router.push({path: route})
        }
    }

}
</script>

<style>

</style>
