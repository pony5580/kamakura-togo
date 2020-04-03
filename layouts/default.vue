<template>
  <v-app :class="$vuetify.breakpoint.name">
    <header class="gheader">
      <logo />
    </header>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <footer class="gfooter">
      <img src="~/assets/images/mark.svg" class="mark" />
      <span>We pray for peaceful days to return quickly. </span>
    </footer>
  </v-app>
</template>

<script>
import Logo from '~/components/Logo'
export default {
  components: {
    Logo,
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>

<style lang="scss">
.gheader {
  padding: 30px;
  margin: 0 auto;
  width: 100%;
  .xs & {
    padding-bottom: 0px;
  }
}
.gfooter {
  border-top: 1px solid #f2f2f2;
  padding: 50px 0;
  text-align: center;
  font-size: 10px;
  color: #999;
  margin-top: 100px;
  .xs & {
    margin-top: 0px;
    padding: 20px 0;
  }
}

.mark {
  width: 80px;
  display: block;
  margin: 0 auto 20px;
}
</style>
