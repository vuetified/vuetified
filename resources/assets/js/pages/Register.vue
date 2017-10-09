<template>
    <modal-layout>
        <v-card :flat="true">
        <v-toolbar class="accent">
          <v-btn flat icon color="primary" @click.native="redirectBack()">
          <v-icon>arrow_back</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-title class="text-xs-center primary--text">Registration Page</v-toolbar-title>
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
        <v-form v-model="valid" ref="form" lazy-validation @submit.prevent="register()">
        <v-layout row>
          <v-flex xs12 sm12 md4 offset-md4 lg4 offset-lg4 xl4 offset-xl4>
            <v-text-field
              class="primary--text"
              name="name"
              label="Full Name"
              v-model="registerForm.name"
              :rules="nameRules"
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
              :rules="usernameRules"
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
            :rules="passwordRules"
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
            <v-btn :loading="registerForm.busy" :disabled="!valid" type="submit" block :class="{primary: !registerForm.busy, error: registerForm.busy}">Register</v-btn>
            <v-btn @click.native="goToLogin()" block flat class="info--text info">Already Have An Account? Go Login</v-btn>
         </v-flex>
        </v-form>
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
        valid: true,
        registerForm: new AppForm(App.forms.registerForm),
        password_visible: false,
        usernameRules: [
            (v) => !!v || 'E-mail is required',
            (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        passwordRules: [
            (v) => !!v || 'Password is Required.',
            (v) => { return v.length > 5 || 'Password is Below 6 Characters' }
        ],
        nameRules: [
            (v) => !!v || 'Name is Required.'
        ]

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
            if (self.$refs.form.validate()) {
                self.submit(self.registerForm)
            }
        }
    },
    components: {
        ModalLayout
    }
}
</script>
