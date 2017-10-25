<template>
  <main-layout :class="[contentClass]" :style="{ paddingTop: `100px` }">
    <v-container  fluid>
      <v-layout row wrap>
        <!-- make a card to display this -->
        <v-flex xs12 md4 text-xs-center>
            <h3 class="primary--text">Total: {{ total }}</h3>
        </v-flex>
        <v-flex xs12 md4 text-xs-center>
            <h3 class="primary--text">Unpaid: {{ unpaid }} </h3>
        </v-flex>
        <v-flex xs12 md4 text-xs-center>
            <h3 class="primary--text">Confirmed Paid: {{ paid }}</h3>
        </v-flex>
        <v-flex xs12 md4 text-xs-center>
            <h3 class="primary--text">Delivered: {{ sent }} </h3>
        </v-flex>
        <v-flex xs12 md4 text-xs-center>
            <h3 class="primary--text">Confirmed Received: {{ received }}</h3>
        </v-flex>
        <v-flex xs12 md4 text-xs-center>
            <h3 class="primary--text">Done: {{ done }} </h3>
        </v-flex>
      </v-layout>
      <!-- Table to View All Orders -->
      <!-- Modal To Load Each Order Details -->
    </v-container>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import Theme from '../mixins/theme'

export default {
    mixins: [Theme],
    data: () => ({
        contentClass: { 'grey': true, 'lighten-4': true, 'accent--text': true },
        total: 10,
        unpaid: 2,
        paid: 5,
        sent: 4,
        received: 3,
        done: 3
    }),
    computed: {
        unpaid() {
            return this.total - this.paid
        },
        unsent() {
            return this.total - this.sent
        }
    },
    components: {
        MainLayout
    },
    mounted() {
        $this->fetchPanelStats();
    }
}
</script>
