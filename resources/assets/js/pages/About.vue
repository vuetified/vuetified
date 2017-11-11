<template>
  <main-layout :class="[contentClass]" :style="{ paddingTop: `56px`}">
    <v-parallax src="/img/bg.jpg">
      <v-layout column align-center justify-center>
        <h4 class="white--text">ABOUT IAMWORLDWIDE CORPORATION</h4>
        <h5 class="white--text" text-xs-center>
            A company committed in upgrading the quality of life – it was designed for dedicated, honest, hardworking, and self-motivated people who want to build their own business as Independent Distributors across the globe. Our portfolio offers a diverse and comprehensive range of marketing solutions, specialty products, and services aimed to drive individuals and families to financial excellence.
        </h5>
      </v-layout>
    </v-parallax>
    <v-container light>
        <v-layout row wrap >
          <v-flex xs12>
              <h2 light>
                  Company Profile
              </h2>
              <p>
                  IAM Worldwide is a company committed to upgrading the quality of life – it was designed for dedicated, honest, hardworking, and self-motivated people who want to build their own businesses as Independent Distributors across the globe. Our portfolio offers a diverse and comprehensive range of marketing solutions, specialty products, and services aimed to drive individuals and families to financial excellence.
              </p>
              <p pa-5>
                  The company was founded by Mr. Allen Marvin Yu Eder and Ms. Aika Lorraine Uy who are both seasoned network marketing professionals and entrepreneurs. With an impeccable track record for being consistent top earners from several other marketing companies, they have both built unrelenting multi-million sales teams worldwide. Through their passion for helping individuals achieve financial freedom and personal greatness, they have helped create more than a hundred millionaires over the years. The IAMWORLDWIDE leadership team has over 20 combined years of expertise in the relationship marketing industry, that they have only implemented the systems and practices into IAMWORLDWIDE that are proven to work best.
              </p>
          </v-flex>

        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 md6 lg6 xl6 pa-2>
                <v-card-media
                    src="/img/am2.jpg"
                    height="450px"
                    contain
                    >
                    </v-card-media>
            </v-flex>
             <v-flex xs12 md6 lg6 xl6 pa-2>

                <v-card-media
                    src="/img/aika2.jpg"
                    height="450px"
                    contain
                    >
                    </v-card-media>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex
            v-bind="{ [`xs${card.xs}`]: true, [`sm${card.sm}`]: true, [`md${card.md}`]: true,[`lg${card.lg}`]: true,[`xl${card.xl}`]: true }"
            v-for="card in showcase"
            :key="card.title"
            class="pa-2"
            >
            <v-card-text>
                <p class="text-xs-center">
                    <v-btn icon v-if="card.icon" :color="card.color">
                    <v-icon>{{ card.icon }}</v-icon>
                </v-btn>
                </p>
            </v-card-text>
                <v-card flat style="background-color:transparent;">
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
        <v-layout row wrap>
             <v-flex xs12>
              <h2 light>
                  Company Core Values
              </h2>
          </v-flex>
            <v-flex
            v-bind="{ [`xs${card.xs}`]: true, [`sm${card.sm}`]: true, [`md${card.md}`]: true,[`lg${card.lg}`]: true,[`xl${card.xl}`]: true }"
            v-for="card in values"
            :key="card.title"
            class="pa-2"
            >
                <v-card-text>
                <p class="text-xs-center">
                    <v-btn icon v-if="card.icon" :color="card.color">
                    <v-icon>{{ card.icon }}</v-icon>
                </v-btn>
                </p>
                </v-card-text>
                <v-card flat style="background-color:transparent;">
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <p class="headline primary--text" v-text="card.title"></p>
                        <v-spacer></v-spacer>
                        <v-btn icon @click.native="card.show = !card.show" class="accent--text" v-if="card.title">
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

  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import Theme from '../mixins/theme'

