<template>
  <main-layout :class="[contentClass]" :style="{ paddingTop: `100px` }">
    <v-container fluid>
        <v-layout row wrap>
            <v-breadcrumbs light>
                <v-icon slot="divider" color="teal">forward</v-icon>
                <v-breadcrumbs-item
                active-class="primary--text"
                :disabled="false"
                to="/"
                >
                Home
                </v-breadcrumbs-item>
                <v-breadcrumbs-item
                :disabled="true"
                >
                    <span class="blue-grey--text">Support</span>
                </v-breadcrumbs-item>
            </v-breadcrumbs>
        </v-layout>
        <v-layout row wrap>
            <!-- left side -->
            <v-flex d-flex xs12 sm12 md6 lg6>
                <v-layout row wrap>
                        <v-flex d-flex xs12 text-xs-center>
                            <v-container fill-height fluid>
                                    <v-layout fill-height>
                                    <v-flex xs12 text-xs-center>
                                        <p class="headline primary--text">Inquire Now</p>
                                        <v-text-field
                                        light
                                        name="name"
                                        label="Full Name"
                                        v-model="name"
                                        v-validate="'required|max:255'"
                                        data-vv-name="name"
                                        :error-messages="errors.collect('name')"
                                        >
                                        </v-text-field>
                                        <v-text-field
                                        light
                                        name="email"
                                        label="Email"
                                        v-model="email"
                                        v-validate="'required|email'"
                                        data-vv-name="email"
                                        :error-messages="errors.collect('email')"
                                        >
                                        </v-text-field>
                                        <v-text-field
                                        light
                                        name="contact_no"
                                        label="Contact No."
                                        v-model="contact_no"
                                        v-validate="{ required: true, regex: /^\+?\d+$/ }"
                                        data-vv-name="contact no"
                                        :error-messages="errors.collect('contact no')"
                                        >
                                        </v-text-field>
                                         <v-text-field
                                        light
                                        name="subject"
                                        label="Subject"
                                        v-model="subject"
                                        v-validate="'required'"
                                        data-vv-name="subject"
                                        :error-messages="errors.collect('subject')"
                                        >
                                        </v-text-field>
                                        <v-text-field
                                        light
                                        name="message"
                                        label="Message"
                                        v-model="message"
                                        v-validate="'required'"
                                        data-vv-name="message"
                                        :error-messages="errors.collect('message')"
                                        multi-line
                                        >
                                        </v-text-field>
                                        <v-btn light class="white--text" :loading="contactForm.busy" :disabled="errors.any()"  block :class="{accent: !contactForm.busy, error: contactForm.busy}" @click="submit">Send<v-icon right>send</v-icon></v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-flex>
                </v-layout>
            </v-flex>
            <v-flex d-flex xs12 sm12 md6 lg6>
                <v-layout row wrap>
                    <v-flex xs12 text-xs-center>
                        <v-container fill-height fluid>
                            <v-layout fill-height>
                                <v-flex xs12 text-xs-center align-end flexbox>
                                    <p class="headline primary--text">Sellers Info</p>
                                    <v-list class="grey lighten-4">
                                        <v-list-tile v-for="(value,key,index) in contact_details" :key="key" :index="index">
                                            <v-list-tile-content>
                                            <v-list-tile-title class="title blue-grey--text">{{ toProperCase(key) }}: {{ toProperCase(value) }}</v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-list-tile>
                                    </v-list>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import Theme from '../mixins/theme'

export default {
    mixins: [Theme],
    data: () => ({
        contentClass: { 'grey': true, 'lighten-4': true, 'accent--text': true },
        name: '',
        email: '',
        subject: '',
        message: '',
        contact_no: '',
        sponsor_id: App.sponsor.user_id,
        contact_details: App.sponsor.contact_details,
        contactForm: new AppForm(App.forms.contactForm)
    }),
    components: {
        MainLayout
    },
    methods: {
        resetForm () {
            this.contactForm = new AppForm(App.forms.contactForm)
            this.name = ''
            this.email = ''
            this.message = ''
            this.subject = ''
            this.contact_no = ''
        },
        async submit () {
            let self = this
            self.contactForm.name = self.name
            self.contactForm.email = self.email
            self.contactForm.subject = self.subject
            self.contactForm.message = self.message
            self.contactForm.sponsor_id = self.sponsor_id
            self.contactForm.contact_no = self.contact_no
            self.$validator.validateAll()
            if (!self.errors.any()) {
                self.contactForm.startProcessing()
                await axios.post(route('api.@inquiry'), self.contactForm)
                    .then(({data}) => {
                        self.resetForm()
                        self.clearErrors()
                        vm.$popup({ message: data.message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
                    }).catch(({response}) => {
                        self.contactForm.setErrors(response.data.errors)
                        self.contactForm.busy = false
                        vm.$popup({ message: response.data.message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
                    })
            }
        },
        clearErrors () {
            this.errors.clear()
        },
        toProperCase (key) {
            let newStr = key.replace(/_/g, ' ')
            return newStr.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
        }
    }
}
</script>

<style scoped>

</style>
