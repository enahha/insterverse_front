<template>
  <router-view />
  <Footer></Footer>
</template>
<script>
import { defineComponent } from 'vue';
import Footer from './layouts/Footer.vue'

export default defineComponent({
  name: 'App',
  components: {
    Footer
  }
})
</script>
