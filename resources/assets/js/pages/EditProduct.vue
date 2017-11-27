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
        <v-layout row wrap>
            <v-dialog v-model="option_modal" persistent max-width="500px">
                <v-card light>
                <v-card-title>
                    <span class="headline">Add Product Package</span>
                </v-card-title>
                <v-card-text>
                    <v-container fluid>
                    <v-layout row wrap>
                        <v-flex xs12>
                        <v-text-field
                        label="Name"
                        required
                        light
                        v-model="tmp_option.name"
                        v-validate="{ required: true}"
                        :error-messages="errors.collect('package key')"
                        data-vv-name="name"
                        >
                        </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12>
                        <v-text-field
                        label="Value"
                        required
                        light
                        v-model="tmp_option.value"
                        v-validate="{ required: true}"
                        :error-messages="errors.collect('package value')"
                        data-vv-name="package value"
                        >
                        </v-text-field>
                        </v-flex>
                    </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="closeOptionModal">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click="addOption">Save</v-btn>
                </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
        <!-- Add Option Modal -->
        <!-- Add Featured Image Modal -->
        <v-dialog v-model="image_modal" fullscreen transition="dialog-bottom-transition" :overlay="false">
            <v-card :light="true">
            <v-toolbar  color="accent">
                <v-btn icon @click.native="image_modal = false" class="error--text">
                <v-icon>close</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title class="primary--text">Upload Featured Image</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-container fluid>
                <uploads file-key="image" :post-url="postUrl" :single="true"></uploads>
            </v-layout>
            </v-container>
            </v-card>
        </v-dialog>
        <!-- Add Featured Image Modal -->

    </v-container>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import Theme from '../mixins/theme'
import Acl from '../mixins/acl'
import TextEditor from '../components/TextEditor.vue'
import Uploads from '../components/Uploads.vue'

export default {
    props: ['slug'],
    mixins: [Theme, Acl],
    components: {
        MainLayout,
        TextEditor,
        Uploads
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
            photos: null,
            inCart: false,
            options: {},
            price: 0,
            qty: 0,
            currency: null,
            maximum: 99
        },
        current_image: '',
        image_modal: null,
        gallery_modal: false,
        option_modal: false,
        tmp_option: {
            name: '',
            value: ''
        },
        text_editor_id: 'product-editor'
    }),
    computed: {
        postUrl () {
            return route('api.product.uploadImage', {slug: this.slug})
        }
    },
    created () {
        this.getProduct()
    },
    mounted () {
        let self = this
        this.getProduct()
        Bus.$on(`${self.text_editor_id}-updated`, (description) => {
            self.editProductForm.description = description
        })
    },
    methods: {
        uploadImage (formData) {
            console.log('upload-image')
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
                self.editProductForm.name = self.product.name
                self.editProductForm.category_id = self.product.category_id
                self.editProductForm.description = self.product.description
                self.editProductForm.sku = self.product.sku
                self.editProductForm.currency = self.product.currency
                self.editProductForm.excerpt = self.product.excerpt
                self.editProductForm.slug = self.product.slug
                self.editProductForm.options = self.product.options ? self.product.options : []
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
                self.editProductForm.currency = self.product.currency
                self.editProductForm.excerpt = self.product.excerpt
                self.editProductForm.slug = self.product.slug
                self.editProductForm.options = self.product.options ? self.product.options : []
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
            this.option_modal = true
        },
        closeOptionModal () {
            this.option_modal = false
        },
        addOption () {
            let self = this

            let index = _.findIndex(self.editProductForm.options, ['name', self.tmp_option.name])
            if (index >= 0) {
                self.$set(self.editProductForm.options, index, self.tmp_option)
            } else {
                self.editProductForm.options.push(self.tmp_option)
            }
            self.updateProduct()
            self.tmp_option = {
                name: '',
                value: ''
            }
            self.closeOptionModal()
        },
        deleteOption (index) {
            let self = this
            self.editProductForm.options.splice(index, 1)
            self.updateProduct()
        },
        editPrimaryImage () {
            this.image_modal = true
        },
        closeImageModal () {
            this.image_modal = false
        },
        editGallerImages () {
            this.gallery_modal = true
        },
        closeGalleryModal () {
            this.gallery_modal = false
        },
        uploadGalleryImages () {
            console.log('uploading gallery images')
        },
        updateDescription () {
            console.log('updating description')
        }
    },
    watch: {
        'editProductForm.options' (newValue) {
            this.editProductForm.options = newValue
            console.log(newValue)
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
