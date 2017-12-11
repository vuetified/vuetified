<template>
<v-card flat>
    <v-card-text>
    <v-container fluid>
        <v-layout row wrap>
        <v-flex xs12>
            <form>
            <v-select
            label="Select"
            v-bind:items="getGateways"
            v-model="mop"
            item-text="name"
            item-value="slug"
            max-height="400"
            hint="Payment Options"
            persistent-hint
            v-validate="'required'"
            data-vv-name="mop"
            :return-object="true"
            :error-messages="errors.collect('mop')"
            prepend-icon="fa-money"
            >
            <template slot="selection" slot-scope="data">
                <v-chip
                @input="data.parent.selectItem(data.item)"
                :selected="data.selected"
                :key="JSON.stringify(data.item)"
                >
                <v-avatar>
                    <img :src="data.item.avatar">
                </v-avatar>
                {{ data.item.name }}
                </v-chip>
            </template>
            <template slot="item" slot-scope="data">
                <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                <v-list-tile-avatar>
                    <img v-bind:src="data.item.avatar"/>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
                </v-list-tile-content>
                </template>
            </template>
            </v-select>
            <v-btn color="primary" @click.native="forward()">Continue</v-btn>
            <v-btn outline color="primary" @click.native="back()">Back</v-btn>
            </form>
        </v-flex>
        </v-layout>
    </v-container>
    </v-card-text>
</v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapMutations, mapActions, mapGetters } = createNamespacedHelpers('checkout')

export default {
    computed: {
        ...mapGetters([
            'getModeOfPayment',
            'getGateways'
        ]),
        mop: {
            get () {
                return this.getModeOfPayment
            },
            set (value) {
                this.setModeOfPayment(value)
            }
        },
        current: {
            get () {
                return this.$store.getters['wizard/getCurrent']
            },
            set (value) {
                this.$store.commit('wizard/setCurrent', value)
            }
        },
        step: {
            get () {
                return this.$store.getters['wizard/getStep']
            },
            set (value) {
                this.$store.commit('wizard/setStep', value)
            }
        },

        next: {
            get () {
                return this.$store.getters['wizard/getNext']
            },
            set (value) {
                this.$store.commit('wizard/setNext', value)
            }
        },
        previous: {
            get () {
                return this.$store.getters['wizard/getPrevious']
            },
            set (value) {
                this.$store.commit('wizard/setPrevious', value)
            }
        }

    },
    created () {
        if (this.getGateways.length < 1) {
            this.fetchGateways()
        }
    },
    methods: {
        ...mapMutations([
            'setModeOfPayment'
        ]),
        ...mapActions([
            'fetchGateways'
        ]),
        forward () {
            let self = this
            self.$validator.validateAll()
            self.setValidated()
            self.$store.dispatch('wizard/move', self.next)
        },
        back () {
            let self = this
            self.$validator.validateAll()
            self.setValidated()
            self.$store.dispatch('wizard/move', self.previous)
        },
        setValidated () {
            if (!this.errors.any()) {
                this.current.validated = true
            } else {
                this.current.validated = false
            }
            this.$store.commit('wizard/setStepValidated', this.current)
        }
    }
}
</script>

<style>

</style>
