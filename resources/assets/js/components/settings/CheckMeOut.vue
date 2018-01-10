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
            <span class="white--text">** Copy And Paste Your Checkmeout Api Keys Here **</span>
          </v-alert>
        </v-flex>
        <v-flex
          xs12 
        >
          <api-keys/>
        </v-flex>
        
      </v-layout>
    </v-container>
  </v-tabs-content>
</template>

<script>
import ApiKeys from '../../components/checkmeout/ApiKeys'

export default {
    components: {
        ApiKeys
    }
    
}
</script>

<style>

</style>
