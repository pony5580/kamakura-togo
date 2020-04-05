<template>
  <div class="wrp">
    <header class="c-article__header">
      <h1>{{ item.title }}</h1>
      <div class="c-article__categories">
        <span v-for="cat in item.category" :key="cat.id" class="tag">{{
          cat.fields.name
        }}</span>
      </div>
    </header>

    <section class="p-article__body__spec">
      <div class="c-article__spec">
        <div class="c-article__spec__col--1">詳細</div>
        <div class="c-article__spec__col--2">
          <span v-html="$sanitize(getHTML(item.description))"></span>
        </div>
      </div>
    </section>

    <section class="p-article__body__spec">
      <div class="c-article__spec">
        <div class="c-article__spec__col--1">住所</div>
        <div class="c-article__spec__col--2">
          <a
            :href="'https://www.google.co.jp/maps/dir//' + item.address"
            target="_blank"
          >
            {{ item.address }}
          </a>
        </div>
      </div>
    </section>

    <section class="p-article__body__spec">
      <div class="c-article__spec">
        <div class="c-article__spec__col--1">電話番号</div>
        <div class="c-article__spec__col--2">
          {{ item.tel }}
        </div>
      </div>
    </section>

    <section class="p-article__body__spec">
      <div class="c-article__spec">
        <div class="c-article__spec__col--1">営業時間</div>
        <div class="c-article__spec__col--2">
          {{ item.business_hours }}
        </div>
      </div>
    </section>

    <section class="p-article__body__spec">
      <div class="c-article__spec">
        <div class="c-article__spec__col--1">定休日</div>
        <div class="c-article__spec__col--2">{{ item.holiday }}</div>
      </div>
    </section>
    <section class="back" @click="$router.push({ path: `/` })">
      <img src="~/assets/images/back.svg" />
    </section>
  </div>
</template>
<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import axios from '~/plugins/axios'
export default {
  async asyncData({ env, params }) {
    const res = await axios.get(`/_nuxt/api/datas.json`)
    const item = res.data.items.find((item) => {
      return item.id === params.id
    })
    return { item }
  },
  methods: {
    getHTML(data) {
      return documentToHtmlString(data)
    },
  },
}
</script>

<style lang="scss">
.c-article__header {
  text-align: center;
  max-width: 600px;
  padding: 18px 0 23px;
  margin: 0 auto;
  h1 {
    font-size: 20px;
    font-weight: bold;
  }
  .c-article__categories {
    padding: 20px 0 0;
    display: flex;
    justify-content: center;
  }
}
.c-article__spec {
  border-top: 1px solid #f2f2f2;
  padding: 18px 0 23px;
  font-size: 14px;
  max-width: 600px;
  margin: 0 auto;
}
.c-article__spec__col--1 {
  font-size: 10px;
  font-weight: bold;
  margin-bottom: 10px;
}
.c-article__spec__col--2 {
  line-height: 2;
  word-break: break-all;
}
.back {
  cursor: pointer;
  margin: 20px 0 10px;
  img {
    display: block;
    margin: 0 auto;
    width: 10px;
  }
  &:hover {
    opacity: 0.6;
  }
}
</style>
