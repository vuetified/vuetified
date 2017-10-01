<template>
    <modal name="login-modal" :adaptive="true" width="100%" height="100%" :clickToClose="false">
        <v-card :flat="true">
        <v-toolbar class="accent">
          <v-btn icon @click.native="redirectBack()">
            <v-icon class="primary--text">arrow_back</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-title class="text-xs-center primary--text">Customer Login Page</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
              <!-- If There is no User Account Login Yet Redirect to Authentication Page -->
            <v-btn class="primary--text" flat @click.native="goHome()"><v-icon right dark>fa-home</v-icon></v-btn>
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
              :rules="[rules.username.required, rules.username.email]"
              prepend-icon="email"
              counter="60"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm12 md4 offset-md4 lg4 offset-lg4 xl4 offset-xl4>
            <v-text-field
            class="primary--text"
            name="password"
            label="Enter your password"
            hint="At least 8 characters"
            v-model="loginForm.password"
            min="8"
            :append-icon="icon"
            :append-icon-cb="() => (password_visible = !password_visible)"
            :type="!password_visible ? 'password' : 'text'"
            :rules="[rules.password.required, rules.password.min]"
            prepend-icon="fa-key"
            counter="60"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-flex xs12 sm12 md4 offset-md4 lg4 offset-lg4 xl4 offset-xl4>
            <v-btn :loading="loginForm.busy" :disabled="loginForm.busy" type="submit" block :class="{primary: !loginForm.busy, error: loginForm.busy}">Login</v-btn>

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
    </modal>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('auth')

export default {
    data: () => ({
        loginForm: new AppForm(App.forms.loginForm),
        password_visible: false,
        rules: {
            password: {
                required: (value) => !!value || 'Password is Required.',
                min: (value) => { return value.length > 5 || 'Password is Below 6 Characters' }
            },
            username: {
                required: (value) => !!value || 'Email is Required.',
                email: (value) => {
                    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                }
            }

        }
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
        /* Show Login Modal */
        self.$modal.show('login-modal')
    },
    methods: {
        resetPassword () {
            let self = this
            self.$modal.hide('login-modal')
            self.$nextTick(() => self.$router.push({name: 'forgotpassword'}))
        },
        goHome () {
            let self = this
            self.$modal.hide('login-modal')
            self.$nextTick(() => self.$router.push({name: 'home'}))
        },
        goToRegister () {
            let self = this
            self.$modal.hide('login-modal')
            self.$nextTick(() => self.$router.push({name: 'register'}))
        },
        redirectBack () {
            let self = this
            self.$modal.hide('login-modal')
            return self.$nextTick(() => self.$router.go(-1))
        },
        login () {
            let self = this
            self.submit(self.loginForm)
        },
        ...mapActions({
            submit: 'login'
        })
    }
}
</script>
