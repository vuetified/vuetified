<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card v-if="!checkMeOutForm.busy">
      <v-card-title class="headline error--text">What Do You Want To Use For Checkout?</v-card-title>
      <v-card-text><strong class="green--text">Checkmeout.ph</strong> - For COD, Credit Card, and Online Banking </v-card-text>
      <v-card-text><strong class="blue--text text--darken-2">Checkout</strong> - For Bank Deposit, Pick Up and Cash On Hand</v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="primary" :disabled="checkMeOutForm.busy" flat @click="checkMeOut"><img src="/img/checkmeout.png"></v-btn>
        <v-btn color="blue darken-2" flat @click="checkout" :disabled="checkMeOutForm.busy">CHECKOUT</v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-else>
      <v-card-title class="text-xs-center headline info--text">Processing Orders, Please Wait...</v-card-title>
      <v-card-text class="text-xs-center"><v-progress-circular indeterminate :size="70" :width="7" color="primary"/></v-card-text>
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
            self.checkMeOutForm.busy = true
            self.checkMeOutForm.receptacle = self.choseReceptables(self.getTotalQTY())
            self.checkMeOutForm.products = self.getProductIDs()
            self.checkMeOutForm.subtotal = self.getSubTotal
            console.log('checkmeoutform',self.checkMeOutForm)
            let url = await self.addItems()
            await self.destroyCart()
            self.checkMeOutForm.busy = false
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
            //! HardCoded Links Make Sure To Change This When You Change This On Your Route!
            let payload = (await axios.post('/api/cmo/addItems',self.checkMeOutForm))
            return payload.data
        }
    }
}
</script>

<style>

</style>
