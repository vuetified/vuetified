<template>
<v-footer :class="[footerClass]">
<v-spacer></v-spacer><span>© {{ year }} {{ domain }} ® | {{ trademark }}™</span><v-spacer></v-spacer>
</v-footer>
</template>

<script>
import Theme from '../mixins/theme'
import VLink from '../components/VLink.vue'
export default {
    mixins: [Theme],
    data: () => ({
        footerClass: {'primary--text': true}
    }),
    created () {
        /* Emit On a Child Component If You Want This To Be Visible */
        Bus.$on('footer-content-visible', (visibility) => {
            this.contentVisible = visibility
        })
    },
    components: {
        VLink
    }
}
</script>

<style>

</style>
