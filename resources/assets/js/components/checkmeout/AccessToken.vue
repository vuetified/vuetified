<template>
  <modal-layout>
    <v-card :flat="true">
      <v-toolbar class="accent">
        <v-btn 
          flat 
          icon 
          color="white"
          @click.native="redirectBack()"
        >
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-spacer/>
        <v-toolbar-title class="text-xs-center white--text">Authorize Your Checkmeout Account</v-toolbar-title>
        <v-spacer/>

      </v-toolbar>
      <v-card-text style="padding-top:100px;">
        <v-container fluid>
          <form @submit.prevent="login()">
            <v-layout row>
              <v-flex 
                xs12 
                sm12 
                md4 
                offset-md4 
                lg4 
                offset-lg4 
                xl4 
                offset-xl4
              >
                <v-text-field
                  class="primary--text"
                  name="email"
                  label="Type Your Account Email"
                  v-model="loginForm.email"
                  :error-messages="errors.collect('email')"
                  v-validate="'required|email'"
                  data-vv-name="email"
                  prepend-icon="email"
                  light
                  counter="255"
                />
                <v-text-field
                  class="primary--text"
                  name="password"
                  label="Enter your password"
                  hint="At least 6 characters"
                  v-model="loginForm.password"
                  :append-icon="icon"
                  :append-icon-cb="() => (password_visible = !password_visible)"
                  :type="!password_visible ? 'password' : 'text'"
                  v-validate="'required|min:6'"
                  :error-messages="errors.collect('password')"
                  data-vv-name="password"
                  counter="255"
                  prepend-icon="fa-key"
                  light
                />
                <v-btn 
                  block 
                  :loading="loginForm.busy" 
                  :disabled="errors.any()" 
                  type="submit" 
                  color="primary"
                  light
                  class="white--text"
                >
                  Sign In 
                  <v-icon right>fa-sign-in</v-icon
                ></v-btn>
              </v-flex>
            </v-layout>
            
        </form></v-container>

      </v-card-text>
    </v-card>
  </modal-layout>
</template>

<script>
import ModalLayout from '../../layouts/ModalLayout'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('checkmeout')

export default {
    components: {
        ModalLayout
    },
    data: () => ({
        loginForm: new AppForm({
            email: '',
            password:'',
            token: ''
        }),
        password_visible: false
    }),
    computed: {
        icon () {
            return this.password_visible ? 'visibility' : 'visibility_off'
        }
    },
    methods: {
        ...mapActions({
            authorize: 'login'
        }),
        login () {
            let self = this
            self.$validator.validateAll()
            if (!self.errors.any()) {
                self.authorize(self.loginForm)
            }
        },
        redirectBack () {
            let self = this
            return self.$nextTick(() => self.$router.go(-1))
        }
    }
}
</script>

<style>

</style>
