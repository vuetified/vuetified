<template>
  <main-layout :class="[contentClass]">
    <p>Support</p>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import Theme from '../mixins/theme'

export default {
    mixins: [Theme],
    data: () => ({
        contentClass: { 'grey': true, 'lighten-4': true, 'accent--text': true }
    }),
    components: {
        MainLayout
    }
}
</script>
