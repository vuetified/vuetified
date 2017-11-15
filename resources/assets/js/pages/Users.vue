<template>
<main-layout  :style="{ paddingTop: `100px`, backgroundColor: `white` }">
    <v-container fluid>
        <!-- User Main Detail -->
        <v-data-table
        :headers="headers"
        :items="items"
        light
        >
            <template slot="items" scope="props">
                <tr>
                    <td class="title text-xs-left primary--text">
                        <v-avatar @click="props.expanded = !props.expanded">
                            <img :src="props.item.photo_url" :alt="props.item.name" style="cursor:pointer;">
                        </v-avatar>
                        {{ props.item.name }}
                    </td>
                    <td class="title text-xs-left primary--text">
                        <v-avatar v-if="props.item.sponsor" >
                            <img :src="props.item.sponsor.photo_url" :alt="props.item.sponsor.name">
                        </v-avatar>
                        <span v-if="props.item.sponsor">{{ props.item.sponsor.name }}</span>
                    </td>

                    <td class="title text-xs-left primary--text">
                        <v-btn flat color="accent"
                        :href="`http://${ props.item.referral_link.link }.${ App.site.domain }`"
                        target="_blank"
                        >
                            <v-icon left>fa-link</v-icon>
                            <span>http://{{ props.item.referral_link.link }}.{{App.site.domain}}</span>
                        </v-btn>

                    </td>
                    <td class="title text-xs-left primary--text">
                        <v-chip
                        v-for="(role,key) in props.item.roles" :key="key"
                        >
                            <v-avatar
                            :class="{
                            primary: (role === 'admin'),
                            accent: (role === 'customer'),
                            info: (role === 'merchant'),
                            success: (role === 'reseller')
                            }"
                            >
                            {{ role.charAt(0).toUpperCase() }}
                            </v-avatar>
                                {{ role }}
                        </v-chip>
                    </td>
                    <td class="title text-xs-center">
                        <v-btn :disabled="!can('edit_user')"  flat icon color="accent" @click.native="setCurrentUser(props.item)">
                            <v-icon>fa-edit</v-icon>
                        </v-btn>
                        <v-btn :disabled="!can('delete_user')" flat icon color="error" @click.native="deleteUser(props.item)">
                            <v-icon>fa-trash</v-icon>
                        </v-btn>
                    </td>
                </tr>
            </template>

            <template slot="expand" scope="props">
                <!-- User Other Details -->
                <v-subheader class="accent--text">Email: {{ props.item.email }}</v-subheader>
                <v-subheader class="accent--text">Username: {{ props.item.username }}</v-subheader>
            </template>

            <template slot="pageText" scope="{ pageStart, pageStop }">
                From {{ pageStart }} to {{ pageStop }}
            </template>

        </v-data-table>
    </v-container>
</main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import Theme from '../mixins/theme'
import Acl from '../mixins/acl'
import VLink from '../components/VLink.vue'

export default {
    mixins: [Theme, Acl],
    data: () => ({
        contentClass: { 'grey': true, 'lighten-4': true, 'accent--text': true },
        dialog: false,
        /* table */
        headers: [
            /* remove sort and value since we cant access dot anotation in item */
            { text: 'Name', value: 'id', align: 'left', sortable: true },
            { text: 'Sponsor', align: 'left', sortable: false },
            { text: 'Shop Link', align: 'left', sortable: false },
            { text: 'Account Type', align: 'left', sortable: false },
            { text: 'Actions', align: 'center', sortable: false }
        ],
        items: [],
        current_user: {},
        usersForm: new AppForm(App.forms.usersForm),
        toggleForm: new AppForm(App.forms.toggleForm)
    }),
    components: {
        MainLayout,
        VLink
    },
    mounted () {
        let self = this
        self.fetchUsers()
    },
    methods: {
        async fetchUsers () {
            let self = this
            self.usersForm.busy = true
            try {
                const payload = (await App.post(route('api.user.index'), self.usersForm))
                self.items = payload.data
                self.usersForm = new AppForm(App.forms.usersForm)
                vm.$popup({ message: payload.message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
            } catch ({errors, message}) {
                self.usersForm.errors.set(errors)
                self.usersForm.busy = false
                vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
            }
        },
        deleteUser () {
            console.log('delete user')
        },
        setCurrentUser () {
            console.log('set current user')
        }
    }
}
</script>
