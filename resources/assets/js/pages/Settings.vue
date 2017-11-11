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
const { mapGetters } = createNamespacedHelpers('auth')

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
        profile: {},
        name: '',
        email: '',
        username: '',
        old_password: '',
        password: '',
        password_confirmation: ''

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
        udpateProfile () {
            console.log('update profile')
        },
        updateContactDetails () {
            let self = this
            for (let key in self.contact_details) {
                self.contactDetailsForm[key] = self.getMe.contact_details[key]
            }
            // update getMe
            console.log(self.contactDetailsForm)
        },
        updateSocialLinks () {
            let self = this
            for (let key in self.social_links) {
                self.socialLinksForm[key] = self.social_links[key]
            }
            // update getMe
            console.log(self.socialLinksForm)
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
