<template>
    <v-list>
        <v-list-group v-for="item in items" v-bind:key="item.title">
        <v-list-tile slot="item">
            <v-list-tile-action v-if="!item.avatar">
            <v-icon>{{ item.action }}</v-icon>
            </v-list-tile-action>
            <v-avatar size="25px" v-else>
                <img :src="item.avatar" alt="">
            </v-avatar>
            <v-list-tile-content v-if="!isDark">
            <v-list-tile-title :class="{'primary--text': item.active,'blue-grey--text': !item.active, 'text--lighten-1': !item.active}">{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-content v-else>
            <v-list-tile-title :class="{'primary--text': item.active, 'text--lighten-2': item.active}">{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
            <v-icon :class="{'primary--text': !isDark, 'white--text': isDark}">keyboard_arrow_down</v-icon>
            </v-list-tile-action>
        </v-list-tile>
        <!-- Sub Menu Links -->
        <v-link :dark="isDark" v-for="subItem in item.items" :key="subItem.id" :title="subItem.title" :avatar="subItem.avatar" :icon="subItem.action" :href="subItem.href"></v-link>
        </v-list-group>
    </v-list>
</template>

<script>
import VLink from '../components/VLink.vue'
export default {
    props: ['items'],
    components: {
        VLink
    },
    data: () => ({
        dark: App.theme.dark
    }),
    methods: {
        loadview (item, subItem) {
            this.$router.push({ path: `${subItem.href}` })
        },
        hasAvatar (subItem) {
            return subItem.avatar !== undefined
        },
        loadAvatar (avatar) {
            return avatar || 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460'
        },
        isGroupActive (item) {
            let itemsegment = ''
            let segment = ''
            if (item.href !== undefined) {
                itemsegment = item.href.split('/')[1]
                segment = window.location.pathname.split('/')[1]
                if (itemsegment === segment) {
                    item.active = true
                } else {
                    item.active = false
                }
            }
        },
        isActive (subItem) {
            if (subItem.href !== undefined) {
                if (subItem.href === window.location.pathname) {
                    subItem.active = true
                } else {
                    subItem.active = false
                }
            }
        }
    },
    computed: {
        isDark () {
            return this.dark === true
        }
    }

}
</script>
