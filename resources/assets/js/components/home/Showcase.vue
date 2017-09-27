<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex
            v-bind="{ [`xs${card.xs}`]: true, [`sm${card.sm}`]: true, [`md${card.md}`]: true,[`lg${card.lg}`]: true,[`xl${card.xl}`]: true }"
            v-for="card in showcase"
            :key="card.title"
            class="pa-2"
            >
                <v-card flat style="background-color:transparent;">
                    <v-card-media
                    :src="card.src"
                    height="150px"
                    contain
                    >
                    </v-card-media>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <p class="headline primary--text" v-text="card.title"></p>
                        <v-spacer></v-spacer>
                        <v-btn icon @click.native="card.show = !card.show" class="accent--text">
                            <v-icon>{{ card.show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
                        </v-btn>
                    </v-card-actions>
                    <v-slide-y-transition>
                        <v-card-text v-show="card.show" v-text="card.tagline" class="accent--text">
                        </v-card-text>
                    </v-slide-y-transition>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        showcase: [
            { show: true, title: 'Organic Products', tagline: 'We Promote Using Organic and Environmental Friendly Products. All Our Products Are Made 100% From Organic Substances.', src: '/img/organic.png', xs: 12, sm: 12, md: 3, lg: 3, xl: 3 },
            { show: true, title: 'Affordable Franchise', tagline: 'Start An Affordable Franchise yet Competitive With Your Market. We Provide Free Training and Orientation.Site Exploration For Faster ROI and A Recommendedation and Consultation Of Market Competitiveness.', src: '/img/foodcart.jpg', xs: 12, sm: 12, md: 3, lg: 3, xl: 3 },
            { show: true, title: 'Free Shipping', tagline: 'Buy a Minimum Required Amount From All Our Products and Receive Free Shipping. Only to People Residing Philippines.', src: '/img/free-delivery.png', xs: 12, sm: 12, md: 3, lg: 3, xl: 3 },
            { show: true, title: 'Referral Program', tagline: 'Want to Resell Our Products and Sell Online? Join Our Affiliate Program and Start Earning From Your Online Presence.', src: '/img/reseller.png', xs: 12, sm: 12, md: 3, lg: 3, xl: 3 }
        ]
    })
}
</script>

<style>

</style>
