<template>
  <main-layout :class="[contentClass]">
    <v-container 
      fluid 
      grid-list-md 
      style="padding-top:100px;"
    >
      <v-layout 
        row 
        wrap
      >
        <v-breadcrumbs light>
          <v-icon 
            slot="divider" 
            color="teal"
          >
            forward
          </v-icon>
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
            <span class="blue-grey--text">{{ slug | capitalize }}</span>
          </v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-layout>
      <v-layout 
        row
        wrap
      >
        <v-flex
          xs12 
          sm12
          md3 
          lg3 
          xl3
          v-for="(product,index) in products"
          :key="product.slug" 
          :index="index"
        >
          <v-card dark>
            <v-card-media
              :src="product.image"
              height="200px"
            >
              <v-container 
                fill-height 
                fluid
              >
                <v-layout fill-height>
                  <v-flex 
                    xs12
                    align-end 
                    flexbox
                  >
                    <span 
                      class="body-2 white--text primary" 
                      v-text="product.name"
                    />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-media>
            <v-card-actions class="accent">
              <span class="body-2">{{ product.price | currency(currency) }}</span>
              <v-spacer/>
              <v-btn 
                flat 
                icon 
                color="white" 
                slot="activator" 
                @click.native="showProduct(product.slug)"
              >
                <v-icon>fa-shopping-bag</v-icon>
              </v-btn>
              <!-- Add Other Action buttons Here -->
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout 
        v-if="!noPagination" 
        row 
        wrap
      >
        <v-flex xs12>
          <div class="text-xs-center">
            <v-pagination
              :length="length"
              v-model.number="page"
              circle
            />
          </div>
        </v-flex>
      </v-layout>
      <!-- If No Pagination Then Add 50px Height -->
      <v-layout
        v-else 
        row
        wrap
        height="50px"
      />
    </v-container>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import Theme from '../mixins/theme'

export default {
    components: {
        MainLayout
    },
    mixins: [Theme],
    props:{
        slug:{
            type: String,
            required: true
        },
        query:{
            type: Object,
            required: true
        }
    },
    data: () => ({
        contentClass: { 'grey': true, 'lighten-4': true, 'accent--text': true },
        currency: '₱',
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
            if (self.meta.total === self.meta.per_page) {
                return true
            } else if (self.meta.per_page > self.meta.total) {
                return true
            } else {
                return false
            }
        }
    },
    head: {
        title: function () {
            let self = this
            return {
                inner: self.titleCase(self.slug),
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
    watch: {
        products: {
            handler: function () {
                console.log('Products Array Updated')
            },
            deep: true
        },
        page (newValue) {
            let self = this
            self.page = newValue
            self.$router.push({ name: 'category.show', query: { page: newValue }, params: { slug: self.$route.params.slug } })
            vm.$popup({ message: `${self.$route.params.slug} Page: ${self.page}`, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
        },
        '$route': 'loadProducts'
    },
    created () {
        /* important if redirecting back to populate our product list */
        this.getProducts()
    },
    mounted () {
        let self = this
        self.page = parseInt(self.query.page)
    },
    methods: {
        titleCase (slug) {
            var words = slug.split('-')

            for (var i = 0; i < words.length; i++) {
                var word = words[i]
                words[i] = word.charAt(0).toUpperCase() + word.slice(1)
            }

            return words.join(' ')
        },
        showProduct (slug) {
            let self = this
            self.$router.push({ name: 'product.show', params: { slug: slug } })
        },
        viewCart () {
            let self = this
            self.$router.push({ name: 'cart' })
        },
        async getProducts () {
            let self = this
            let slug = {slug: self.slug}
            await axios.get(`${route('api.category.show', slug)}/?page=${self.page}`).then((response) => {
                self.products = response.data.data
                self.links = response.data.links
                self.meta = response.data.meta
            }).catch(({errors, message}) => {
                console.log(errors)
                self.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
            })
        },
        async loadProducts () {
            let self = this
            let slug = {slug: self.slug}
            await axios.get(`${route('api.category.show', slug)}/?page=${self.page}`).then((response) => {
                self.products = response.data.data
                self.links = response.data.links
                self.meta = response.data.meta
                vm.$popup({ message: `${self.$route.params.slug} Page: ${self.page}`, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
            }).catch(({errors, message}) => {
                console.log(errors)
                self.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
            })
        }
    }
}
</script>

<style scoped>

</style>
