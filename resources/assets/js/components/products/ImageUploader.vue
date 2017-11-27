<template>
<v-dialog v-model="image_modal" fullscreen transition="dialog-bottom-transition">
    <v-card :light="true">
    <v-toolbar  color="accent">
        <v-btn icon @click="closeImageModal" class="error--text">
        <v-icon>close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-toolbar-title class="primary--text">Upload Featured Image</v-toolbar-title>
        <v-spacer></v-spacer>
    </v-toolbar>
    <uploads :file-key="fileKey" :post-url="postUrl" :single="true"></uploads>
    </v-container>
    </v-card>
</v-dialog>
</template>

<script>
import Uploads from '../Uploads.vue'

export default {
    components: {
        Uploads
    },
    data: () => ({
        image_modal: false,
        fileKey: 'image'
    }),
    computed: {
        postUrl () {
            return route('api.product.uploadImage', {slug: this.$route.params.slug})
        }
    },
    mounted () {
        Bus.$on('edit-product-image', () => {
            this.image_modal = true
        })
    },
    methods: {
        closeImageModal () {
            this.image_modal = false
        }
    }
}
</script>

<style>

</style>
