<template>
  <v-app 
    :dark="App.theme.dark" 
    v-cloak
  >
    <left-side-bar/>
    <app-nav-bar/>
    <main>
      <!-- added fluid and pa-0 ma-0 for full screen pages -->
      <v-container 
        transition="slide-x-transition" 
        fluid 
        pa-0
        ma-0
      >
        <slot/>
      </v-container>
    </main>
    <!-- <shopping-cart></shopping-cart> -->
    <fab-button/>
    <cookie-law/>
    <app-footer/>
  </v-app>
</template>

<script>
import AppFooter from '../partials/AppFooter.vue'
import AppNavBar from '../partials/AppNavBar.vue'
import LeftSideBar from '../partials/LeftSideBar.vue'
import FabButton from '../components/FabButton.vue'
import CookieLaw from '../partials/CookieLaw.vue'
// import ShoppingCart from '../partials/ShoppingCart.vue'

export default {
    components: {
        AppFooter,
        AppNavBar,
        LeftSideBar,
        FabButton,
        CookieLaw
        // ShoppingCart
    }
}
</script>
