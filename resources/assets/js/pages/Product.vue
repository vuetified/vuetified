<template>
  <main-layout :class="[contentClass]" :style="{ paddingTop: `100px` }" v-if="product">
    <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-breadcrumbs icons divider="forward" light>
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
                to="/products"
                >
                Products
                </v-breadcrumbs-item>
                <v-breadcrumbs-item
                :disabled="true"
                >
                    <span class="blue-grey--text">{{ slug | capitalize }}</span>
                </v-breadcrumbs-item>
            </v-breadcrumbs>
        </v-layout>
        <v-layout row wrap>
            <!-- left side -->
            <v-flex d-flex xs12 sm12 md6 lg6>
                <v-layout row wrap>
                    <!-- Product Image -->
                    <v-flex d-flex xs12 text-xs-right>
                        <v-card color="grey lighten-4" flat light>
                            <v-card-title class="title primary--text">
                                <v-spacer></v-spacer>
                                {{ titleCase(slug) }}
                                <v-spacer></v-spacer>
                                <!-- InCart -->
                                <v-badge color="grey lighten-4" style="cursor:pointer;">
                                        <span  slot="badge" class="teal--text caption">999</span>
                                        <v-icon color="teal">shopping_cart</v-icon>
                                </v-badge>
                                <!-- InCart -->
                            </v-card-title>
                            <v-card-text>
                                    <!-- Remove Item From Cart -->
                                     <v-badge style="cursor:pointer;">
                                        <v-icon color="red">remove_shopping_cart</v-icon>
                                    </v-badge>
                                    <!-- Remove Item From Cart -->
                            </v-card-text>

                            <div v-if="!current_image" style="background-color:#d3d3d3;height:322px;width:483px;margin: auto;width: 50%;">
                            </div>
                            <v-card-media
                            v-else
                            :src="current_image"
                            height="322px"
                            contain
                            >
                            </v-card-media>
                            <!-- Gallery -->
                            <v-container fill-height fluid v-if="product.gallery !== null && product.gallery.length > 0">
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <div
                                        class="image"
                                        v-for="(image,key) in product.gallery"
                                        :key="key"
                                        @click="setCurrentImage(key)"
                                        :style="{ backgroundImage: 'url(' + image + ')', width: '50px', height: '50px' }"
                                        >
                                        </div>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                            <!-- Gallery -->
                        </v-card>
                    </v-flex>
                    <!-- Product Image -->
                    <!-- Action Buttons -->
                    <v-flex d-flex xs12>
                        <!-- QTY INPUT -->
                        <v-card-text>
                            <v-slider  color="teal" :min="1" :max="999" v-model="product.qty" step="1" light track-color="red darken-4" :label="`QTY: ${product.qty}`"></v-slider>
                            <v-text-field single-line :min="1" :max="999" light v-model="product.qty" type="number"></v-text-field>
                        </v-card-text>
                        <!-- QTY INPUT -->
                    </v-flex>
                    <v-flex d-flex xs12>
                        <!-- ADD TO CART -->
                        <v-card color="grey lighten-4" flat light>
                            <v-card-actions>
                                <v-btn light flat block color="green">{{ currency }}{{ product.price * product.qty }}</v-btn>
                                <v-btn light flat block color="teal" @click="addToCart()">Add To Cart <v-icon>shopping_cart</v-icon></v-btn>
                            </v-card-actions>
                        </v-card>
                        <!-- ADD TO CART -->
                    </v-flex>
                    <!-- Action Buttons -->
                </v-layout>
            </v-flex>
            <!-- left side -->
            <!-- right side -->
            <v-flex d-flex xs12 sm12 md6 lg6>
                <v-layout row wrap>
                    <!-- Product Details -->
                    <v-flex d-flex xs12>
                        <v-card color="grey lighten-4" flat light>
                            <!-- Product Description HTML -->
                            <v-card-text v-html="product.description">
                            </v-card-text>
                            <!-- Product Description HTML -->
                        </v-card>
                    </v-flex>
                    <!-- Product Details -->
                </v-layout>
            </v-flex>
            <!-- right side -->
        </v-layout>
    </v-container>
  </main-layout>
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
        currency: '₱',
        product: {
            available: null,
            description: null,
            gallery: [

            ],
            id: null,
            image: null,
            inCart: false,
            name: null,
            options: {

            },
            price: 0,
            qty: 0,
            rating_cache: null,
            maximum: 99
        },
        current_image: ''
    }),
    created () {
        let self = this
        self.getProduct()
    },
    methods: {
        setCurrentImage (index) {
            this.current_image = this.product.gallery[index]
        },
        async getProduct () {
            let self = this
            let slug = {slug: self.slug}
            await axios.get(route('api.product.show', slug)).then((response) => {
                self.product = response.data.data
                self.current_image = self.product.image
            }).catch(({errors, message}) => {
                console.log(errors)
                self.$router.push({name: 'error'})
                vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
            })
        },
        titleCase (slug) {
            var words = slug.split('-')

            for (var i = 0; i < words.length; i++) {
                var word = words[i]
                words[i] = word.charAt(0).toUpperCase() + word.slice(1)
            }

            return words.join(' ')
        }

    }
}
</script>

<style scoped>
.image {
    float: left;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    border: 1px solid #ebebeb;
    margin: 5px;
}
.breadcrumbs li:not(:last-child):after {
    color: #009688;
    content: attr(data-divider);
    vertical-align: middle;
}
button:disabled {
    color: red !important;
}
</style>
