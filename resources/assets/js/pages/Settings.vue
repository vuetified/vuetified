<template>
  <main-layout :class="[contentClass]" :style="{ paddingTop: `55px`}">
      <v-tabs dark fixed icons centered>
      <v-tabs-bar class="blue-grey darken-4">
        <v-tabs-slider color="primary"></v-tabs-slider>
        <!-- tabs -->
        <v-tabs-item href="#account">
          <v-icon>fa-user</v-icon>
          Account
        </v-tabs-item>
        <v-tabs-item href="#referral-link" v-if="active">
          <v-icon>timeline</v-icon>
          Link
        </v-tabs-item>
        <v-tabs-item href="#profile">
          <v-icon>fa-address-card</v-icon>
          Profile
        </v-tabs-item>
            <!-- for reseller account only -->
        <v-tabs-item href="#contact-details" v-if="active">
          <v-icon>phone</v-icon>
          Contact Details
        </v-tabs-item>
            <!-- for reseller account only -->
        <v-tabs-item href="#social-links" v-if="active">
          <v-icon>link</v-icon>
          Social Links
        </v-tabs-item>
        <!-- tabs -->
      </v-tabs-bar>
      <v-tabs-items>
          <!-- tab contents -->
          <account></account>
          <referral-link v-if="active"></referral-link>
          <profile></profile>
          <contact-details v-if="active"></contact-details>
          <social-links v-if="active"></social-links>
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
    mixins: [Theme],
    data: () => ({
        contentClass: { 'grey': true, 'lighten-4': true, 'accent--text': true }
    }),
    components: {
        MainLayout,
        Account,
        ReferralLink,
        ContactDetails,
        Profile,
        SocialLinks
    },
    computed: {
        /* need to logout to reflect changes in account */
        active () {
            return !!this.$store.getters['auth/getMe']['referral_link']['active']
        }
    }
}
</script>
