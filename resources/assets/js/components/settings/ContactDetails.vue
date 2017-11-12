<template>
    <v-tabs-content
        id="contact-details"
    >
        <v-container>
            <v-layout row wrap>
                <p class="primary--text">Contact Details</p>
                <v-flex xs12>
                    <v-alert color="primary" icon="warning" value="true">
                            <span class="white--text">** This Will Be Displayed Publicly in The Homepage **</span>
                    </v-alert>
                </v-flex>
                <v-flex xs12>
                    <v-text-field
                    :label="toProperCase(key)"
                    v-model="contact_details[key]"
                    light
                    v-for="(value,key,index) in contact_details" :key="key" :index="index"
                    v-validate="{ required: true, regex: /^[a-zA-Z0-9 +@#]+$/ }"
                    :error-messages="errors.collect(key)"
                    :data-vv-name="key"
                    >
                    </v-text-field>
                </v-flex>
                <v-btn block color="primary" @click="updateContactDetails()"
                :disabled="errors.any()"
                :loading="contactDetailsForm.busy"
                class="white--text"
                light
                :class="{primary: !contactDetailsForm.busy, error: contactDetailsForm.busy}"
                >
                    Update Contact Details <v-icon right>fa-send</v-icon>
                </v-btn>
                <v-btn block color="accent" @click="contact_modal = true">New Contact Details<v-icon right>fa-plus</v-icon></v-btn>
                <v-dialog v-model="contact_modal" persistent width="600px">
                    <v-card light>
                        <v-card-title class="headline">Add New Contact Details</v-card-title>
                        <v-container>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-text-field
                                    :label="toProperCase(key)"
                                    v-model="contact_tmp[key]"
                                    light
                                    v-for="(value,key,index) in contact_tmp" :key="key" :index="index"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                            color="green darken-1" flat @click.native="addContactInput()"
                            :disabled="isDisabled(contact_tmp)"
                            light
                            >
                            Create Contact Details</v-btn>
                            <v-btn color="error" flat @click.native="closeContactInput()">Cancel</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-layout>
        </v-container>
    </v-tabs-content>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('auth')
export default {
    data: () => ({
        contact_modal: false,
        contact_details: {},
        contact_tmp: {
            title: null,
            value: null
        },
        contactDetailsForm: new AppForm(App.forms.contactDetailsForm)
    }),
    computed: {
        ...mapGetters({
            getMe: 'getMe'
        })
    },
    mounted () {
        let self = this
        self.contact_details = self.getMe.contact_details
    },
    methods: {
        ...mapMutations({
            setMe: 'setMe'
        }),
        toProperCase (key) {
            let newStr = key.replace(/_/g, ' ')
            return newStr.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
        },
        isDisabled (object) {
            if (object.title && object.value) {
                return false
            } else {
                return true
            }
        },
        prepareContactDetailsForm () {
            let self = this
            self.contactDetailsForm.contact_details = self.contact_details
        },
        resetContactDetailsForm () {
            let self = this
            self.contactDetailsForm = new AppForm(App.forms.contactDetailsForm)
        },
        async updateContactDetails () {
            let self = this
            self.prepareContactDetailsForm()
            self.$validator.validateAll()
            if (!self.errors.any()) {
                self.contactDetailsForm.busy = true
                try {
                    const payload = (await App.post(route('api.user.updateContactDetails'), self.contactDetailsForm))
                    self.resetContactDetailsForm()
                    self.setMe(payload.data)
                    vm.$popup({ message: payload.message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
                } catch ({errors, message}) {
                    self.contactDetailsForm.errors.set(errors)
                    self.contactDetailsForm.busy = false
                    vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
                }
            }
        },
        closeContactInput () {
            this.contact_tmp.title = null
            this.contact_tmp.value = null
            this.contact_modal = false
        },
        addContactInput () {
            if (this.contact_tmp.title && this.contact_tmp.value) {
                this.$set(this.contact_details, this.contact_tmp.title, this.contact_tmp.value)
            }
            this.contact_tmp.title = null
            this.contact_tmp.value = null
            this.contact_modal = false
            /* send ajax to add new contact info */
            // update getMe
        }

    }

}
</script>

<style>

</style>
