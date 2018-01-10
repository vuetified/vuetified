<template>
  <main-layout 
    :class="[contentClass]" 
    :style="{ paddingTop: `100px` }"
  >
    <v-container fluid>
      <v-layout 
        row 
        wrap
      >
        <v-flex xs12>
          <h1 class="primary--text">Thank You For Purchasing!</h1>

          <h2 class="info--text">An Instruction on How To Settle Payment</h2>

          <h2 class="info--text">Was Sent To Your Registered Email</h2>
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
          <v-card-actions>
            <v-btn 
              @click.native="goTo('/dashboard')" 
              block 
              flat 
              color="primary"
            >
              View Orders 
              <v-icon right>fa-cubes</v-icon>
            </v-btn>
            <v-btn 
              @click.native="goTo('/products')" 
              block
              flat 
              color="teal"
            >
              Continue Shopping 
              <v-icon right>fa-shopping-bag</v-icon>
            </v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>
    </v-container>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import Theme from '../mixins/theme'

export default {
    components: {
        MainLayout
    },
    mixins: [Theme],
    data: () => ({
        contentClass: { 'grey': true, 'lighten-4': true, 'accent--text': true, 'text-xs-center': true }
    }),
    methods: {
        goTo (route) {
            let self = this
            self.$router.push({path: route})
        }
    },
    head: {
        title: function () {
            return {
                inner: 'Thank You',
                separator: '-',
                complement: App.site.trademark
            }
        },
        // Meta tags
        meta: [
            { name: 'application-name', content: App.site.trademark },
            { name: 'description', content: App.site.description, id: 'desc' }, // id to replace intead of create element
            // Facebook / Open Graph
            { property: 'fb:app_id', content: App.site.fb_id },
            { property: 'og:title', content: App.site.title },
            { property: 'og:type', content: 'website' },
            { property: 'og:image', content: App.site.logo.url },
            { property: 'og:description', content: App.site.description },
            { property: 'og:site_name', content: App.site.trademark },
            { property: 'og:locale', content: 'en_US' },
            { property: 'article:author', content: App.site.trademark }
        ],
        // link tags
        link: [
            { rel: 'canonical', href: window.location.href, id: 'canonical' }
        ]
        
        
    }

}
</script>

<style>

</style>
