<template>
  <main-layout :class="[contentClass]">
      <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-breadcrumbs icons divider="forward">
                <v-breadcrumbs-item
                active-class="primary--text"
                :disabled="false"
                to="/"
                >
                    Home
                </v-breadcrumbs-item>
                <v-breadcrumbs-item
                :disabled="true"
                >
                    Categories
                </v-breadcrumbs-item>
            </v-breadcrumbs>
        </v-layout>
        <v-divider inset></v-divider>
        <v-layout row wrap>
          <v-flex
            xs12 sm12 md3 lg3 xl3
            v-for="(category,index) in categories"
            :key="category.slug" :index="index"
          >
            <v-card>
            <clazy-load :src="category.image">
                <transition name="fade" slot="image">
                    <v-card-media
                        :src="category.image"
                        height="200px"
                    >
                        <v-container fill-height fluid>
                            <v-layout fill-height>
                                <v-flex xs12 align-end flexbox>
                                <span class="headline" v-text="category.name"></span>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-media>
                </transition>
                <transition name="fade" slot="placeholder">
                    <v-card-media
                    src="/img/Bars.svg"
                    height="200px"
                    width="200px"
                    >
                        <v-container fill-height fluid>
                            <v-layout fill-height>
                                <v-flex xs12 align-end flexbox>
                                    <span class="headline" v-text="category.name"></span>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-media>
                </transition>
              </clazy-load>
              <v-card-actions class="accent">
                <span class="body-2">View Product List</span>
                <v-spacer></v-spacer>
                <v-btn flat icon color="primary" slot="activator" @click="showCategory(category.slug)">
                <v-icon>fa-list</v-icon>
                </v-btn>
                <!-- Add Other Action buttons Here -->
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout v-if="!noPagination" row wrap>
            <v-flex xs12>
                <div class="text-xs-center">
                    <v-pagination
                    :length="length"
                    v-model="page"
                    circle
                    >
                    </v-pagination>
                </div>
            </v-flex>
            <v-flex xs12>
                <v-card flat class="grey lighten-4" height="50px"></v-card>
            </v-flex>
        </v-layout>
        <!-- If No Pagination Then Add 50px Height -->
        <v-layout v-else row wrap>
            <v-flex xs12>
                <v-card flat class="grey lighten-4" height="50px"></v-card>
            </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import Theme from '../mixins/theme'

export default {
    props: ['query'],
    mixins: [Theme],
    data: () => ({
        contentClass: { 'grey': true, 'lighten-4': true, 'accent--text': true },
        categories: [],
        links: {
            first: null,
            last: null,
            prev: null,
            next: null
        },
        meta: {
            current_page: 1,
            from: 0,
            last_page: 0,
            path: null,
            per_page: 0,
            to: 0,
            total: 0
        },
        page: 1
    }),
    computed: {
        length () {
            let self = this
            return Math.round(self.meta.total / (self.meta.per_page))
        },
        noPagination () {
            let self = this
            return self.meta.total === self.meta.per_page
        }
    },
    created () {
        let self = this
        self.getCategories()
    },
    mounted () {
        let self = this
        self.page = parseInt(self.query.page)
    },
    methods: {
        async getCategories () {
            let self = this
            let page = self.$route.query.page || 1
            await axios.get(`${route('api.category.index')}?page=${page}`).then((response) => {
                self.categories = response.data.data
                self.links = response.data.links
                self.meta = response.data.meta
                vm.$popup({ message: `Category Page: ${page}`, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
            }).catch(({errors, message}) => {
                console.log(errors)
                vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
            })
        },
        async loadCategories () {
            let self = this
            await axios.get(`${route('api.category.index')}?page=${self.page}`).then((response) => {
                self.categories = response.data.data
                self.links = response.data.links
                self.meta = response.data.meta
                vm.$popup({ message: `Category Page: ${self.page}`, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
            }).catch(({errors, message}) => {
                console.log(errors)
                vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
            })
        },
        showCategory (slug) {
            let self = this
            self.$router.push({ name: 'category.show', params: { slug: slug } })
        }
    },
    components: {
        MainLayout
    },
    watch: {
        page (newValue) {
            let self = this
            self.page = newValue
            self.$router.push({ name: 'category.index', query: { page: newValue } })
        },
        categories: {
            handler: function () {
                console.log('Categories Array Updated')
            },
            deep: true
        },
        '$route': 'loadCategories'
    }
}
</script>

<style scoped>
.breadcrumbs li:not(:last-child):after {
    color: #009688;
    content: attr(data-divider);
    vertical-align: middle;
}
</style>
