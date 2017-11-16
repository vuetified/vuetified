<template>
<main-layout  :style="{ paddingTop: `100px`, backgroundColor: `white` }">
    <v-container fluid>
        <!-- User Main Detail -->
        <v-card light flat>
            <v-card-title>
                <v-text-field
                append-icon="search"
                label="Search Users"
                single-line
                hide-details
                v-model="search"
                light
                ></v-text-field>
            </v-card-title>
        </v-card>
        <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        light
        item-key="name"
        expand
        >
            <template slot="items" scope="props">
                <tr>
                    <td class="title text-xs-left primary--text">
                        {{ props.item.id }}
                    </td>
                    <td class="title text-xs-left primary--text">
                        {{ props.item.name }}
                    </td>
                    <td class="title text-xs-left primary--text">
                        <v-avatar v-if="props.item.sponsor">
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
                        <v-btn light  flat icon :class="{'amber--text': props.expanded, 'amber': props.expanded, 'teal': !props.expanded, 'teal--text': !props.expanded }" @click="props.expanded = !props.expanded">
                            <v-icon v-if="!props.expanded">fa-expand</v-icon>
                            <v-icon v-if="props.expanded">fa-compress</v-icon>
                        </v-btn>
                        <v-btn :disabled="!can('edit_user')"  flat icon color="accent" @click.native="editUser(props.item)">
                            <v-icon>fa-edit</v-icon>
                        </v-btn>
                        <v-btn :disabled="!can('delete_user')" flat icon color="error" @click.native="deleteUser(props.item)">
                            <v-icon>fa-trash</v-icon>
                        </v-btn>
                    </td>
                </tr>
            </template>

            <template slot="pageText" scope="{ pageStart, pageStop }">
                From {{ pageStart }} to {{ pageStop }}
            </template>

            <template slot="expand" scope="props">
                <v-container fluid>
                    <v-card light flat text-xs-center>
                        <v-card-media
                            class="white--text blue-grey"
                            height="75px"
                        >
                        <v-container fill-height fluid>
                        <v-layout fill-height>
                            <v-flex xs12 align-end flexbox>
                            <v-avatar text-xs-left>
                            <img :src="props.item.photo_url" :alt="props.item.name">
                            </v-avatar>
                            <span class="headline">{{ props.item.name }}</span>
                            </v-flex>
                        </v-layout>
                        </v-container>
                        </v-card-media>

                        <v-card-actions>
                            <v-btn flat color="success" v-if="!props.item.active">Activate Account <v-icon right>done_all</v-icon></v-btn>
                            <v-btn flat color="error" v-if="!props.item.banned">Ban Account <v-icon right>fa-ban </v-icon></v-btn>
                        </v-card-actions>

                        <v-card-title>
                            <v-container fluid>
                                <p class="title info--text">Account Details</p>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                    <v-text-field
                                        label="Username"
                                        v-model="props.item.username"
                                        prepend-icon="fa-at"
                                        light
                                        readonly
                                        >
                                    </v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                        label="Email"
                                        v-model="props.item.email"
                                        prepend-icon="fa-envelope"
                                        light
                                        readonly
                                        >
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <p class="title info--text" v-if="props.item.roles">Assigned Roles</p>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <v-select
                                            fluid
                                            light
                                            chips
                                            tags
                                            prepend-icon="fa-tags"
                                            readonly
                                            v-model="props.item.roles"
                                        >
                                        <template slot="selection" scope="data">
                                            <v-chip
                                            light
                                            :selected="data.selected"
                                            >
                                            <v-avatar
                                            class="blue-grey"
                                            >
                                            {{ data.item.charAt(0).toUpperCase() }}
                                            </v-avatar>
                                            {{ data.item }}
                                            </v-chip>
                                        </template>
                                        </v-select>
                                    </v-flex>
                                </v-layout>
                                <p class="title info--text" v-if="props.item.permissions">Assigned Permissions</p>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <v-select
                                            fluid
                                            light
                                            chips
                                            tags
                                            prepend-icon="fa-tags"
                                            readonly
                                            v-model="props.item.permissions"
                                        >
                                        <template slot="selection" scope="data">
                                            <v-chip
                                            light
                                            :selected="data.selected"
                                            >
                                            <v-avatar
                                            class="brown"
                                            >
                                            {{ data.item.charAt(0).toUpperCase() }}
                                            </v-avatar>
                                            {{ data.item }}
                                            </v-chip>
                                        </template>
                                        </v-select>
                                    </v-flex>
                                </v-layout>
                                <p class="title info--text" v-if="props.item.profile">Profile Details</p>
                                <v-layout row wrap>
                                    <v-flex xs12 v-for="(profile,key) in props.item.profile" :key="key">
                                        <v-text-field
                                        :label="toProperCase(key)"
                                        v-model="props.item.profile[key]"
                                        light
                                        readonly
                                        >
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>

                            </v-container>
                        </v-card-title>

                </v-card>
                </v-container>
            </template>

        </v-data-table>
    </v-container>
</main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import Theme from '../mixins/theme'
import Acl from '../mixins/acl'

export default {
    mixins: [Theme, Acl],
    data: () => ({
        contentClass: { 'grey': true, 'lighten-4': true, 'accent--text': true },
        dialog: false,
        /* table */
        headers: [
            { text: 'ID', value: 'id', align: 'left', sortable: true },
            { text: 'Name', value: 'name', align: 'left', sortable: true },
            { text: 'Sponsor', value: 'sponsor.name', align: 'left', sortable: true },
            { text: 'Shop Link', value: 'referral_link.link', align: 'left', sortable: true },
            { text: 'Roles', value: 'roles', align: 'left', sortable: false },
            { text: 'Actions', value: 'actions', align: 'center', sortable: false }
        ],
        items: [],
        current_user: {},
        usersForm: new AppForm(App.forms.usersForm),
        toggleForm: new AppForm(App.forms.toggleForm),
        search: ''
    }),
    components: {
        MainLayout
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
        editUser (user) {
            /* Apply this after successful ajax request //
            let index = _.findIndex(self.items, { id: user.id })
            self.$set(self.items, index, response.data.user)
            */
            // redirect to edit User page
            console.log('edit user', user)
        },
        deleteUser (user) {
            let self = this
            /* delete item */
            // you cant delete an admin account
            // but we can only downgrade it to other role
            // except if your email is = admin@
            let index = _.findIndex(self.items, { id: user.id })
            self.$delete(self.items, index)
        },
        viewUser (user) {
            // redirect to view User page
            console.log('view user', user)
        },
        toProperCase (key) {
            let newStr = key.replace(/_/g, ' ')
            return newStr.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
        }

    },
    watch: {
        items: {
            handler: function () {
                console.log('items changed')
            },
            deep: true
        }
    }
}
</script>
