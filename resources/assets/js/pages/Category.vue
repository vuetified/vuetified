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
                active-class="primary--text"
                :disabled="false"
                to="/categories"
                >
                    Categories
                </v-breadcrumbs-item>
                <v-breadcrumbs-item
                :disabled="true"
                >
                    {{ slug | capitalize }}
                </v-breadcrumbs-item>
            </v-breadcrumbs>
        </v-layout>
        <v-divider inset></v-divider>
        <v-layout row wrap>
          <v-flex
            xs12 sm12 md3 lg3 xl3
            v-for="(product,index) in products"
            :key="product.slug" :index="index"
          >
            <v-card>
            <clazy-load :src="product.image">
                <transition name="fade" slot="image">
                    <v-card-media
                        :src="product.image"
                        height="200px"
                    >
                        <v-container fill-height fluid>
                            <v-layout fill-height>
                                <v-flex xs12 align-end flexbox>
                                <span class="headline" v-text="product.name"></span>
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
                                    <span class="headline" v-text="product.name"></span>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-media>
                </transition>
              </clazy-load>
              <v-card-actions class="accent">
                <span class="body-2">View Product</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="showProduct(product.slug)">
                  <v-icon class="primary--text">shopping_basket</v-icon>
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
                    :total-visible="total_visible"
                    :length="length"
                    v-model="meta.current_page"
                    circle
                    >
                    </v-pagination>
                </div>
            </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
  </main-layout>
</template>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import Theme from '../mixins/theme'

export default {
    props: ['slug'],
    mixins: [Theme],
    components: {
        MainLayout
    },
    data: () => ({
        contentClass: { 'grey': true, 'lighten-4': true, 'accent--text': true },
        products: [],
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
        }
    }),
    computed: {
        length () {
            let self = this
            return Math.abs(self.meta.from - self.meta.last_page)
        },
        total_visible () {
            let self = this
            return Math.round(self.meta.total / (self.meta.per_page / 2))
        },
        noPagination () {
            let self = this
            return self.meta.total === self.meta.per_page
        }
    },
    mounted () {
        let self = this
        self.getProducts()
    },
    methods: {
        async getProducts () {
            let self = this
            let slug = {slug: self.slug}
            await axios.get(route('api.category.show', slug)).then((response) => {
                self.products = response.data.data
                self.links = response.data.links
                self.meta = response.data.meta
            }).catch(({errors, message}) => {
                console.log(errors)
                self.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
                self.$router.push({name: 'error'})
            })
        },
        showProduct (slug) {
            let self = this
            self.$router.push({ name: 'product.show', params: { slug: slug } })
        },
        changePage () {
            let self = this
            let slug = {slug: self.slug}
            axios.get(`${route('api.category.show', slug)}/?page=${self.meta.current_page}`).then((response) => {
                /* This Will Just Add The New Value To The Current Object
                 Useful for Mobile Loading the New Object */

                // self.categories = Object.assign({}, self.categories, response.data.data)

                /* Override the Object with new Value */
                self.products = response.data.data
                self.links = response.data.links
                self.meta = response.data.meta
                self.$popup({ message: `Switch To Page: ${self.meta.current_page}`, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
            }).catch(({errors, message}) => {
                console.log(errors)
                self.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
            })
        }
    },
    watch: {
        'meta.current_page' (newValue) {
            console.log('Change To Page ' + newValue)
            this.changePage()
        },
        category: {
            handler: function (newValue) {
                console.log('Category Fetched', newValue)
            },
            deep: true
        }
    }
}
</script>
