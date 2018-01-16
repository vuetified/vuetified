<template>
  <v-container 
    fluid 
    class="pa-0 ma-0"
  >
    <v-layout 
      row 
      wrap
    >
      <v-flex 
        xs12 
        text-xs-center
      >
        <h1 class="primary--text">Learn More About Iam World Wide</h1>
        <h2 class="headline accent--text">Watch Our Video Presentations</h2>
      </v-flex>
    </v-layout>
    <v-layout 
      row 
      justify-center
    >
      <v-flex 
        xs12 
        sm12 
        md4 
        lg4 
        xl4 
        v-for="(video,key) in videos" 
        :key="key" 
        text-xs-center 
        pa-2
      >
        <v-card>
          <v-card-media 
            :src="video.poster"
            :style="{ backgroundImage: 'url(' + video.poster + ')', height: imageHeight }"
            style="cursor:pointer;"
            @click="changeVideo(video)"
          />
          <v-card-title 
            style="background-color: #103050;" 
            v-if="showVideoTitle"
          >
            <v-spacer/>
            <span class="headline white--text">{{ video.title }}</span>
            <v-spacer/>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout 
      row 
      wrap 
      v-if="loaded"
    >
      <v-flex 
        xs12 
        text-xs-center
      >
        <youtube 
          :video-id="youtube_id" 
          :player-width="youtubeWidth" 
          :player-height="youtubeHeight"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
    data: () => ({
        videos: [
            {
                title: 'Testimonials',
                href: 'https://www.youtube.com/watch?v=6ZsablEj0X0',
                type: 'text/html',
                youtube: '6ZsablEj0X0',
                poster: 'https://img.youtube.com/vi/6ZsablEj0X0/maxresdefault.jpg'
            },
            {
                title: 'Business Opportunity',
                href: 'https://www.youtube.com/watch?v=6I56VvVsveE',
                type: 'text/html',
                youtube: '6I56VvVsveE',
                poster: 'https://img.youtube.com/vi/6I56VvVsveE/maxresdefault.jpg'
            },
            {
                title: 'Foodcart Franchise',
                href: 'https://www.youtube.com/watch?t=15s&v=QN0Itos5D3E',
                type: 'text/html',
                youtube: 'QN0Itos5D3E',
                poster: '/img/foodcart.png'
            },
            {
                title: 'The Grand Launch',
                href: 'https://www.youtube.com/watch?v=KtTIQokv2y8',
                type: 'text/html',
                youtube: 'KtTIQokv2y8',
                poster: 'https://img.youtube.com/vi/KtTIQokv2y8/maxresdefault.jpg'
            },
            {
                title: 'Garcia Cambogia',
                href: 'https://www.youtube.com/watch?v=0jOAxake3XY',
                type: 'text/html',
                youtube: '0jOAxake3XY',
                poster: '/img/products/grape-juice-with-garcinia-cambogia.jpg'
            }
        ],
        youtube_id: 'l-nKCcfSMHc',
        loaded: false
    }),
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
            let width = window.innerWidth

            switch (this.$vuetify.breakpoint.name) {
            case 'xs': return `${width}px`
            case 'sm': return `${width}px`
            case 'md': return `${width}px`
            case 'lg': return `${width}px`
            case 'xl': return `${width}px`
            }
        },
        showVideoTitle () {
            switch (this.$vuetify.breakpoint.name) {
            case 'xs': return false
            case 'sm': return true
            case 'md': return true
            case 'lg': return true
            case 'xl': return true
            }
        }
    },
    methods: {
        changeVideo (video) {
            this.youtube_id = video.youtube
            this.loaded = true
        }

    }
}
</script>

<style>

</style>
