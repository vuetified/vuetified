<template>
    <v-list-tile :avatar="avatarOn"  @click.native="navigate(href)" :class="[{ styleAvatar: avatarOn }]">
          <v-list-tile-action v-if="iconOn && !avatarOn">
            <v-icon :style="{color: isActive ? activeColor : iconColor, cursor: href ? 'pointer' : ''}">{{ icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-avatar v-if="iconOn && avatarOn">
              <img :src="avatar" alt="">
            </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title  :style="{color: isActive ? activeColor : linkColor}">
              <span :style="{cursor: href ? 'pointer' : ''}">{{ title  }}</span>
            </v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action v-if="iconOn && avatarOn">
            <v-icon :style="{color: isActive ? activeColor : iconColor, cursor: href ? 'pointer' : ''}">{{ icon }}</v-icon>
          </v-list-tile-action>
    </v-list-tile>
</template>

<script>
export default {
    props: {
        dark: {
            type: Boolean,
            default () {
                return App.theme.dark
            }
        },
        href: {
            type: String
        },
        title: {
            type: String
        },
        avatar: {
            type: String,
            default () {
                return ''
            }
        },
        icon: {
            type: String
        },
        iconColor: {
            type: String,
            default () {
                return this.dark ? '#fafafa' : '#78909C' // white or blue-grey lighten-1
            }
        },
        linkColor: {
            type: String,
            default () {
                return this.dark ? '#fafafa' : '#78909C' // white or blue-grey lighten-1
            }
        },
        activeColor: {
            type: String,
            default () {
                return '#4db6ac' // teal lighten 2
            }
        }
    },
    computed: {
        isActive () {
            return this.href === this.$route.path
        },
        isDark () {
            return this.dark === true
        },
        avatarOn () {
            return !!this.avatar
        },
        iconOn () {
            return !!this.icon
        }
    },
    methods: {
        navigate (href) {
            this.$router.push({ path: `${href}` })
        }

    }
}
</script>

<style lang="scss" scoped>
    .styleAvatar {
        position: relative;
        margin-left: -55px;
    }
</style>
