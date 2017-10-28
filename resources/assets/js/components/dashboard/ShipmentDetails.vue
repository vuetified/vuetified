<template>
<v-container fluid>
    <form>
        <v-layout row>
            <v-flex xs12 text-xs-center>
                <p class="subheader primary--text">Delivery Method:</p>
            </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
            class="primary--text"
            name="mop"
            label="Mode Of Payment"
            v-model="shipment.courier.name"
            readonly
            :light="true"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row v-for="(value,key,index) in shipment.courier.details" :key="key" :index="index">
          <v-flex xs12 sm12 md12  lg12  xl12>
            <v-text-field
            class="primary--text"
            name="key"
            :label="toProperCase(key)"
            :value="value"
            readonly
            :light="true"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 text-xs-center>
                <p class="subheader primary--text">Shipment Details:</p>
            </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm12 md12  lg12  xl12>
            <!-- read Only if not admin -->
            <v-text-field
              class="primary--text"
              name="tracking_no"
              label="Tracking No"
              v-model="shipment.tracking_no"
              v-validate="'required|max:255'"
              data-vv-name="Tracking No"
              :error-messages="errors.collect('Tracking No')"
              prepend-icon="truck"
              :light="true"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 sm12 md12  lg12  xl12>
            <v-checkbox v-bind:label="`On-Delivery`" v-model="shipment.sent" light></v-checkbox>
          </v-flex>
        </v-layout>
         <v-layout row>
            <v-flex xs12 sm12 md12  lg12  xl12>
            <v-checkbox v-bind:label="`Received`" v-model="shipment.received" light></v-checkbox>
          </v-flex>
        </v-layout>
        <v-btn outline color="primary" @click.native="submit()">Update</v-btn>
        </form>
</v-container>
</template>

<script>
export default {
    props: ['tab'],
    data: () => ({
        payment: {
            id: '',
            transaction_no: '',
            account_name: '',
            account_no: '',
            amount: '',
            currency: '',
            gateway: {
                id: '',
                name: '',
                slug: '',
                group: '',
                avatar: '',
                details: '',
                model: ''
            }
        }
    }),
    watch: {
        tab (newValue) {
            this.payment = newValue
        }
    },
    methods: {
        toProperCase (key) {
            let newStr = key.replace(/_/g, ' ')
            return newStr.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
        },
        submit () {
            console.log('form submitted')
        }

    }

}
</script>

<style>

</style>
