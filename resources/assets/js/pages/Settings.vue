<template>
  <main-layout :class="[contentClass]" :style="{ paddingTop: `55px`}">
      <!-- start tab -->
      <v-tabs dark fixed icons centered>
      <v-tabs-bar class="blue-grey darken-4">
        <v-tabs-slider color="primary"></v-tabs-slider>
        <v-tabs-item href="#account">
          <v-icon>fa-user</v-icon>
          Account
        </v-tabs-item>
        <v-tabs-item href="#profile">
          <v-icon>fa-address-card</v-icon>
          Profile
        </v-tabs-item>
        <!-- for reseller account only -->
        <v-tabs-item href="#contact-details">
          <v-icon>phone</v-icon>
          Contact Details
        </v-tabs-item>
        <!-- for reseller account only -->
        <v-tabs-item href="#social-links">
          <v-icon>link</v-icon>
          Social Links
        </v-tabs-item>

      </v-tabs-bar>
      <v-tabs-items>
          <v-tabs-content
          id="account"
        >
        <v-container>
            <v-layout row wrap>
            <v-subheader light class="primary--text">
                Edit Account
            </v-subheader>
            <v-flex xs12>
                <v-text-field
                label="Username"
                v-model="username"
                light
                >
                </v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-text-field
                label="Email"
                v-model="email"
                light
                >
                </v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-text-field
                label="Account Name"
                v-model="name"
                light
                >
                </v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-text-field
                label="Old Password"
                v-model="old_password"
                light
                >
                </v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-text-field
                label="New Password"
                v-model="password"
                light
                >
                </v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-text-field
                label="Confirm New Password"
                v-model="password_confirmation"
                light
                >
                </v-text-field>
            </v-flex>
            <v-btn block color="primary" @click="updateAccount()">
                Update Account <v-icon right>fa-send</v-icon>
            </v-btn>
            </v-layout>
        </v-container>
        </v-tabs-content>
        <v-tabs-content
          id="profile"
        >
        <v-container>
            <v-layout row wrap>
            <v-subheader light class="primary--text">
                Edit Profile
            </v-subheader>
            <v-flex xs12>
                <v-text-field
                :label="toProperCase(key)"
                v-model="profile[key]"
                light
                v-for="(value,key,index) in profile" :key="key" :index="index"
                >
                </v-text-field>
            </v-flex>
            <v-btn block color="primary" @click="updateProfile()">
                Update Profile <v-icon right>fa-send</v-icon>
            </v-btn>
            </v-layout>
        </v-container>
        </v-tabs-content>
        <v-tabs-content
          id="contact-details"
        >
        <v-container>
            <v-layout row wrap>
            <v-subheader light class="primary--text">
                Contact Details
            </v-subheader>
            <v-flex xs12>
                <v-text-field
                :label="toProperCase(key)"
                v-model="contact_details[key]"
                light
                v-for="(value,key,index) in contact_details" :key="key" :index="index"
                >
                </v-text-field>
            </v-flex>
            <v-btn block color="primary" @click="updateContactDetails()">
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
                <v-btn color="green darken-1" flat @click.native="addContactInput()">Create Contact Details</v-btn>
                <v-btn color="error" flat @click.native="closeContactInput()">Cancel</v-btn>
            </v-card-actions>
            </v-card>
            </v-dialog>
        </v-layout>
        </v-container>
        </v-tabs-content>
         <v-tabs-content
          id="social-links"
        >
        <v-container>
            <v-layout row wrap>
            <v-subheader light class="primary--text">
                Social Links
            </v-subheader>
            <v-flex xs12>
                <v-text-field
                :label="toProperCase(key)"
                v-model="social_links[key]"
                light
                v-for="(value,key,index) in social_links" :key="key" :index="index"
                >
                </v-text-field>
            </v-flex>
            <v-btn block color="primary" @click.native="updateSocialLinks()">
                Update Social Links <v-icon right>fa-send</v-icon>
            </v-btn>

            <v-btn block color="accent" @click="social_modal = true">New Social Link<v-icon right>fa-plus</v-icon></v-btn>
            <v-dialog v-model="social_modal" persistent width="600px">

            <v-card light>
            <v-card-title class="headline">Add New Social Link</v-card-title>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-text-field
                        :label="toProperCase(key)"
                        v-model="social_tmp[key]"
                        light
                        v-for="(value,key,index) in social_tmp" :key="key" :index="index"
                        >
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat @click.native="addSocialInput()">Create Social Link</v-btn>
                <v-btn color="error" flat @click.native="closeSocialInput()">Cancel</v-btn>
            </v-card-actions>
            </v-card>
            </v-dialog>
        </v-layout>
        </v-container>
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>
    <!-- end tab -->
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import Theme from '../mixins/theme'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('auth')

