<template>
  <v-dialog v-model="dialog" max-width="300">
    <v-card>
      <v-card-title class="headline blue--text text--darken-2">What Do You Want To Use For Checkout?</v-card-title>
      <v-card-text><strong class="green--text">Checkmeout</strong> - For COD, Credit Card, and Online Banking </v-card-text>
      <v-card-text><strong class="lime--text">Checkout</strong> - For Bank Deposit, Pick Up and Cash On Hand</v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="green" flat @click="checkMeOut">CHECKMEOUT</v-btn>
        <v-btn color="lime" flat @click="checkout">CHECKOUT</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('cart')

export default {
    data () {
        return {
            dialog: false,
            checkMeOutForm: new AppForm(App.forms.checkMeOutForm),
            items: []
        }
    },
    computed:{
        ...mapGetters([
            'getItems',
            'getSubTotal'
        ])
    },
    mounted(){
        let self = this
        Bus.$on('check-out-dialog', () => {
            self.open()
        })
    },
    methods: {
        ...mapActions([
            'destroyCart'
        ]),
        getTotalQTY(){
            let self = this
            self.items = Object.values(self.getItems)
            let qty_array = _.map(self.items, 'qty');
            return _.reduce(qty_array, function(sum, n) {
                return sum + n;
            }, 0);
        },
        getProductIDs(){
            let self = this
            self.items = Object.values(self.getItems)
            return _.map(self.items, 'id');
        },
        async checkMeOut(){
            let self = this
            self.checkMeOutForm.receptacle = self.choseReceptables(self.getTotalQTY())
            self.checkMeOutForm.products = self.getProductIDs()
            self.checkMeOutForm.subtotal = self.getSubTotal
            console.log('checkmeoutform',self.checkMeOutForm)
            self.close()
            let url = await self.addItems()
            await self.destroyCart()
            return self.$nextTick(() => window.location.href = url)
        },
        checkout(){
            let self = this
            self.close()
            return self.$nextTick(() => self.$router.push({ name: 'checkout' }))
        },
        open(){
            this.dialog = true
        },
        close(){
            this.dialog = false
        },
        choseReceptables(qty){
            let small = 'b85cc79e-2938-4ef2-8f91-a44a389bdb36'
            let medium = '295c6173-2dd1-4cb4-95a2-80235d3e2321'
            let large = '334d617c-5f22-4057-93c6-3bbf988d7237'
            if(qty <= 2){
                return  small
            }else if(qty <= 6){
                return medium
            }else{
                return large
            }
        },
        async addItems(){
            let self = this
            let payload = (await axios.post(route('api.cmo.addItems'),self.checkMeOutForm))
            return payload.data
        }
    }
}
</script>

<style>

</style>
