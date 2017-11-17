<template>
  <v-dialog v-model="contact_modal" persistent width="600px">
    <v-card light>
    <v-card-title class="headline">Add New Contact Details</v-card-title>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-text-field
                label="Contact Details Name"
                v-model="contact_tmp['title']"
                v-validate="{ required: true, regex: /^[a-z0-9_]*$/}"
                :error-messages="errors.collect('contact details title')"
                data-vv-name="contact details title"
                light
                >
                </v-text-field>
                <v-text-field
                label="Contact Details Value"
                v-model="contact_tmp['value']"
                light
                v-validate="{ required: true, regex: /^[a-zA-Z0-9 +@#]+$/ }"
                :error-messages="errors.collect('contact details value')"
                data-vv-name="contact details value"
                >
                </v-text-field>
            </v-flex>
        </v-layout>
    </v-container>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
        color="green darken-1" flat @click.native="addContactInput()"
        :disabled="isDisabled()"
        light
        >
        Create Contact Details
        </v-btn>
        <v-btn color="error" flat @click.native="closeContactInput()">Cancel</v-btn>
    </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    data: () => ({
        contact_modal: false,
        contact_tmp: {
            title: null,
            value: null
        },
        contactDetailsForm: new AppForm(App.forms.contactDetailsForm)
    }),
    mounted () {
        let self = this
        Bus.$on('add-new-contact-details', () => {
            self.contact_modal = true
        })
    },
    methods: {
        isDisabled () {
            let self = this
            if (!self.errors.any()) {
                return false
            } else {
                return true
            }
        },
        closeContactInput () {
            this.contact_tmp.title = null
            this.contact_tmp.value = null
            this.contact_modal = false
        },
        addContactInput () {
            if (this.contact_tmp.title && this.contact_tmp.value) {
                Bus.$emit('update-contact-details', this.contact_tmp)
            }
            this.contact_tmp.title = null
            this.contact_tmp.value = null
            this.contact_modal = false
        }
    }
}
</script>

<style>

</style>
