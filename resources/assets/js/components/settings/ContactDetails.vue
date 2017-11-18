<template>
    <v-tabs-content
    id="contact-details"
    >
        <v-container>
            <v-layout row wrap v-if="hasContactKeys">
                <v-flex xs6>
                <v-btn block @click.native="updateContactDetails()"
                :disabled="errors.any()"
                :loading="contactDetailsForm.busy"
                class="white--text"
                :class="{primary: !contactDetailsForm.busy , error: contactDetailsForm.busy }"
                light
                >Update Contact Details
                    <v-icon right>fa-send</v-icon>
                </v-btn>
                </v-flex>
                <v-flex xs6>
                <v-btn block color="accent" @click.native="openModal()"
                >Create Contact Details
                    <v-icon right>fa-plus</v-icon>
                </v-btn>
                </v-flex>
            </v-layout>
            <v-layout row wrap v-else>
                <v-flex xs12>
                <v-btn block color="accent" @click.native="openModal()"
                >Create Contact Details
                    <v-icon right>fa-plus</v-icon>
                </v-btn>
                </v-flex>
            </v-layout>

            <v-layout row wrap v-if="hasContactKeys">
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
                    v-validate="{ required: true, regex: /^[a-zA-Z0-9 +@#]+$/}"
                    :error-messages="errors.collect(key)"
                    :data-vv-name="key"
                    append-icon="fa-trash"
                    :append-icon-cb="() => (deleteContactDetails(key))"
                    >
                    </v-text-field>
                </v-flex>

            </v-layout>

            <v-layout row wrap v-else>
                <v-flex xs12 text-xs-center>
                    <v-card light :class="[contentClass]" flat >
                            <v-card-text>
                            <h4>No Contact Details Yet!</h4>
                            <p class="title">Create Your First Contact Details.</p>
                            <p class="body-2">Note: This Will Displayed In Your Homepage.</p>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>

            <new-contact-details></new-contact-details>

        </v-container>
    </v-tabs-content>
</template>

<script>
import NewContactDetails from './NewContactDetails.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('auth')
export default {
    components: {
        NewContactDetails
    },
    data: () => ({
        contentClass: { 'grey': true, 'lighten-4': true, 'accent--text': true },
        contact_details: {},
        contactDetailsForm: new AppForm(App.forms.contactDetailsForm),
        hasContactKeys: false
    }),
    computed: {
        ...mapGetters({
            getMe: 'getMe'
        })
    },
    mounted () {
        let self = this
        /* check the return value when we dont have contact details its an array it should be an empty objec */
        if (self.getMe.contact_details === null) {
            self.contact_details = {}
            self.hasContactKeys = false
        } else if (!_.isEmpty(self.getMe.contact_details)) {
            self.contact_details = self.getMe.contact_details
            self.hasContactKeys = true
        } else if (self.getMe.contact_details.length > 0) {
            self.contact_details = self.getMe.contact_details
            self.hasContactKeys = true
        } else {
            self.contact_details = {}
            self.hasContactKeys = false
        }
        Bus.$on('update-contact-details', (contact) => {
            self.contact_details[contact.title] = contact.value
            self.updateContactDetails()
        })
    },
    methods: {
        ...mapMutations({
            setMe: 'setMe'
        }),
        isEmpty (obj) {
            return Object.keys(obj).length === 0
        },
        openModal () {
            Bus.$emit('add-new-contact-details')
        },
        async deleteContactDetails (key) {
            let self = this
            delete self.contact_details[key]
            await self.updateContactDetails()
            if (_.isEmpty(self.contact_details)) {
                self.hasContactKeys = false
            }
        },
        toProperCase (key) {
            let newStr = key.replace(/_/g, ' ')
            return newStr.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
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
            console.log('1')
            self.prepareContactDetailsForm()
            console.log('2')
            self.$validator.validateAll()
            console.log('3')
            if (!self.errors.any()) {
                console.log('4')
                self.contactDetailsForm.busy = true
                console.log('5')
                try {
                    const payload = (await App.post(route('api.user.updateContactDetails'), self.contactDetailsForm))
                    console.log('6')
                    self.resetContactDetailsForm()
                    console.log('7')
                    self.setMe(payload.data)
                    console.log('8')
                    self.hasContactKeys = true
                    console.log('9')
                    vm.$popup({ message: payload.message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
                } catch ({errors, message}) {
                    self.contactDetailsForm.errors.set(errors)
                    self.contactDetailsForm.busy = false
                    vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
                }
            }
        }

    }

}
</script>

<style>

</style>
