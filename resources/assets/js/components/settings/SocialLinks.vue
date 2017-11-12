<template>
    <v-tabs-content
    id="social-links"
    >
        <v-container>
            <v-layout row wrap>
                <p class="primary--text">Social Links</p>
                <v-flex xs12>
                    <v-alert color="primary" icon="warning" value="true">
                            <span class="white--text">** This Will Be Displayed Publicly in The Homepage **</span>
                    </v-alert>
                </v-flex>
                <v-flex xs12>
                    <v-text-field
                    :label="toProperCase(key)"
                    v-model="social_links[key]"
                    light
                    v-for="(value,key,index) in social_links" :key="key" :index="index"
                    v-validate="{ required: true, regex: /^((https?):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#.]+\/?)*$/ }"
                    :error-messages="errors.collect(key)"
                    :data-vv-name="key"
                    >
                    </v-text-field>
                </v-flex>
                <v-btn block color="primary" @click.native="updateSocialLinks()"
                :disabled="errors.any()"
                :loading="socialLinksForm.busy"
                :class="{primary: !socialLinksForm.busy, error: socialLinksForm.busy}"
                class="white--text"
                light
                >Update Social Links
                    <v-icon right>fa-send</v-icon>
                </v-btn>
                <v-btn block color="accent" @click="social_modal = true"
                >New Social Link
                    <v-icon right>fa-plus</v-icon>
                </v-btn>
                <v-dialog v-model="social_modal" persistent width="600px">
                    <v-card light>
                    <v-card-title class="headline">Add New Social Link</v-card-title>
                    <v-container>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-text-field
                                :label="toProperCase(key)"
                                v-model="social_tmp[key]"
                                light
                                v-for="(value,key,index) in social_tmp" :key="key" :index="index"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                        color="green darken-1" flat @click.native="addSocialInput()"
                        :disabled="isDisabled(social_tmp)"
                        light
                        >
                        Create Social Link
                        </v-btn>
                        <v-btn color="error" flat @click.native="closeSocialInput()">Cancel</v-btn>
                    </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-layout>
        </v-container>
    </v-tabs-content>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('auth')

export default {
    data: () => ({
        social_modal: false,
        social_links: {},
        social_tmp: {
            title: null,
            value: null
        },
        socialLinksForm: new AppForm(App.forms.socialLinksForm)
    }),
    computed: {
        ...mapGetters({
            getMe: 'getMe'
        })
    },
    mounted () {
        let self = this
        self.social_links = self.getMe.social_links
    },
    methods: {
        ...mapMutations({
            setMe: 'setMe'
        }),
        isDisabled (object) {
            if (object.title && object.value) {
                return false
            } else {
                return true
            }
        },
        prepareSocialLinkForm () {
            let self = this
            self.socialLinksForm.social_links = self.social_links
        },
        resetSocialLinkForm () {
            let self = this
            self.socialLinksForm = new AppForm(App.forms.socialLinksForm)
        },
        async updateSocialLinks () {
            let self = this
            self.prepareSocialLinkForm()
            self.$validator.validateAll()
            if (!self.errors.any()) {
                self.socialLinksForm.busy = true
                try {
                    const payload = (await App.post(route('api.user.updateSocialLink'), self.socialLinksForm))
                    self.resetSocialLinkForm()
                    self.setMe(payload.data)
                    vm.$popup({ message: payload.message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
                } catch ({errors, message}) {
                    self.socialLinksForm.errors.set(errors)
                    self.socialLinksForm.busy = false
                    vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
                }
            }
        },
        closeSocialInput () {
            this.social_tmp.title = null
            this.social_tmp.value = null
            this.social_modal = false
        },
        addSocialInput () {
            if (this.social_tmp.title && this.social_tmp.value) {
                this.$set(this.social_links, this.social_tmp.title, this.social_tmp.value)
            }
            this.social_tmp.title = null
            this.social_tmp.value = null
            this.social_modal = false
            /* send ajax to add new contact info */
            // update getMe
        },
        toProperCase (key) {
            let newStr = key.replace(/_/g, ' ')
            return newStr.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
        }
    }
}
</script>

<style>

</style>
