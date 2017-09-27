<template>
    <modal name="reset-password" :adaptive="true" width="100%" height="100%" :clickToClose="false">
        <v-card :flat="true">
        <v-toolbar class="accent">
          <v-btn icon @click.native="redirectBack()">
            <v-icon class="primary--text">arrow_back</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-title class="text-xs-center primary--text">Reset Password</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
              <!-- If There is no User Account Login Yet Redirect to Authentication Page -->
            <v-btn class="primary--text" flat @click.native="goHome()"><v-icon right dark>fa-home</v-icon></v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text style="padding-top:100px;">
      <v-container fluid>
        <form @submit.prevent="resetPassword()">
        <v-layout row>
          <v-flex xs12 sm12 md4 offset-md4 lg4 offset-lg4 xl4 offset-xl4>
            <v-text-field
              class="primary--text"
              name="username"
              label="Email"
              v-model="passwordResetForm.username"
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
            label="New Password"
            v-model="passwordResetForm.password"
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
        <v-layout row>
          <v-flex xs12 sm12 md4 offset-md4 lg4 offset-lg4 xl4 offset-xl4>
            <v-text-field
            class="primary--text"
            name="password_confirmation"
            label="Confirm New Password"
            v-model="passwordResetForm.password_confirmation"
            :append-icon="icon"
            :append-icon-cb="() => (password_visible = !password_visible)"
            :type="!password_visible ? 'password' : 'text'"
            :rules="[(value) => {
                return value === passwordResetForm.password || 'Password Confirmation is Does Not Match.'
            }]"
            prepend-icon="fa-copy"
            counter="60"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-flex xs12 sm12 md4 offset-md4 lg4 offset-lg4 xl4 offset-xl4>
            <v-btn :loading="passwordResetForm.busy" :disabled="passwordResetForm.busy" type="submit" block :class="{primary: !passwordResetForm.busy, error: passwordResetForm.busy}">Reset Password</v-btn>
        </v-flex>
        </form>
      </v-container>

    </v-card-text>
      </v-card>
    </modal>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('auth')

export default {
    props: ['token'],
    data: () => ({
        passwordResetForm: new AppForm(App.forms.passwordResetForm),
        password_visible: false,
        rules: {
            password: {
                required: (value) => !!value || 'Password is Required.',
                min: (value) => { return value.length > 5 || 'Password is Below 6 Characters' }
            },
            password_confirmation: (value, password) => {
                return value === password || 'Password Confirmation is Does Not Match.'
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
        /* Make Sure We Only Load Reset Password Page If Not Authenticated */
        if (self.getAuth) {
            /* nextick make sure our modal wount be visible before redirect */
            return self.$nextTick(() => self.$router.go(-1))
        }
        /* Show Reset Password Modal */
        self.$modal.show('reset-password')
        self.passwordResetForm.token = self.token
    },
    methods: {
        ...mapActions({
            reset: 'passwordreset'
        }),
        goHome () {
            let self = this
            self.$modal.hide('reset-password')
            self.$nextTick(() => self.$router.push({name: 'home'}))
        },
        redirectBack () {
            let self = this
            self.$modal.hide('reset-password')
            return self.$nextTick(() => self.$router.go(-1))
        },
        resetPassword () {
            let self = this
            self.reset(self.passwordResetForm)
        }
    }
}
</script>
