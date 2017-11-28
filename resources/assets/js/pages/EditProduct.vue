<template>
  <main-layout :class="[contentClass]" :style="{ paddingTop: `100px` }" v-if="product">
    <v-container fluid grid-list-md>
        <!-- Breadcrumbs -->
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
                active-class="primary--text"
                :disabled="false"
                :to="`/products/${slug}`"
                >
                {{ slug | capitalize }}
                </v-breadcrumbs-item>
                <v-breadcrumbs-item
                :disabled="true"
                >
                <span class="blue-grey--text">Edit</span>
                </v-breadcrumbs-item>
            </v-breadcrumbs>
        </v-layout>
        <!-- Breadcrumbs -->
        <v-layout row wrap>
            <!-- left side -->
            <v-flex d-flex xs12 sm12 md6 lg6>
                <v-layout row wrap fill-height>
                    <!-- Product Image -->
                    <v-flex d-flex xs12 text-xs-right>
                        <v-card color="grey lighten-4" flat light>
                            <v-card-title class="title accent--text">
                                <v-spacer></v-spacer>
                                Edit {{ titleCase(slug) }}
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
                            <v-container fill-height fluid v-if="product.photos.length > 0">
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
                    <v-flex d-flex xs10 offset-xs1 pl-5 pr-5>
                        <!-- Upload Buttons -->
                        <v-card color="grey lighten-4" flat>
                            <v-card-actions>
                                <v-btn light flat block color="green" @click="editPrimaryImage">Upload Product Image<v-icon right>photo</v-icon></v-btn>
                                <v-btn light flat block color="teal" @click="editGallerImages">Upload Gallery Images<v-icon right>photo_library</v-icon></v-btn>
                            </v-card-actions>
                        </v-card>
                        <!-- Upload Buttons -->
                    </v-flex>
                    <!-- Action Buttons -->
                </v-layout>
            </v-flex>
            <!-- left side -->
            <!-- right side -->
            <v-flex d-flex xs12 sm12 md6 lg6>
                <!-- Product Details -->
                <v-layout row wrap>
                    <v-flex d-flex xs10 offset-xs1 pl-5 pr-5>
                        <v-card color="grey lighten-4" flat light>
                            <v-card-title class="title accent--text">
                                <v-spacer></v-spacer>
                                Product Details:
                                <v-spacer></v-spacer>
                                <v-btn icon color="teal lighten-2" @click="updateProduct"><v-icon>fa-save</v-icon></v-btn>
                            </v-card-title>
                            <v-text-field
                            light
                            label="Name"
                            v-model="editProductForm.name"
                            ></v-text-field>
                            <v-text-field
                            light
                            label="Slug"
                            v-model="editProductForm.slug"
                            ></v-text-field>
                            <v-text-field
                            light
                            label="Sku"
                            v-model="editProductForm.sku"
                            ></v-text-field>
                            <v-text-field
                            light
                            label="Price"
                            v-model="editProductForm.price"
                            ></v-text-field>
                            <v-text-field
                            light
                            label="Currency"
                            v-model="editProductForm.currency"
                            disabled
                            ></v-text-field>
                            <v-text-field
                            light
                            label="Excerpt"
                            v-model="editProductForm.excerpt"
                            multi-line
                            >
                            </v-text-field>
                        </v-card>
                    </v-flex>
                </v-layout>
                <!-- Product Details-->
            </v-flex>
            <!-- right side -->
        </v-layout>
        <!-- Product Options -->
        <v-layout row wrap>
            <v-flex xs10 offset-xs1 pl-5 pr-5>
                <v-card color="grey lighten-4" flat light>
                    <v-card-title class="title accent--text">
                        <v-spacer></v-spacer>
                        Packages:
                        <v-spacer></v-spacer>
                        <v-btn icon color="green lighten-2" @click="openOptionModal"><v-icon>fa-plus</v-icon></v-btn>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex xs10 offset-xs1 pl-5 pr-5 v-if="editProductForm.options.length > 0">
                <v-text-field
                :label="option.name"
                light
                v-for="(option,key) in editProductForm.options"
                :key="key"
                v-model="option.value"
                append-icon="fa-trash"
                color="primary"
                :append-icon-cb="() => (deleteOption(key))"
                >
                </v-text-field>
            </v-flex>
        </v-layout>
        <!-- Product Options -->
        <!-- Product Decsription -->
        <v-layout row wrap>
            <v-flex xs10 offset-xs1 pl-5 pr-5>
                <v-card color="grey lighten-4" flat light>
                    <v-card-title class="title accent--text">
                        <v-spacer></v-spacer>
                        Product Description:
                        <v-spacer></v-spacer>
                        <v-btn icon color="info" @click="updateProduct"><v-icon>fa-save</v-icon></v-btn>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex xs10 pl-5 pr-5 offset-xs1>
                <text-editor  :id="text_editor_id" :html="editProductForm.description" :upload-link="`/products/${slug}/uploads`" :disabled="false"></text-editor>
            </v-flex>
        </v-layout>
        <!-- Product Decsription -->
        <!-- Add Option Modal -->
        <package-modal></package-modal>
        <!-- Add Option Modal -->
        <!-- Add Featured Image Modal -->
        <image-uploader></image-uploader>
        <!-- Add Featured Image Modal -->
        <!-- Add Gallery Image Modal -->
        <gallery-uploader></gallery-uploader>
        <!-- Add Gallery Image Modal -->

    </v-container>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import Theme from '../mixins/theme'
