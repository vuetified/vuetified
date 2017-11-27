<template>
  <v-toolbar :style="navbarStyle" :dark="!isDark" fixed>
    <v-toolbar-side-icon :style="toggleBarStyle" @click.native.stop="toggleDrawer()"></v-toolbar-side-icon>
        <!-- Title -->
        <v-toolbar-title v-if="extension" class="text-xs-center" slot="extension">
            <v-icon :style="{color: iconColor }" class="ml-3 hidden-md-and-down" v-if="showIcon">{{ icon }}</v-icon>
            <span class="hidden-md-and-down" :style="titleStyle">{{ title }}</span>
        </v-toolbar-title>
        <v-toolbar-title v-else class="text-xs-center">
            <v-icon :style="{color: iconColor }" class="ml-3 hidden-md-and-down" v-if="showIcon">{{ icon }}</v-icon>
            <span class="hidden-md-and-down" :style="titleStyle">{{ title }}</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- center logo -->
        <img v-if="showLogo"   :src="logo" :style="[logoStyle]"  alt="vuejs">
        <v-spacer></v-spacer>
        <!-- Add Here All Your Nav Icons -->
        <v-tooltip left>
        <v-btn flat icon color="primary" slot="activator" @click="openCart()">
        <v-badge left>
        <span slot="badge">{{ count }}</span>
        <v-icon>shopping_cart</v-icon>
        </v-badge>
        </v-btn>
        <span>View | Cart</span>
        </v-tooltip>
</v-toolbar>
</template>

<script>
import Theme from '../mixins/theme'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('cart')

export default {
    mixins: [Theme],
    data: () => ({
        extension: false,
        count: 0
    }),
    computed: {
        ...mapState({
            getCount: 'count'
        })
    },
    created () {
        /* Emit On a Child Component If You Want This To Be Visible */
        Bus.$on('header-extension-visible', (visibility) => {
            this.extension = visibility
        })
    },
    mounted () {
        let self = this
        self.count = self.getCount
    },
    methods: {
        /* Use Vuetify Modal */
        openShoppingCart () {
            Bus.$emit('shopping-cart-open')
        },
        toggleDrawer () {
            Bus.$emit('toggleDrawer')
        },
        /* Uses Cart Route */
        openCart () {
            let self = this
            self.$router.push({ name: 'cart' })
        }
    },
    watch: {
        getCount (newValue) {
            let self = this
            self.count = newValue
        }
    }
}
</script>

<style>

</style>
