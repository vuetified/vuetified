<template>
  <form @submit.prevent="submit()">

    <v-text-field
      class="primary--text"
      name="api_key"
      label="Api Key"
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
      label="Secret Key"
      v-model="checkMeOutForm.secret_key"
      :error-messages="errors.collect('secret_key')"
      v-validate="'required'"
      data-vv-name="secret_key"
      prepend-icon="fa-user-secret "
      :append-icon="icon"
      :append-icon-cb="() => (password_visible = !password_visible)"
      :type="!password_visible ? 'password' : 'text'"
      light
      counter="255"
    />
    <v-btn 
      block 
      :loading="checkMeOutForm.busy" 
      :disabled="errors.any()" 
      type="submit" 
      color="primary"
      light
      class="white--text"
    >
      Save
      <v-icon right>fa-save</v-icon
    ></v-btn>
  </form>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('checkmeout')
export default {
    data: () => ({
        checkMeOutForm: new AppForm({
            api_key: '',
            secret_key:''
        }),
        password_visible: false
    }),
    computed: {
        ...mapGetters({
            getApiKey: 'getApiKey',
            getSecretKey: 'getSecretKey'
        }),
        icon () {
            return this.password_visible ? 'visibility' : 'visibility_off'
        }
    },
    mounted(){
        this.fetchKeys()
        this.checkMeOutForm.api_key = this.getApiKey
        this.checkMeOutForm.secret_key = this.getSecretKey
    },
    methods: {
        ...mapActions({
            addKeys: 'addKeys',
            fetchKeys: 'fetchKeys'
        }),
        submit(){
            this.addKeys(this.checkMeOutForm)
        }
    }
}
</script>

<style>

</style>
