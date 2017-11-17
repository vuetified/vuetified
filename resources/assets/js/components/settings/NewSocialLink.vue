<template>
  <v-dialog v-model="social_modal" persistent width="600px">
    <v-card light>
    <v-card-title class="headline">Add New Social Link</v-card-title>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-text-field
                label="Site Name"
                v-model="social_tmp['title']"
                v-validate="{ required: true}"
                :error-messages="errors.collect('site name')"
                data-vv-name="site name"
                light
                >
                </v-text-field>
                <v-text-field
                label="Site Url"
                v-model="social_tmp['value']"
                light
                v-validate="{ required: true, regex: /^((https?):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#.]+\/?)*$/ }"
                :error-messages="errors.collect('site url')"
                data-vv-name="site url"
                >
                </v-text-field>
            </v-flex>
        </v-layout>
    </v-container>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
        color="green darken-1" flat @click.native="addSocialInput()"
        :disabled="isDisabled()"
        light
        >
        Create Social Link
        </v-btn>
        <v-btn color="error" flat @click.native="closeSocialInput()">Cancel</v-btn>
    </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    data: () => ({
        social_modal: false,
        social_tmp: {
            title: null,
            value: null
        },
        socialLinksForm: new AppForm(App.forms.socialLinksForm)
    }),
    mounted () {
        let self = this
        Bus.$on('add-new-social-link', () => {
            self.social_modal = true
        })
    },
    methods: {
        isDisabled () {
            let self = this
            if (!self.errors.any()) {
                return false
            } else {
                return true
            }
        },
        closeSocialInput () {
            this.social_tmp.title = null
            this.social_tmp.value = null
            this.social_modal = false
        },
        addSocialInput () {
            if (this.social_tmp.title && this.social_tmp.value) {
                Bus.$emit('update-social-link', this.social_tmp)
            }
            this.social_tmp.title = null
            this.social_tmp.value = null
            this.social_modal = false
        }
    }
}
</script>

<style>

</style>