export default {
    mixins: [Theme],
    data: () => ({
        contentClass: { 'grey': true, 'lighten-4': true, 'accent--text': true },
        showcase: [
            { color: 'primary', icon: 'fa-eye', show: true, title: 'VISION', tagline: 'IAMWORLDWIDE aims to be one of the most admired direct sales companies here and around the globe. Armed with a purpose to bring real change in our people’s total well-being including one’s health, prosperity, and balance. By living for others, we help MOVE them to improved lives whatever the situation and no matter the circumstance.', xs: 12, sm: 12, md: 4, lg: 4, xl: 4 },
            { color: 'accent', icon: 'fa-fa', show: true, title: 'MISSION', tagline: 'IAMWORLDWIDE’s objective is to enrich the lives of our customers, independent distributors, employees, and the community by providing them with the best-in-market business opportunities, and to be at the forefront of bringing world-class quality products to whomever and wherever they may be in the world.', xs: 12, sm: 12, md: 4, lg: 4, xl: 4 },
            { color: 'pink', icon: 'fa-handshake-o', show: true, title: 'OUR PLEDGE', tagline: 'At IAMWORLDWIDE, we’re not just committed to sales and marketing. We also recognize our obligation to the world – to provide first-class quality products to our clients, to instill an environment of continuous learning and mentoring amongst colleagues, to better the lives of our distributors & the communities we serve, and to inspire others to do the same. This commitment of moving humanity is how we do business every single day. LIVE. INSPIRE. MOVE.', xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }
        ],
        values: [
            { color: 'yellow', icon: 'fa-star', show: true, title: 'Integrity First', tagline: 'We commit to provide high quality products as zealous as protecting our reputation. We value trustworthiness by choosing to do what is right even when no one is watching. We envision ourselves in the forefront of nation building by adhering to our government obligations, being proponents of transparency, and to be advocates of lawful business practices.', xs: 12, sm: 12, md: 4, lg: 4, xl: 4 },
            { color: 'info', icon: 'fa-user', show: true, title: 'Empowering People', tagline: 'As a company, we are constantly redefining our objectives, expectations, and limits. Our people are our lifeblood. We strive to create an atmosphere that appreciates, inspires, and enables everyone to transcend their potentials. And we recognize their value by ensuring them the right compensation and providing them with the best packages the industry could offer.', xs: 12, sm: 12, md: 4, lg: 4, xl: 4 },
            { color: 'red', icon: 'fa-heart', show: true, title: 'Shaping Spirituality', tagline: 'The IAMWORLDWIDE community seeks to honor God by making an impact on the lives of our independent distributors, employees, and customers. We are but His stewards of this business and that it exists for the purpose of impacting people for eternity, making sure that all we do in and through the business honors Him.', xs: 12, sm: 12, md: 4, lg: 4, xl: 4 },
            { color: 'grey', icon: 'fa-building', show: true, title: 'Transforming Communities', tagline: 'With a business model focused on uplifting the lives of our people, we, in turn, use our talents and treasures to make a difference to those who need it most. We believe we have a responsibility to give back to the community through our IAM CARES foundation. Whether via sponsorships, community service, or fund raising events, we shall foster a culture of generosity – for in giving do we receive.', xs: 12, sm: 12, md: 4, lg: 4, xl: 4 },
            { color: '', icon: '', show: true, title: '', tagline: '', xs: 12, sm: 12, md: 4, lg: 4, xl: 4 },
            { color: 'blue', icon: 'fa-thumbs-up', show: true, title: 'Passion for Excellence', tagline: 'Our endeavor entails pursuing what is right, over and over again. A habituation of demanding more of ourselves than our customers would. Through our persistence in finding better ways of doing what we do, and by declaring & attaining ambitious goals, we set new standards in our industry even exceeding our own expectations. We do not rest on our achievements. Rather, we passionately build on them in our personal and professional journey, wherever we may be in the world.', xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }
        ]
    }),
    components: {
        MainLayout
    }
}
</script>
