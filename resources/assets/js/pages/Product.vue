<template>
  <main-layout v-if="product" :class="[contentClass]">
    <p>{{slug}}</p>
    <p>Display Product</p>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import Theme from '../mixins/theme'

export default {
    props: ['slug'],
    mixins: [Theme],
    components: {
        MainLayout
    },
    data: () => ({
        contentClass: { 'grey': true, 'lighten-4': true, 'accent--text': true },
        product: null
    }),
    created () {
        let self = this
        self.getProduct()
    },
    methods: {
        getProduct () {
            let self = this
            let slug = {slug: self.slug}
            axios.get(route('api.product.show', slug)).then((response) => {
                self.product = response.data.data
            }).catch(({errors, message}) => {
                console.log(errors)
                self.$router.push({name: 'error'})
                vm.$popup({ message: message, backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
            })
        }

    },
    watch: {
        slug () {
            this.getProduct()
        },
        category: {
            handler: function (newValue) {
                console.log('Category Fetched', newValue)
            },
            deep: true
        }
    }
}
</script>
