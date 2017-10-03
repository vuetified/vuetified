<template>
  <v-speed-dial
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :hover="hover"
      :transition="transition"
      :absolute="absolute"
      :fixed="fixed"
    >
      <v-btn
        slot="activator"
        :class="[activeFab.class]"
        dark
        fab
        hover
        v-model="fab"
      >
        <v-icon class="white--text">{{ activeFab.icon }}</v-icon>
        <v-icon class="error--text">close</v-icon>
      </v-btn>
      <v-btn
        v-for="button in buttons" :key="button.name"
        v-if="isVisible(button)"
        fab
        dark
        small
        :class="[button.class]"
        @click.native="navigate(button)"
      >
        <v-icon>{{ button.icon }}</v-icon>
      </v-btn>
    </v-speed-dial>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('auth')
export default {
    data: () => ({
        direction: 'top',
        fixed: true,
        fab: false,
        hover: false,
        top: false,
        right: true,
        bottom: true,
        left: false,
        absolute: false,
        transition: 'slide-y-reverse-transition',
        buttons: [
            { name: 'home', href: '/', class: 'indigo lighten-2', icon: 'fa-home', requiresAuth: false },
            { name: 'dashboard', href: '/dashboard', class: 'amber lighten-2', icon: 'fa-shopping-bag', requiresAuth: false },
            { name: 'login', href: '/login', class: 'success', icon: 'fa-key', requiresAuth: false },
            { name: 'register', href: '/register', class: 'info', icon: 'fa-user-plus', requiresAuth: false },
            { name: 'logout', href: '/logout', class: 'red lighten-2', icon: 'fa-power-off', requiresAuth: true },
            { name: 'scroll-up', href: null, class: 'blue-grey', icon: 'flight_takeoff', requiresAuth: false }
        ],
        activeFab: {
            'class': 'primary', icon: 'fa-rocket'
        }
    }),
    computed: {
        ...mapGetters({
            getAuth: 'getAuth'
        })
    },
    watch: {
        top (val) {
            this.bottom = !val
        },
        right (val) {
            this.left = !val
        },
        bottom (val) {
            this.top = !val
        },
        left (val) {
            this.right = !val
        }
    },
    methods: {
        navigate (button) {
            let self = this
            self.activeFab = { class: button.class, icon: button.icon }

            setTimeout(() => {
                self.activeFab = {
                    'class': 'primary', icon: 'fa-rocket'
                }
                if (button.href !== null) {
                    self.$router.push({ path: `${button.href}` })
                } else {
                    self.scrollToTop(300)
                }
            }, 500)
        },
        scrollToTop (scrollDuration) {
            var cosParameter = window.scrollY / 2
            var scrollCount = 0
            var oldTimestamp = performance.now()

            function step (newTimestamp) {
                scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp))
                if (scrollCount >= Math.PI) window.scrollTo(0, 0)
                if (window.scrollY === 0) return
                window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)))
                oldTimestamp = newTimestamp
                window.requestAnimationFrame(step)
            }

            window.requestAnimationFrame(step)
        },
        isVisible (button) {
            let self = this
            if (button.requiresAuth === false && button.name === 'login') {
                return !self.getAuth
            } else if (button.requiresAuth === false && button.name === 'register') {
                return !self.getAuth
            } else if (button.requiresAuth === true) {
                return self.getAuth
            } else if (button.requiresAuth === false) {
                return true
            }
        }
    }
}
</script>
