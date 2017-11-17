<template>
<v-tabs-content
          id="referral-link"
    >
        <v-container>
            <v-layout row wrap>
                <p class="primary--text">Referral Link</p>
                <v-flex xs12>
                    <v-alert color="primary" icon="fa-link" value="true">
                        <v-list dense light class="primary">
                            <v-link  link-color="white" :dark="false"  :title="`Your Online Shop Link : ${href}`" :href="href"></v-link>
                        </v-list>
                    </v-alert>
                </v-flex>
                <v-flex xs12>
                    <v-text-field
                    label="Referral Link"
                    v-model="link"
                    light
                    v-validate="{ required: true, regex: /^[a-zA-Z0-9][a-zA-Z0-9.-]+[a-zA-Z0-9]$/ }"
                    :error-messages="errors.collect('referral link')"
                    data-vv-name="referral link"
                    >
                    </v-text-field>
                </v-flex>
                <v-btn block color="primary" @click="updateLink()">
                    Update Referral Link <v-icon right>fa-send</v-icon>
                </v-btn>
            </v-layout>
        </v-container>
    </v-tabs-content>
</template>

<script>
import VLink from '../VLink.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('auth')

export default {
    data: () => ({
        linkForm: new AppForm(App.forms.linkForm),
        link: null
    }),
    computed: {
        ...mapGetters({
            getMe: 'getMe'
        }),
        href () {
            return `http://${this.link}.${App.site.domain}`
        }
    },
    components: {
        VLink
    },
    mounted () {
        let self = this
        self.link = self.getMe.referral_link.link
        self.link_id = self.getMe.referral_link.id
        self.user_id = self.getMe.id
    },
    methods: {
        ...mapMutations({
            setMe: 'setMe'
        }),
        prepareLinkForm () {
            let self = this
            self.linkForm.link = self.link
            self.linkForm.link_id = self.link_id
            self.linkForm.user_id = self.user_id
        },
        resetLinkForm () {
            this.linkForm = new AppForm(App.forms.linkForm)
        },
        async updateLink () {
            let self = this
            self.linkForm.busy = true
            self.prepareLinkForm()
            try {
                const payload = (await App.post(route('api.user.updateReferralLink'), self.linkForm))
                self.resetLinkForm()
                self.setMe(payload.data)
                /* logout ->redirect to main link /login */

                vm.$popup({ message: payload.message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
            } catch ({errors, message}) {
                self.linkForm.errors.set(errors)
                self.linkForm.busy = false
                vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
            }
        }
    }
}
</script>

<style>

</style>
