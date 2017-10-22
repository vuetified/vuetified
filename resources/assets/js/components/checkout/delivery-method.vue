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
            <v-btn color="primary" @click.native="nextStep()">Continue</v-btn>
            <v-btn outline color="primary" @click.native="current_step = 1">Back</v-btn>
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
        },
        current_step: {
            get () {
                return this.$store.getters['wizard/getCurrentStep']
            },
            set (value) {
                this.$store.commit('wizard/setCurrentStep', value)
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
        vm.$on('validate_step_2', () => {
            self.$validator.validateAll()
            if (!self.errors.any()) {
                vm.$emit('step_2_validated', true)
            } else {
                vm.$emit('step_2_validated', false)
            }
        })
    },
    methods: {
        ...mapMutations([
            'setDeliveryMethod'
        ]),
        ...mapActions([
            'fetchCouriers'
        ]),
        nextStep () {
            // check if 
            let pickup = _.filter(this.getCouriers, _.iteratee(['group', 'Pick Up Location']))
            let meetup = _.filter(this.getCouriers, _.iteratee(['group', 'Meet Up']))
            if (_.includes(pickup, this.courier) | _.includes(meetup, this.courier)) {
                this.current_step = 4
                // skip validation of step 3
            } else {
                this.current_step = 3
            }
        }

    }
}
</script>

<style>

</style>
