<template>
  <v-layout row wrap>
            <v-dialog v-model="option_modal" persistent max-width="500px">
                <v-card light>
                <v-card-title>
                    <span class="headline">Add Product Package</span>
                </v-card-title>
                <v-card-text>
                    <v-container fluid>
                    <v-layout row wrap>
                        <v-flex xs12>
                        <v-text-field
                        label="Name"
                        required
                        light
                        v-model="tmp_option.name"
                        v-validate="{ required: true}"
                        :error-messages="errors.collect('package key')"
                        data-vv-name="name"
                        >
                        </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12>
                        <v-text-field
                        label="Value"
                        required
                        light
                        v-model="tmp_option.value"
                        v-validate="{ required: true}"
                        :error-messages="errors.collect('package value')"
                        data-vv-name="package value"
                        >
                        </v-text-field>
                        </v-flex>
                    </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="closeOptionModal">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click="addOption">Save</v-btn>
                </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
</template>

<script>
export default {
    data: () => ({
        option_modal: false,
        tmp_option: {
            name: '',
            value: ''
        }
    }),
    mounted () {
        Bus.$on('open-package-modal', () => {
            this.option_modal = true
        })
    },
    methods: {
        closeOptionModal () {
            this.option_modal = false
        },
        addOption () {
            let self = this
            Bus.$emit('package-added', self.tmp_option)
            self.tmp_option = {
                name: '',
                value: ''
            }
            self.closeOptionModal()
        }
    }
}
</script>

<style>

</style>
