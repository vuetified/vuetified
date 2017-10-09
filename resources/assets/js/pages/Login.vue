<template>
    <modal-layout>
        <v-card :flat="true">
        <v-toolbar class="accent">
          <v-btn flat icon color="primary" @click.native="redirectBack()">
          <v-icon>arrow_back</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-title class="text-xs-center primary--text">Customer Login Page</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
              <!-- If There is no User Account Login Yet Redirect to Authentication Page -->
            <v-btn flat color="primary" @click.native="goHome()">
            <v-icon>fa-home</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text style="padding-top:100px;">
      <v-container fluid>
        <form @submit.prevent="login()">
        <v-layout row>
          <v-flex xs12 sm12 md4 offset-md4 lg4 offset-lg4 xl4 offset-xl4>
            <v-text-field
              class="primary--text"
              name="username"
              label="Type Your Account Email"
              v-model="loginForm.username"
              :error-messages="errors.collect('username')"
              v-validate="'required|email'"
              data-vv-name="username"
              prepend-icon="email"
              counter="255"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm12 md4 offset-md4 lg4 offset-lg4 xl4 offset-xl4>
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
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-flex xs12 sm12 md4 offset-md4 lg4 offset-lg4 xl4 offset-xl4>
            <v-btn :loading="loginForm.busy" :disabled="errors.any()"  type="submit" block :class="{primary: !loginForm.busy, error: loginForm.busy}">Login</v-btn>

        </v-flex>
        <v-flex xs12 sm12 md4 offset-md4 lg4 offset-lg4 xl4 offset-xl4>
            <v-card-actions>
            <v-btn @click.native="goToRegister()" block flat class="info--text info">No Account Yet?</v-btn>
            <v-btn @click.native="resetPassword()" block flat class="error--text error">Forgot Password?</v-btn>
            </v-card-actions>
        </v-flex>
        </form>
      </v-container>

    </v-card-text>
      </v-card>
    </modal-layout>
</template>

<script>
import ModalLayout from '../layouts/ModalLayout'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('auth')

export default {
    data: () => ({
        loginForm: new AppForm(App.forms.loginForm),
        password_visible: false

    }),
    computed: {
        icon () {
            return this.password_visible ? 'visibility' : 'visibility_off'
        },
        ...mapGetters({
            getAuth: 'getAuth'
        })
    },
    mounted () {
        let self = this
        /* Make Sure We Only Load Login Page If Not Authenticated */
        if (self.getAuth) {
            /* nextick make sure our modal wount be visible before redirect */
            return self.$nextTick(() => self.$router.go(-1))
        }
    },
    methods: {
        resetPassword () {
            let self = this
            self.$nextTick(() => self.$router.push({name: 'forgotpassword'}))
        },
        goHome () {
            let self = this
            self.$nextTick(() => self.$router.push({name: 'home'}))
        },
        goToRegister () {
            let self = this
            self.$nextTick(() => self.$router.push({name: 'register'}))
        },
        redirectBack () {
            let self = this
            return self.$nextTick(() => self.$router.go(-1))
        },
        login () {
            let self = this
            self.$validator.validateAll()
            if (!self.errors.any()) {
                self.submit(self.loginForm)
            }
        },
        ...mapActions({
            submit: 'login'
        })
    },
    components: {
        ModalLayout
    }
}
</script>
