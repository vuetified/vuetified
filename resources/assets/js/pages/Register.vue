<template>
    <modal name="register-modal" :adaptive="true" width="100%" height="100%" :clickToClose="false">
        <v-card :flat="true">
        <v-toolbar class="accent">
          <v-btn icon @click.native="redirectBack()">
            <v-icon class="primary--text">arrow_back</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-title class="text-xs-center primary--text">Registration Page</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
              <!-- If There is no User Account Login Yet Redirect to Authentication Page -->
            <v-btn class="primary--text" flat @click.native="goHome()"><v-icon right dark>fa-home</v-icon></v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text style="padding-top:100px;">
      <v-container fluid>
        <form @submit.prevent="register()">
        <v-layout row>
          <v-flex xs12 sm12 md4 offset-md4 lg4 offset-lg4 xl4 offset-xl4>
            <v-text-field
              class="primary--text"
              name="name"
              label="Full Name"
              v-model="registerForm.name"
              :rules="[rules.name.required]"
              counter="60"
              prepend-icon="fa-user"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm12 md4 offset-md4 lg4 offset-lg4 xl4 offset-xl4>
            <v-text-field
              class="primary--text"
              name="email"
              label="Email"
              v-model="registerForm.username"
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
            label="Password"
            v-model="registerForm.password"
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
            label="Confirm Password"
            v-model="registerForm.password_confirmation"
            :append-icon="icon"
            :append-icon-cb="() => (password_visible = !password_visible)"
            :type="!password_visible ? 'password' : 'text'"
            :rules="[(value) => {
                return value === registerForm.password || 'Password Confirmation is Does Not Match.'
            }]"
            prepend-icon="fa-copy"
            counter="60"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-flex xs12 sm12 md4 offset-md4 lg4 offset-lg4 xl4 offset-xl4>
            <v-btn :loading="registerForm.busy" :disabled="registerForm.busy" type="submit" block :class="{primary: !registerForm.busy, error: registerForm.busy}">Register</v-btn>
            <v-btn @click.native="goToLogin()" block flat class="info--text info">Already Have An Account? Go Login</v-btn>
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
        registerForm: new AppForm(App.forms.registerForm),
        password_visible: false,
        rules: {
            name: {
                required: (value) => !!value || 'Full Name is Required.'
            },
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
        ...mapGetters({
            getAuth: 'getAuth'
        }),
        icon () {
            return this.password_visible ? 'visibility' : 'visibility_off'
        }
    },
    mounted () {
        let self = this
        /* Make Sure We Only Load Registration Page If Not Authenticated */
        if (self.getAuth) {
            /* nextick make sure our modal wount be visible before redirect */
            return self.$nextTick(() => self.$router.go(-1))
        }
        /* Show Registration Modal */
        self.$modal.show('register-modal')
    },
    methods: {
        ...mapActions({
            submit: 'register'
        }),
        goHome () {
            let self = this
            self.$modal.hide('register-modal')
            self.$nextTick(() => self.$router.push({name: 'home'}))
        },
        goToLogin () {
            let self = this
            self.$modal.hide('register-modal')
            self.$nextTick(() => self.$router.push({name: 'login'}))
        },
        redirectBack () {
            let self = this
            self.$modal.hide('register-modal')
            return self.$nextTick(() => self.$router.go(-1))
        },
        register () {
            let self = this
            self.submit(self.registerForm)
        }
    }
}
</script>
