<template>
  <main-layout :class="[contentClass]">
    <carousel></carousel>
    <show-case></show-case>
    <div class="pa-3">

    </div>
    <v-layout row justify-center>
        <v-flex xs4 v-for="(video,key) in videos" :key="key" text-xs-center pa-2>
            <v-card>
                <v-card-media :src="video.poster"
                :style="{ backgroundImage: 'url(' + video.poster + ')', height: imageHeight }"
                style="cursor:pointer;"
                @click="changeVideo(video)"
                >
                </v-card-media>
                <v-card-title style="background-color: #103050;">
                <v-spacer></v-spacer>
                <span>{{ video.title }}</span>
                <v-spacer></v-spacer>
                </v-card-title>
            </v-card>
        </v-flex>
    </v-layout>
    <div class="pa-3" v-if="loaded">

    </div>
    <v-layout row wrap v-if="loaded">
        <v-flex xs12 text-xs-center>
            <youtube :video-id="youtube_id" :player-width="youtubeWidth" :player-height="youtubeHeight"></youtube>
        </v-flex>
    </v-layout>
    <div class="pa-3">

    </div>
    <logo-slider></logo-slider>
    <footer-note></footer-note>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import ShowCase from '../components/home/Showcase.vue'
import Carousel from '../components/home/Carousel.vue'
// import VideoGallery from '../components/home/VideoGallery.vue'
import LogoSlider from '../components/home/LogoSlider.vue'
import FooterNote from '../partials/FooterNote'
import Theme from '../mixins/theme'

export default {
    mixins: [Theme],
    computed: {
        imageHeight () {
            switch (this.$vuetify.breakpoint.name) {
            case 'xs': return '100px'
            case 'sm': return '100px'
            case 'md': return '150px'
            case 'lg': return '250px'
            case 'xl': return '250px'
            }
        },
        youtubeHeight () {
            switch (this.$vuetify.breakpoint.name) {
            case 'xs': return '315px'
            case 'sm': return '315px'
            case 'md': return '450px'
            case 'lg': return '750px'
            case 'xl': return '864px'
            }
        },
        youtubeWidth () {
            switch (this.$vuetify.breakpoint.name) {
            case 'xs': return `${window.innerWidth}px`
            case 'sm': return `${window.innerWidth}px`
            case 'md': return `${window.innerWidth}px`
            case 'lg': return `${window.innerWidth}px`
            case 'xl': return `${window.innerWidth}px`
            }
        }
    },
    data: () => ({
        contentClass: { 'white': true, 'accent--text': true },
        backgroundcolor: 'white',
        videos: [
            {
                title: 'Testimonials',
                href: 'https://www.youtube.com/watch?v=l-nKCcfSMHc',
                type: 'text/html',
                youtube: 'l-nKCcfSMHc',
                poster: 'https://img.youtube.com/vi/l-nKCcfSMHc/maxresdefault.jpg'
            },
            {
                title: 'Opportunity',
                href: 'https://www.youtube.com/watch?v=Y65XWelZiB8',
                type: 'text/html',
                youtube: 'Y65XWelZiB8',
                poster: 'https://img.youtube.com/vi/Y65XWelZiB8/maxresdefault.jpg'
            },
            {
                title: 'Product Presentation',
                href: 'https://www.youtube.com/watch?v=DjrAVpRNKTo',
                type: 'text/html',
                youtube: 'DjrAVpRNKTo',
                poster: 'https://img.youtube.com/vi/DjrAVpRNKTo/maxresdefault.jpg'
            }
        ],
        youtube_id: 'l-nKCcfSMHc',
        loaded: false
    }),
    mounted () {
        Bus.$emit('footer-content-visible', true)
    },
    methods: {
        changeVideo (video) {
            this.youtube_id = video.youtube
            this.loaded = true
        }

    },
    components: {
        MainLayout,
        ShowCase,
        Carousel,
        FooterNote,
        // VideoGallery,
        LogoSlider
    }
}
</script>
<style scoped>
.image {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    border: 2px solid #BA9A5A;
    margin: 15px;
  }
</style>
