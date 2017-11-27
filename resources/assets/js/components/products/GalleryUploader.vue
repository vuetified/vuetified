<template>
    <v-dialog v-model="gallery_modal" fullscreen transition="dialog-bottom-transition">
        <v-card :light="true">
        <v-toolbar  color="accent">
            <v-btn icon @click="closeGalleryModal" class="error--text">
            <v-icon>close</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-toolbar-title class="primary--text">Upload Product Gallery Images</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <multi-uploads :file-key="fileKey" :post-url="postUrl"></multi-uploads>
        </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
import MultiUploads from '../MultiUploads.vue'

export default {
    components: {
        MultiUploads
    },
    data: () => ({
        gallery_modal: false,
        fileKey: 'photos'

    }),
    computed: {
        postUrl () {
            return route('api.product.uploadGalleryImages', {slug: this.$route.params.slug})
        }
    },
    mounted () {
        let self = this
        Bus.$on('edit-gallery-images', () => {
            self.gallery_modal = true
        })
    },
    methods: {
        closeGalleryModal () {
            this.gallery_modal = false
        },
        uploadGalleryImages () {
            console.log('uploading gallery images')
        }
    }
}
</script>

<style>

</style>
