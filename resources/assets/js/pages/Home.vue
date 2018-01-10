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
    },
    head: {
        title: function () {
            return {
                inner: App.site.title,
                separator: '-',
                complement: App.site.trademark
            }
        },
        // Meta tags
        meta: [
            { name: 'application-name', content: App.site.trademark },
            { name: 'description', content: App.site.description, id: 'desc' }, // id to replace intead of create element
            // Facebook / Open Graph
            { property: 'fb:app_id', content: App.site.fb_id },
            { property: 'og:title', content: App.site.title },
            { property: 'og:type', content: 'website' },
            { property: 'og:image', content: App.site.logo.url },
            { property: 'og:description', content: App.site.description },
            { property: 'og:site_name', content: App.site.trademark },
            { property: 'og:locale', content: 'en_US' },
            { property: 'article:author', content: App.site.trademark }
        ],
        // link tags
        link: [
            { rel: 'canonical', href: window.location.href, id: 'canonical' }
        ]
        
        
    }
}
</script>
