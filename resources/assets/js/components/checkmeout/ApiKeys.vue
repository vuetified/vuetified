<template>
  <form @submit.prevent="addKeys()">
    <!--
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
      type="password"
      v-model="checkMeOutForm.secret_key"
      :error-messages="errors.collect('secret_key')"
      v-validate="'required'"
      data-vv-name="secret_key"
      prepend-icon="fa-user-secret "
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
    -->
    <v-btn 
      v-if="!getToken"
      block 
      color="secondary"
      to="/checkmeout/access-token"
      class="white--text"
    >
      Get Access Token
      <v-icon right>fa-sign-in</v-icon
    ></v-btn>
  </form>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('checkmeout')
export default {
    data: () => ({
        checkMeOutForm: new AppForm({
            api_key: '',
            secret_key:''
        })
    }),
    computed: {
        ...mapGetters({
            getToken: 'getToken'
        })
    }
}
</script>

<style>

</style>
