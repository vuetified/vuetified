<template>
<div>
  <gallery
  :images="videos"
  :index="index"
  :options="{
        youTubeVideoIdProperty: 'youtube',
        youTubePlayerVars: undefined,
        youTubeClickToPlay: true,
      }"
  @close="index = null"
  >
  </gallery>
  <v-container fluid grid-list-xl>
  <v-layout row wrap>
  <v-flex
    xs12 sm12 md4 lg4 xl4
    v-for="(video, i) in videos"
    :key="i"
  >
  <div>
      <h5 v-text="video.title" class="primary--text text-xs-center"></h5>
      <div
    class="image"
    @click="index = i"
    :style="{ backgroundImage: 'url(' + video.poster + ')', height: '250px' }"
    style="cursor:pointer;"
    >
  </div>
  </div>

  </v-flex>
</v-layout>
</v-container>
</div>
</template>

<script>
import VueGallery from 'vue-gallery'
import 'blueimp-gallery/js/blueimp-gallery-youtube'
export default {
    data: () => ({
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
        index: null
    }),
    components: {
        'gallery': VueGallery
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
