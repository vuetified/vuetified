<template>
  <v-tabs-content
    id="check-me-out"
  >
    <v-container>
      <v-layout 
        row 
        wrap
      >
        <p class="primary--text">Check Me Out Settings</p>

        <v-flex xs12>
          
          <v-alert 
            color="primary" 
            icon="warning" 
            value="true"
          >
            <span class="white--text">** Login To Your CheckOut Account and Set Your Api Keys and Secret Key **</span>
          </v-alert>
        </v-flex>
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
          <form>

            <v-text-field
              class="primary--text"
              name="api_key"
              label="Check Me Out Api Key"
              v-model="checkMeOutForm.api_key"
              :error-messages="errors.collect('api_key')"
              v-validate="'required'"
              data-vv-name="api_key"
              prepend-icon="fa-key"
              light
              counter="255"
            />
            <v-text-field
              class="primary--text"
              name="secret_key"
              label="Check Me Out Secret Key"
              v-model="checkMeOutForm.secret_key"
              :error-messages="errors.collect('secret_key')"
              v-validate="'required'"
              data-vv-name="secret_key"
              prepend-icon="fa-user-secret "
              light
              counter="255"
            />
          </form>
            
        </v-flex>
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
          <form @submit.prevent="login()">
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
          </form>
        </v-flex>
      </v-layout>
    </v-container>
  </v-tabs-content>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('checkmeout')

export default {
    data: () => ({
        loginForm: {
            email: '',
            password:'',
            token: ''
        },
        checkMeOutForm: new AppForm({
            api_key: '',
            secret_key:''
        }),
        password_visible: false

    }),
    computed: {
        icon () {
            return this.password_visible ? 'visibility' : 'visibility_off'
        }
    },
    mounted () {
        this.getApiKeys()
        this.getProducts()
        this.loginForm.token = this.checkMeOutForm.api_key
    },
    methods: {
        ...mapActions({
            checkmeout: 'checkmeout'
        }),
        login () {
            let self = this
            self.$validator.validateAll()
            if (!self.errors.any()) {
                self.checkmeout(self.loginForm)
              
            }
        },
        getApiKeys(){
            this.checkMeOutForm.api_key = App.checkmeout.api_key
            this.checkMeOutForm.secret_key = App.checkmeout.secret_key
        },
        getProducts(){
            let form = {
                name: 'test',
                amount: 100,
                stock_quantity: 1,
                receptacle: '334d617c-5f22-4057-93c6-3bbf988d7237'
            }
            window.$.ajax({
                type: 'POST',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader ('Authorization', 'Bearer ' + btoa('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTQ3NDg1NjIsInN1YiI6IjQ5NzlhNWMwNjhhNjU0NzI4MzM1MDNmZDIyZDFkYmQzIn0.ZcdJ0loyzGNuFhR3Cv5Ul_HxfS5cNe3XRdAyZZv1GOI'));
                },
                url: 'https://api.checkmeout.ph/v1/products',
                data: form 
            
            }).then(response => {
                console.log('success',response)
            })
          
        }

    }
}
</script>

<style>

</style>
