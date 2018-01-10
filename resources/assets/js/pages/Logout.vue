<template>
  <modal-layout v-if="visible">
    <v-card :flat="true">
      <v-toolbar class="accent">
        <v-btn 
          flat 
          icon 
          color="white" 
          @click.native="redirectBack()"
        >
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-spacer/>
        <v-toolbar-title class="text-xs-center white--text">Are You Sure You Want To Log Out?</v-toolbar-title>
        <v-spacer/>
        <v-toolbar-items>
          <!-- If There is no User Account Login Yet Redirect to Authentication Page -->
          <v-btn 
            flat 
            color="white" 
            @click.native="logout()"
          >
            <v-icon right>fa-power-off</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text style="padding-top:100px;">
        <v-container fluid>
          <form @submit.prevent="logout()">
            <v-layout 
              row
              v-if="user"
            >
              <v-flex 
                x12 
                sm12 
                md4 
                offset-md4 
                lg4 
                offset-lg4 
                xl4 
                offset-xl4
              >
                <v-card flat>
                  <v-container 
                    fill-height 
                    fluid
                  >
                    <v-layout fill-height>
                      <v-flex 
                        xs12 
                        text-xs-center
                        flexbox
                      >
                        <v-avatar
                          :tile="tile"
                          :size="avatarSize"
                          class="grey lighten-4"
                          fill-height 
                          fluid
                        >
                          <img 
                            :src="user.photo_url"
                            :alt="user.name
                          ">
                        </v-avatar>
                      </v-flex>
                    </v-layout>
                  </v-container>
                  <v-layout>
                    <v-flex 
                      xs12 
                      text-xs-center 
                      flexbox
                    >
                      <h5 class="primary--text title">{{ user.name | uppercase }}</h5>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex 
                xs12 
                sm12 
                md4 
                offset-md4 
                lg4 
                offset-lg4 
                xl4 
                offset-xl4
              >
                <v-card-actions>
                  <v-btn 
                    @click.native="redirectBack()" 
                    block 
                    flat 
                    class="white--text" 
                    color="info"
                  >
                    No, I Want To Stay
                  </v-btn>
                  <v-btn
                    block
                    flat
                    color="red lighten-2"
                    class="white--text"
                    :loading="logoutForm.busy"
                    :disabled="logoutForm.busy"
                    type="submit"
                  >Yes, Log Me Out</v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </form>
        </v-container>

      </v-card-text>
    </v-card>
  </modal-layout>
</template>

<script>
import ModalLayout from '../layouts/ModalLayout'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters, mapMutations } = createNamespacedHelpers('auth')

export default {
    components: {
        ModalLayout
    },
    data: () => ({
        tile: false,
        avatarSize: '200px',
        logoutForm: new AppForm(App.forms.logoutForm),
        visible: false
    }),
    computed: {
        ...mapGetters({
            getAuth: 'getAuth',
            user: 'getMe'
        })
    },
    head: {
        title: function () {
            return {
                inner: 'Logout',
                separator: '-',
                complement: App.site.trademark
            }
        },
        // Meta tags
        meta: [
            { name: 'application-name', content: App.site.trademark },
            { name: 'description', content: App.site.description, id: 'desc' }, // id to replace intead of create element
            // Facebook / Open Graph
            { property: 'fb:app_id', content: App.site.fb_id },
            { property: 'og:title', content: App.site.title },
            { property: 'og:type', content: 'website' },
            { property: 'og:image', content: App.site.logo.url },
            { property: 'og:description', content: App.site.description },
            { property: 'og:site_name', content: App.site.trademark },
            { property: 'og:locale', content: 'en_US' },
            { property: 'article:author', content: App.site.trademark }
        ],
        // link tags
        link: [
            { rel: 'canonical', href: window.location.href, id: 'canonical' }
        ]
        
    },
    mounted () {
        let self = this
        /* Make Sure We Only Show Logout Page If Authenticated */
        if (!self.getAuth) {
            /* nextick make sure our modal wount be visible before redirect */
            return self.$nextTick(() => self.$router.go(-1))
        }
        self.visible = true
    },
    methods: {
        redirectBack () {
            let self = this
            return self.$nextTick(() => self.$router.go(-1))
        },
        logout () {
            let self = this
            self.logoutForm.busy = true
            return self.$nextTick(() => self.submit(self.logoutForm))
        },
        ...mapActions({
            submit: 'logout'
        }),
        ...mapMutations({
            setToken: 'setToken',
            setRefreshToken: 'setRefreshToken',
            setExpiration: 'setExpiration',
            setMe: 'setMe'
        })
    }
    
}
</script>
