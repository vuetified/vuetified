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
                    Products
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
                <span class="body-2" style="cursor:pointer;" @click.native="showProduct(product.slug)">Product Details</span>
                <v-btn icon @click="showProduct(product.slug)" v-tooltip:right="{ html: `View Details of ${product.name}` }">
                  <v-icon class="info--text">fa-info-circle</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn icon v-if="product.inCart" @click.native="removeFromCart(product.id)" v-tooltip:left="{ html: `Remove ${product.name} in cart` }">
                  <v-icon class="error--text">remove_shopping_cart</v-icon>
                </v-btn>
                <v-btn icon @click.native="viewCart()" v-if="product.inCart" v-tooltip:left="{ html: `View Item in Cart | ${product.name} qty : ${product.qty}` }">
                  <v-icon v-badge="{ value: product.qty}" class="primary--text">shopping_cart</v-icon>
                </v-btn>
                <v-btn icon @click.native="addItem(product.sku)" v-tooltip:left="{ html: `Add ${product.name} to cart` }">
                  <v-icon class="info--text">add_shopping_cart</v-icon>
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

<script>
import MainLayout from '../layouts/Main.vue'
import Theme from '../mixins/theme'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters, mapMutations } = createNamespacedHelpers('cart')

export default {
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
            return Math.round(self.meta.total / (self.meta.per_page))
        },
        noPagination () {
            let self = this
            return self.meta.total === self.meta.per_page
        },
        ...mapGetters({
            getItems: 'getItems',
            getTax: 'getTax',
            getSubTotal: 'getSubTotal',
            getCount: 'getCount',
            getForm: 'getForm'
        })
    },
    mounted () {
        let self = this
        self.getProducts()

        vm.$on('inCart', (payload) => {
            let product = _.find(self.products, { id: payload.item.id })
            let index = _.findIndex(self.products, { id: payload.item.id })
            product.inCart = payload.inCart
            product.qty = payload.qty
            self.$set(self.products, index, product)
        })
    },
    methods: {
        viewCart () {
            let self = this
            self.$router.push({ name: 'cart' })
        },
        setInCart () {
            let self = this
            let items = Object.values(self.getItems)
            let inCart = items.filter(function (item) {
                return self.products.some(function (product) {
                    return product.id === item.id
                })
            })
            inCart.forEach(function (payload) {
                let product = _.find(self.products, { id: payload.id })
                let index = _.findIndex(self.products, { id: payload.id })
                product.inCart = true
                product.qty = payload.qty
                self.$set(self.products, index, product)
            }, this)
        },
        ...mapActions({
            addItem: 'addItem',
            removeItem: 'removeItem',
            destroyCart: 'destroyCart',
            updateItem: 'updateItem'
        }),
        ...mapMutations({
            setItems: 'setItems',
            setTax: 'setTax',
            setSubTotal: 'setSubTotal',
            setTotal: 'setTotal',
            newCartForm: 'newForm'
        }),
        addToCart (sku) {
            let self = this
            self.addItem(sku)
        },
        removeFromCart (id) {
            let self = this
            self.removeItem(id)
        },
        getProducts () {
            let self = this
            axios.get(route('api.product.index')).then((response) => {
                self.products = response.data.data
                self.links = response.data.links
                self.meta = response.data.meta
                self.setInCart()
            }).catch(({errors, message}) => {
                console.log(errors)
                vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
            })
        },
        showProduct (slug) {
            let self = this
            self.$router.push({ name: 'product.show', params: { slug: slug } })
        },
        changePage () {
            let self = this
            axios.get(`${route('api.product.index')}/?page=${self.meta.current_page}`).then((response) => {
                /* Override the Object with new Value */
                self.products = response.data.data
                self.links = response.data.links
                self.meta = response.data.meta
                self.setInCart()
                vm.$popup({ message: `Switch To Page: ${self.meta.current_page}`, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
            }).catch(({errors, message}) => {
                console.log(errors)
                vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
            })
        }
    },
    watch: {
        'meta.current_page' (newValue) {
            console.log('Change To Page ' + newValue)
            this.changePage()
        },
        products: {
            handler: function () {
                console.log('Products Array Updated')
            },
            deep: true
        }
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
