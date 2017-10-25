<template>
  <main-layout :class="[contentClass]" :style="{ paddingTop: `100px` }">
    <v-container  fluid>
      <v-layout row wrap>
        <!-- make a card to display this -->
        <v-flex xs12 md4 text-xs-center>
            <h3 class="primary--text">Orders: {{ total }}</h3>
        </v-flex>
        <v-flex xs12 md4 text-xs-center>
            <h3 class="primary--text">Unpaid: {{ unpaid }} </h3>
        </v-flex>
        <v-flex xs12 md4 text-xs-center>
            <h3 class="primary--text">Paid: {{ paid }}</h3>
        </v-flex>
        <v-flex xs12 md4 text-xs-center>
            <h3 class="primary--text">On-Hold: {{ unsent }} </h3>
        </v-flex>
        <v-flex xs12 md4 text-xs-center>
            <h3 class="primary--text">On-Delivery: {{ sent }}</h3>
        </v-flex>
        <v-flex xs12 md4 text-xs-center>
            <h3 class="primary--text">Received: {{ received }} </h3>
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
        total: 0,
        paid: 0,
        sent: 0,
        received: 0,
        done: 0
    }),
    computed: {
        unpaid () {
            return this.total - this.paid
        },
        unsent () {
            return this.total - this.sent
        }
    },
    components: {
        MainLayout
    },
    mounted () {
        this.fetchPanelStats()
    },
    methods: {
        fetchPanelStats () {
            let self = this
            axios.get(route('api.panel.stats')).then((response) => {
                self.total = response.data.total
                self.sent = response.data.sent
                self.paid = response.data.paid
                self.received = response.data.received
                self.done = response.data.done
            })
        }
    }
}
</script>
