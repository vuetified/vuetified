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
            <v-spacer></v-spacer>
            <v-btn v-if="hasRole('admin')" icon color="primary" :to="`/products/${slug}/edit`"><v-icon>fa-edit</v-icon></v-btn>
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

                            </v-card-title>

                            <!-- Image Placeholder -->
                            <div v-if="!current_image" style="background-color:#d3d3d3;height:322px;width:483px;margin: auto;width: 50%;">
                            </div>
                            <!-- Image Placeholder -->
                            <!-- Image -->
                            <v-card-media
                            v-else
                            :src="current_image"
                            height="322px"
                            contain
                            >
                            </v-card-media>
                            <!-- Image -->
                            <!-- Gallery -->
                            <v-container fill-height fluid v-if="product.photos !== null && product.photos !== undefined && product.photos.length > 0">
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <div
                                        class="image"
                                        v-for="(image,key) in product.photos"
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
                        <!-- INPUT FIELDS -->
                        <v-card-text light>
                            <v-slider
                            color="teal"
                            :min="1"
                            :max="1000"
                            v-model.number="product.qty"
                            step="1"
                            light
                            track-color="amber darken-4"
                            :label="`QTY: ${product.qty}`"
                            >
                            </v-slider>
                            <v-text-field
                            single-line
                            light
                            v-model.number="product.qty"
                            type="number"
                            >
                            </v-text-field>
                            <!-- product.options -->
                            <v-select
                            v-if="hasPackages"
                            light
                            color="info"
                            :items="product.options"
                            item-text="value"
                            v-model="option"
                            label="Select Package"
                            single-line
                            return-object
                            auto
                            append-icon="fa-cubes"
                            hide-details
                            v-validate="{ required: true}"
                            :error-messages="errors.collect('package')"
                            data-vv-name="package"
                            >
                            </v-select>
                             <!-- product.options -->
                        </v-card-text>
                        <!-- INPUT FIELDS -->
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
                            <v-card-title class="title primary--text">
                                <v-spacer></v-spacer>
                                Product Details:
                                <v-spacer></v-spacer>
                            </v-card-title>
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
import Acl from '../mixins/acl'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('cart')

export default {
    props: ['slug'],
    mixins: [Theme, Acl],
    components: {
        MainLayout
    },
    data: () => ({
        contentClass: { 'grey': true, 'lighten-4': true, 'accent--text': true },
        currency: '₱',
        product: {
            id: null,
            description: null,
            category: null,
            category_id: null,
            sku: null,
            name: null,
            slug: null,
            excerpt: null,
            image: null,
            photos: null,
            inCart: false,
            options: {},
            price: 0,
            qty: 1,
            currency: null
        },
        current_image: '',
        option: null,
        count: 0
    }),
    computed: {
        hasPackages () {
            return !_.isEmpty(this.product.options)
        }
    },
    created () {
        let self = this
        self.getProduct()
    },
    methods: {
        ...mapActions({
            addItem: 'addItem'
        }),
        async addToCart () {
            let self = this
            let option = {}
            /* use vee validate for select */
            self.$validator.validateAll()
            if (!self.errors.any()) {
                /* for packages */
                if (this.hasPackages) {
                    option[self.option.name] = self.option.value
                }
                let payload = {qty: self.product.qty, id: self.product.id, options: option}
                await self.addItem(payload)
            } else {
                vm.$popup({ message: 'Please Pick A Package', backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
            }
        },
        setCurrentImage (index) {
            this.current_image = this.product.photos[index]
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
</style>
