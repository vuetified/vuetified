<template>
  <v-btn 
    block 
    color="secondary"
    to="/checkmeout/access-token"
    class="white--text"
  >
    Get Access Token
    <v-icon right>fa-sign-in</v-icon
  ></v-btn>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('checkmeout')
export default {
    computed: {
        ...mapGetters({
            getToken: 'getToken'
        })
    }
}
</script>

<style>

</style>