export default {
    mixins: [Theme],
    data: () => ({
        contentClass: { 'grey': true, 'lighten-4': true, 'accent--text': true },
        /* for modal */
        contact_modal: false,
        social_modal: false,
        /* for v-model */
        contact_details: {},
        social_links: {},
        /* for modal input */
        contact_tmp: {
            title: null,
            value: null
        },
        social_tmp: {
            title: null,
            value: null
        },
        /* form object */
        contactDetailsForm: new AppForm(App.forms.contactDetailsForm),
        socialLinksForm: new AppForm(App.forms.socialLinksForm),
        accountForm: new AppForm(App.forms.accountForm),
        profileForm: new AppForm(App.forms.profileForm),
        profile: {},
        name: null,
        email: null,
        username: null,
        old_password: null,
        password: null,
        password_confirmation: null

    }),
    computed: {
        ...mapGetters({
            getMe: 'getMe'
        })
    },
    components: {
        MainLayout
    },
    mounted () {
        let self = this
        self.social_links = self.getMe.social_links
        self.contact_details = self.getMe.contact_details
        self.profile = self.getMe.profile
        self.name = self.getMe.name
        self.email = self.getMe.email
        self.username = self.getMe.username
    },
    methods: {
        ...mapMutations({
            setMe: 'setMe'
        }),
        prepareAccountForm () {
            let self = this
            self.accountForm.name = self.name
            self.accountForm.username = self.username
            self.accountForm.email = self.email
            self.accountForm.old_password = self.old_password
            self.accountForm.password = self.password
            self.accountForm.password_confirmation = self.password_confirmation
            if (self.old_password === null) {
                delete self.accountForm.old_password
                delete self.accountForm.password
                delete self.accountForm.password_confirmation
            }
        },
        resetAccountForm () {
            let self = this
            self.accountForm = new AppForm(App.forms.accountForm)
        },
        async updateAccount () {
            let self = this
            self.accountForm.busy = true
            self.prepareAccountForm()
            try {
                const payload = (await App.post(route('api.user.updateAccount'), self.accountForm))
                self.resetAccountForm()
                self.setMe(payload.data)
                vm.$popup({ message: payload.message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
            } catch ({errors, message}) {
                self.accountForm.errors.set(errors)
                self.accountForm.busy = false
                vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
            }
        },
        prepareProfileForm () {
            let self = this
            self.profileForm.first_name = self.profile.first_name
            if (self.profile.first_name === null) {
                delete self.profileForm.first_name
            }
            self.profileForm.last_name = self.profile.last_name
            if (self.profile.last_name === null) {
                delete self.profileForm.last_name
            }
            self.profileForm.contact_no = self.profile.contact_no
            if (self.profile.contact_no === null) {
                delete self.profileForm.contact_no
            }
            self.profileForm.address_1 = self.profile.address_1
            if (self.profile.address_1 === null) {
                delete self.profileForm.address_1
            }
            self.profileForm.address_2 = self.profile.address_2
            if (self.profile.address_2 === null) {
                delete self.profileForm.address_2
            }
            self.profileForm.city = self.profile.city
            if (self.profile.city === null) {
                delete self.profileForm.city
            }
            self.profileForm.country = self.profile.country
            if (self.profile.country === null) {
                delete self.profileForm.country
            }
            self.profileForm.zip_code = self.profile.zip_code
            if (self.profile.zip_code === null) {
                delete self.profileForm.zip_code
            }
            self.profileForm.state_province = self.profile.state_province
            if (self.profile.state_province === null) {
                delete self.profileForm.state_province
            }
        },
        resetProfileForm () {
            let self = this
            self.profileForm = new AppForm(App.forms.profileForm)
        },
        async updateProfile () {
            let self = this
            self.prepareProfileForm()
            self.profileForm.busy = true
            try {
                const payload = (await App.post(route('api.user.updateProfile'), self.profileForm))
                self.resetProfileForm()
                self.setMe(payload.data)
                vm.$popup({ message: payload.message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
            } catch ({errors, message}) {
                self.profileForm.errors.set(errors)
                self.profileForm.busy = false
                vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
            }
        },
        prepareContactDetailsForm () {
            let self = this
            self.contactDetailsForm.contact_details = self.getMe.contact_details
        },
        resetContactDetailsForm () {
            let self = this
            self.contactDetailsForm = new AppForm(App.forms.contactDetailsForm)
        },
        async updateContactDetails () {
            let self = this
            self.prepareContactDetailsForm()
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
        },
        prepareSocialLinkForm () {
            let self = this
            self.socialLinksForm.social_links = self.social_links
        },
        resetSocialLinkForm () {
            let self = this
            self.socialLinksForm = new AppForm(App.forms.socialLinksForm)
        },
        async updateSocialLinks () {
            let self = this
            self.prepareSocialLinkForm()
            self.socialLinksForm.busy = true
            try {
                const payload = (await App.post(route('api.user.updateSocialLink'), self.socialLinksForm))
                self.resetSocialLinkForm()
                self.setMe(payload.data)
                vm.$popup({ message: payload.message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
            } catch ({errors, message}) {
                self.socialLinksForm.errors.set(errors)
                self.socialLinksForm.busy = false
                vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
            }
        },
        closeContactInput () {
            this.contact_tmp.title = null
            this.contact_tmp.value = null
            this.contact_modal = false
        },
        addContactInput () {
            this.$set(this.contact_details, this.contact_tmp.title, this.contact_tmp.value)
            this.contact_tmp.title = null
            this.contact_tmp.value = null
            this.contact_modal = false
            /* send ajax to add new contact info */
            // update getMe
        },
        closeSocialInput () {
            this.social_tmp.title = null
            this.social_tmp.value = null
            this.social_modal = false
        },
        addSocialInput () {
            this.$set(this.social_links, this.social_tmp.title, this.social_tmp.value)
            this.social_tmp.title = null
            this.social_tmp.value = null
            this.social_modal = false
            /* send ajax to add new contact info */
            // update getMe
        },
        toProperCase (key) {
            let newStr = key.replace(/_/g, ' ')
            return newStr.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
        }
    }
}
</script>
