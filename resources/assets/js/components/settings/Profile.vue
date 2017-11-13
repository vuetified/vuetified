<template>
    <v-tabs-content
    id="profile"
    >
        <v-container>
            <v-layout row wrap>
                <p class="primary--text">Profile Details</p>
                <v-flex xs12>
                    <v-alert color="primary" icon="warning" value="true">
                        <span class="white--text">** This Will be Used as Default for Shipping and Payment Details **</span>
                    </v-alert>
                </v-flex>
                <v-flex xs12>
                    <v-text-field
                    :label="toProperCase(key)"
                    v-model="profile[key]"
                    light
                    v-for="(value,key,index) in profile" :key="key" :index="index"
                    v-validate="{ required: true, regex: /^[a-zA-Z0-9 +@#]+$/ }"
                    :error-messages="errors.collect(toProperCase(key))"
                    :data-vv-name="toProperCase(key)"
                    >
                    </v-text-field>
                </v-flex>
                <v-btn block color="primary" @click="updateProfile()">
                    Update Profile <v-icon right>fa-send</v-icon>
                </v-btn>
            </v-layout>
        </v-container>
    </v-tabs-content>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('auth')

export default {
    data: () => ({
        profileForm: new AppForm(App.forms.profileForm),
        profile: {}
    }),
    computed: {
        ...mapGetters({
            getMe: 'getMe'
        })
    },
    mounted () {
        let self = this
        self.profile = self.getMe.profile
    },
    methods: {
        ...mapMutations({
            setMe: 'setMe'
        }),
        prepareProfileForm () {
            let self = this
            self.profileForm.first_name = self.profile.first_name
            if (self.profile.first_name === null) {
                delete self.profileForm.first_name
            }
            self.profileForm.last_name = self.profile.last_name
            if (self.profile.last_name === null) {
                delete self.profileForm.last_name
            }
            self.profileForm.contact_no = self.profile.contact_no
            if (self.profile.contact_no === null) {
                delete self.profileForm.contact_no
            }
            self.profileForm.address_1 = self.profile.address_1
            if (self.profile.address_1 === null) {
                delete self.profileForm.address_1
            }
            self.profileForm.address_2 = self.profile.address_2
            if (self.profile.address_2 === null) {
                delete self.profileForm.address_2
            }
            self.profileForm.city = self.profile.city
            if (self.profile.city === null) {
                delete self.profileForm.city
            }
            self.profileForm.country = self.profile.country
            if (self.profile.country === null) {
                delete self.profileForm.country
            }
            self.profileForm.zip_code = self.profile.zip_code
            if (self.profile.zip_code === null) {
                delete self.profileForm.zip_code
            }
            self.profileForm.state_province = self.profile.state_province
            if (self.profile.state_province === null) {
                delete self.profileForm.state_province
            }
        },
        resetProfileForm () {
            let self = this
            self.profileForm = new AppForm(App.forms.profileForm)
        },
        async updateProfile () {
            let self = this
            self.prepareProfileForm()
            self.profileForm.busy = true
            try {
                const payload = (await App.post(route('api.user.updateProfile'), self.profileForm))
                self.resetProfileForm()
                self.setMe(payload.data)
                vm.$popup({ message: payload.message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
            } catch ({errors, message}) {
                self.profileForm.errors.set(errors)
                self.profileForm.busy = false
                vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
            }
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
