<template>
  <v-navigation-drawer
      temporary
      hide-overlay
      height="100%"
      enable-resize-watcher
      v-model="drawer"
    >
      <v-list dense>
        <!-- V-For Links From Menu -->
        <v-link :dark="darkClass" v-for="link in links" :key="link.id" :title="link.title" :href="link.href" :icon="link.action"></v-link>
        <!-- Individual Link (Custom Additional) -->
        <v-link :dark="darkClass"  title="Company Profile" :href="'/about'"   icon="fa-building"></v-link>
        <v-link :dark="darkClass"  title="Products" :href="'/products'"   icon="fa-shopping-basket"></v-link>
        <v-link :dark="darkClass"  title="Categories" :href="'/categories'"   icon="fa-tag"></v-link>
        <!-- Expandable Group Links from Group Link -->
        <category-link :dark="darkClass" :items="grouplinks"></category-link>
        <v-subheader :class="{'blue-grey--text': !isDark, 'text--lighten-1': !isDark, 'white--text': isDark}">Members Area</v-subheader>
        <!-- Admin Only Accessible -->
        <v-link v-if="getAuth && getMe.isAdmin" :dark="darkClass"  title="User Management"  :href="'/users'" icon="fa-users"></v-link>
        <!-- Normal User Links -->
        <v-link v-if="getAuth" :dark="darkClass"  title="Dashboard"  :href="'/dashboard'" icon="dashboard"></v-link>
        <v-link v-if="getAuth" :dark="darkClass"  title="Settings"  :href="'/settings'" icon="fa-cogs"></v-link>
        <v-link v-if="getAuth" :dark="darkClass"  title="Logout"  :href="'/logout'" icon="power_settings_new"></v-link>
        <!-- Guest Links -->
        <v-link v-if="!getAuth" :dark="darkClass"  title="Login"  :href="'/login'" icon="fa-key"></v-link>
        <v-link v-if="!getAuth" :dark="darkClass"  title="Register"  :href="'/register'" icon="fa-user-plus"></v-link>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import VLink from '../components/VLink.vue'
import CategoryLink from '../components/CategoryLink.vue'
import Theme from '../mixins/theme'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('auth')

export default {
    mixins: [Theme],
    data: () => ({
        drawer: false,
        links: [], // site navigation links
        members: [], // change with featured Products
        grouplinks: [] // product categories
    }),
    computed: {
        ...mapGetters({
            getAuth: 'getAuth',
            getMe: 'getMe'
        })
    },
    components: {
        VLink,
        CategoryLink
    },
    mounted () {
        var self = this
        Bus.$on('toggleDrawer', function () {
            self.drawer = !self.drawer
        })
        self.fetchCategories()
        self.fetchNavLinks()
    },
    methods: {
        fetchCategories () {
            this.grouplinks = App.grouplinks
        },
        fetchNavLinks () {
            this.links = App.menu
        }

    }

}
</script>