import Acl from '../mixins/acl'
import TextEditor from '../components/TextEditor.vue'
import ImageUploader from '../components/products/ImageUploader.vue'
import PackageModal from '../components/products/PackageModal.vue'
import GalleryUploader from '../components/products/GalleryUploader.vue'

export default {
    props: ['slug'],
    mixins: [Theme, Acl],
    components: {
        MainLayout,
        TextEditor,
        ImageUploader,
        PackageModal,
        GalleryUploader
    },
    data: () => ({
        contentClass: { 'grey': true, 'lighten-4': true, 'accent--text': true },
        editProductForm: new AppForm(App.forms.editProductForm),
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
            photos: [],
            inCart: false,
            options: {},
            price: 0,
            qty: 0,
            currency: null,
            maximum: 99
        },
        current_image: '',
        text_editor_id: 'product-editor'
    }),

    created () {
        this.getProduct()
    },
    mounted () {
        let self = this
        this.getProduct()
        Bus.$on(`${self.text_editor_id}-updated`, (description) => {
            self.editProductForm.description = description
        })
        Bus.$on('file-uploaded', (response) => {
            self.product.image = response.path
            self.current_image = response.path
        })
        Bus.$on('multi-file-uploaded', (response) => {
            self.product.photos.push(response.path)
        })
        Bus.$on('package-added', (option) => {
            console.log('package-added')
            let self = this
            let index = _.findIndex(self.editProductForm.options, ['name', option.name])
            if (index >= 0) {
                self.$set(self.editProductForm.options, index, option)
            } else {
                self.editProductForm.options.push(option)
            }
            self.updateProduct()
        })
    },
    methods: {
        setCurrentImage (index) {
            this.current_image = this.product.photos[index]
        },
        async getProduct () {
            let self = this
            let slug = {slug: self.slug}
            await axios.get(route('api.product.show', slug)).then((response) => {
                self.product = response.data.data
                self.current_image = self.product.image
                self.editProductForm.name = self.product.name
                self.editProductForm.category_id = self.product.category_id
                self.editProductForm.description = self.product.description
                self.editProductForm.sku = self.product.sku
                self.editProductForm.currency = self.product.currency
                self.editProductForm.price = self.product.price
                self.editProductForm.excerpt = self.product.excerpt
                self.editProductForm.slug = self.product.slug
                self.editProductForm.options = self.product.options
            }).catch(({errors, message}) => {
                console.log(errors)
                self.$router.push({name: 'error'})
                vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
            })
        },
        async updateProduct () {
            let self = this
            let slug = {slug: self.slug}
            await axios.post(route('api.product.update', slug), self.editProductForm).then((response) => {
                self.product = response.data.data
                self.current_image = self.product.image
                self.editProductForm.name = self.product.name
                self.editProductForm.category_id = self.product.category_id
                self.editProductForm.description = self.product.description
                self.editProductForm.sku = self.product.sku
                self.editProductForm.price = self.product.price
                self.editProductForm.currency = self.product.currency
                self.editProductForm.excerpt = self.product.excerpt
                self.editProductForm.slug = self.product.slug
                self.editProductForm.options = self.product.options
                vm.$popup({ message: 'Product Updated!', backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
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
        },
        openOptionModal () {
            Bus.$emit('open-package-modal')
        },
        deleteOption (index) {
            let self = this
            self.editProductForm.options.splice(index, 1)
            self.updateProduct()
        },
        editPrimaryImage () {
            Bus.$emit('edit-product-image')
        },
        editGallerImages () {
            Bus.$emit('edit-gallery-images')
        }
    },
    watch: {
        'editProductForm.options' (newValue) {
            this.editProductForm.options = newValue
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
