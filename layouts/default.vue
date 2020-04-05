<template>
  <v-app :class="$vuetify.breakpoint.name">
    <section class="attention">
      営業時間や営業形態等が日々変わることが予想されますので詳しくはお店にご確認ください。
    </section>
    <header class="gheader" @click="$router.push({ path: `/` })">
      <logo />
    </header>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <footer class="gfooter">
      <v-container>
        <v-row>
          <v-col cols="12">
            <p>
              各行政機関の新型コロナウイルス感染症対策についての最新情報をご確認の上ご利用ください。
            </p>
          </v-col>
          <v-col cols="12">
            <a href="http://www.pref.kanagawa.jp/osirase/1369/" target="_blank"
              >神奈川県：新型コロナウイルス感染症対策サイト</a
            >
          </v-col>
          <v-col cols="12">
            <a
              href="https://www.cas.go.jp/jp/influenza/novel_coronavirus.html"
              target="_blank"
              >内閣官房：新型コロナウイルス感染症の対応について</a
            >
          </v-col>
          <v-col cols="12">
            <a
              href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000164708_00001.html"
              target="_blank"
              >厚生労働省：新型コロナウイルス感染症について</a
            >
          </v-col>
        </v-row>
      </v-container>
      <img src="~/assets/images/mark.svg" class="mark" />
      <span class="copy">We pray for peaceful days to return quickly. </span>
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
.attention {
  background: #9bcad0;
  text-align: center;
  font-size: 12px;
  padding: 5px;
  color: #333;
}
.gheader {
  padding: 30px;
  margin: 0 auto;
  width: 100%;
  .xs & {
    padding-bottom: 10px;
  }
}
.gfooter {
  border-top: 1px solid #f2f2f2;
  padding: 50px 0;
  text-align: center;
  font-size: 12px;
  margin-top: 70px;
  .copy {
    font-size: 10px;
    color: #999;
  }
  a {
    color: #333 !important;
  }
  .xs & {
    margin-top: 0px;
    padding: 20px 0;
  }
}

.mark {
  width: 80px;
  display: block;
  margin: 20px auto 20px;
}
</style>
