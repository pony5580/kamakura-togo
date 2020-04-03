<template>
  <div class="container">
    <header class="c-article__header">
      <h1>{{ item.fields.title }}</h1>
      <div class="c-article__categories">
        <span
          v-for="cat in item.fields.category"
          :key="cat.sys.id"
          class="tag"
          >{{ getInclude(cat).fields.name }}</span
        >
      </div>
    </header>

    <section class="p-article__body__spec">
      <div class="c-article__spec">
        <div class="c-article__spec__col--1">詳細</div>
        <div class="c-article__spec__col--2">
          <span v-html="$sanitize(getHTML(item.fields.description))"></span>
        </div>
      </div>
    </section>

    <section class="p-article__body__spec">
      <div class="c-article__spec">
        <div class="c-article__spec__col--1">住所</div>
        <div class="c-article__spec__col--2">
          {{ item.fields.address }}
        </div>
      </div>
    </section>

    <section class="p-article__body__spec">
      <div class="c-article__spec">
        <div class="c-article__spec__col--1">電話番号</div>
        <div class="c-article__spec__col--2">
          {{ item.fields.tel }}
        </div>
      </div>
    </section>

    <section class="p-article__body__spec">
      <div class="c-article__spec">
        <div class="c-article__spec__col--1">営業時間</div>
        <div class="c-article__spec__col--2">
          {{ item.fields.business_hours }}
        </div>
      </div>
    </section>

    <section class="p-article__body__spec">
      <div class="c-article__spec">
        <div class="c-article__spec__col--1">定休日</div>
        <div class="c-article__spec__col--2">{{ item.fields.holiday }}</div>
      </div>
    </section>
  </div>
</template>
<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import client from '~/plugins/contentful'
export default {
  async asyncData({ env, params }) {
    let responsData = null
    await client
      .getEntries({
        content_type: 'storesToGo',
        'sys.id': params.id,
      })
      .then((res) => (responsData = res))
    return { responsData }
  },
  data() {
    return {
      responsData: '',
    }
  },
  computed: {
    item() {
      return this.responsData.items[0]
    },
  },
  methods: {
    getHTML(data) {
      return documentToHtmlString(data)
    },
    getInclude(data) {
      return this.responsData.includes.Entry.find((i) => {
        return i.sys.id === data.sys.id
      })
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
</style>
