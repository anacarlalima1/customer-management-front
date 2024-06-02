<template>
  <v-app>
    <v-main>
      <Navbar/>
      <div id="app">
        <router-link to="/"></router-link>
        <router-view/>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/navbar/AppNavbar.vue'
export default {
  name: 'App',

  components: {
    Navbar,
  },

  data: () => ({
    //
  }),
}
</script>
