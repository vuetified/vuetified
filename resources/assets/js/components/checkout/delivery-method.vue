<template>
<v-card flat>
    <v-card-text>
    <v-container fluid>
        <v-layout row wrap>
        <v-flex xs12>
            <form>
            <v-select
            label="Select"
            v-bind:items="getCouriers"
            v-model="courier"
            item-text="name"
            item-value="slug"
            :cache-items="true"
            max-height="400"
            hint="How Do You Want to Receive The Products?"
            persistent-hint
            v-validate="'required'"
            data-vv-name="courier"
            :return-object="true"
            :error-messages="errors.collect('courier')"
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
const { mapMutations, mapActions, mapGetters } = createNamespacedHelpers('checkout')

export default {
    computed: {
        ...mapGetters([
            'getDeliveryMethod',
            'getCouriers'
        ]),
        courier: {
            get () {
                return this.getDeliveryMethod
            },
            set (value) {
                this.setDeliveryMethod(value)
            }
        }

    },
    created () {
        if (this.getCouriers.length < 1) {
            this.fetchCouriers()
        }
    },
    mounted () {
        let self = this
        Bus.$on('validate_step_3', () => {
            self.$validator.validateAll()
            if (!self.errors.any()) {
                Bus.$emit('step_3_validated')
            }
        })
    },
    methods: {
        ...mapMutations([
            'setDeliveryMethod'
        ]),
        ...mapActions([
            'fetchCouriers'
        ])

    }
}
</script>

<style>

</style>
