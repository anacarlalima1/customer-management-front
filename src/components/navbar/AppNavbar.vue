<template>
  <v-app-bar
      color="primary"
      prominent
  >
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title>My files</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon @click="goBack" v-if="$route.path !== '/'">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
  </v-app-bar>

  <v-navigation-drawer
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'bottom' : undefined"
      temporary
  >
    <v-list>
      <v-list-item
          v-for="item in items"
          :key="item.title"
          @click="goTo(item.value)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    items: [
      {
        title: 'Início',
        value: '/',
      },
      {
        title: 'Cadastro de Clientes',
        value: '/register',
      },
      {
        title: 'Fizz',
        value: 'fizz',
      },
      {
        title: 'Buzz',
        value: 'buzz',
      },
    ],
  }),
  methods:{
    goTo(route) {
      this.$router.push(route);
      this.drawer = false;
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  watch: {
    group () {
      this.drawer = false
    },
  },
}
</script>