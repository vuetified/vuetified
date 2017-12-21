<template>
  <main-layout :style="{ paddingTop: `45px`, backgroundColor: `white` }">
    <v-tabs 
      fixed 
      icons 
      centered
    >
      <v-tabs-bar class="blue-grey darken-4">
        <v-tabs-slider color="primary"/>
        <!-- tabs -->
        <v-tabs-item href="#account">
          <v-icon>fa-user</v-icon>
          <span class="hidden-md-and-down">Account</span>
        </v-tabs-item>
        <v-tabs-item 
          href="#referral-link"
          v-if="active"
        >
          <v-icon>timeline</v-icon>
          <span class="hidden-md-and-down">Link</span>
        </v-tabs-item>
        <v-tabs-item href="#profile">
          <v-icon>fa-address-card</v-icon>
          <span class="hidden-md-and-down">Profile</span>
        </v-tabs-item>
        <!-- for reseller account only -->
        <v-tabs-item 
          href="#contact-details" 
          v-if="active"
        >
          <v-icon>phone</v-icon>
          <span class="hidden-md-and-down">Contact Details</span>
        </v-tabs-item>
        <!-- for reseller account only -->
        <v-tabs-item 
          href="#social-links" 
          v-if="active"
        >
          <v-icon>link</v-icon>
          <span class="hidden-md-and-down">Social Links</span>
        </v-tabs-item>
        <!-- tabs -->
      </v-tabs-bar>
      <v-tabs-items>
        <!-- tab contents -->
        <account/>
        <referral-link v-if="active"/>
        <profile/>
        <contact-details v-if="active"/>
        <social-links v-if="active"/>
        <!-- tab contents -->
      </v-tabs-items>
    </v-tabs>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import Account from '../components/settings/Account.vue'
import ReferralLink from '../components/settings/ReferralLink.vue'
import ContactDetails from '../components/settings/ContactDetails.vue'
import Profile from '../components/settings/Profile.vue'
import SocialLinks from '../components/settings/SocialLinks.vue'
import Theme from '../mixins/theme'

export default {
    components: {
        MainLayout,
        Account,
        ReferralLink,
        ContactDetails,
        Profile,
        SocialLinks
    },
    mixins: [Theme],
    data: () => ({
        contentClass: { 'grey': true, 'lighten-4': true, 'accent--text': true }
    }),
    computed: {
        /* need to logout to reflect changes in account */
        active () {
            return !!this.$store.getters['auth/getMe']['referral_link']['active']
        }
    }
}
</script>
