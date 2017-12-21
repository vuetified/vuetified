<template>
  <main-layout :class="[contentClass]">
    <carousel/>
    <show-case/>
    <video-gallery/>
    <logo-slider/>
    <footer-note/>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import ShowCase from '../components/home/Showcase.vue'
import Carousel from '../components/home/Carousel.vue'
import VideoGallery from '../components/home/VideoGallery.vue'
import LogoSlider from '../components/home/LogoSlider.vue'
import FooterNote from '../partials/FooterNote'
import Theme from '../mixins/theme'

export default {
    components: {
        MainLayout,
        ShowCase,
        Carousel,
        FooterNote,
        VideoGallery,
        LogoSlider
    },
    mixins: [Theme],
    data: () => ({
        contentClass: { 'white': true, 'accent--text': true },
        backgroundcolor: 'white'
    }),
    mounted () {
        Bus.$emit('footer-content-visible', true)
    }
}
</script>
