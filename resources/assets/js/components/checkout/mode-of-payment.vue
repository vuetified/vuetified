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
            >
            <template slot="selection" scope="data">
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
            <template slot="item" scope="data">
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
            </form>
        </v-flex>
        </v-layout>
    </v-container>
    </v-card-text>
</v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions, mapGetters } = createNamespacedHelpers('checkout')

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
        }

    },
    created () {
        this.fetchGateways()
    },
    mounted () {
        let self = this
        vm.$on('validate_step_4', () => {
            self.$validator.validateAll()
            if (!self.errors.any()) {
                vm.$emit('step_4_validated', true)
            } else {
                vm.$emit('step_4_validated', false)
            }
        })
    },
    methods: {
        ...mapMutations([
            'setModeOfPayment'
        ]),
        ...mapActions([
            'fetchGateways'
        ])
    }
}
</script>

<style>

</style>
