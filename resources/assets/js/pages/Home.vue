<template>
  <main-layout :class="[contentClass]">
    <carousel></carousel>
    <!-- <video-gallery></video-gallery> -->
    <show-case></show-case>
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
    data: () => ({
        contentClass: { 'white': true, 'accent--text': true },
        backgroundcolor: 'white'
    }),
    mounted () {
        Bus.$emit('footer-content-visible', true)
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
