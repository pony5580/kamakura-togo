module.exports = function apiModule(moduleOptions) {
  this.nuxt.hook('build:before', async ({ app }) => {
    // contentful 初期化
    const contentful = require('contentful')

    const client = contentful.createClient({
      space: process.env.CTF_SPACE_ID,
      accessToken: process.env.CTF_CDA_ACCESS_TOKEN,
    })

    // contentfulからデータ取得
    const datas = await client.getEntries({
      content_type: process.env.CTF_BLOG_POST_TYPE_ID,
    })

    const items = datas.items.map((item) => {
      const data = item.fields
      data.id = item.sys.id
      return data
    })
    const areas = datas.includes.Entry.filter(
      (item) => item.sys.contentType.sys.id === 'area'
    ).map((item) => item.fields)

    const categories = datas.includes.Entry.filter(
      (item) => item.sys.contentType.sys.id === 'category'
    ).map((item) => item.fields)
    // JSON生成
    this.options.build.plugins.push({
      apply(compiler) {
        compiler.hooks.emit.tap('json', (compilation) => {
          compilation.assets[`api/datas.json`] = {
            source: () =>
              JSON.stringify({
                items,
                areas,
                categories,
              }),
            size: () => {},
          }
        })
      },
    })
    // link rel="prefetch"にJSONを追加
    this.options.head.link = [
      ...this.options.head.link,
      {
        rel: 'prefetch',
        href: `${this.options.build.publicPath}api/datas.json`,
        as: 'fetch',
      },
    ]

    if (this.options.dev) return

    this.nuxt.hook('build:done', (generator) => {
      const express = require('express')
      const app = express()

      app.use(express.static(this.options.generate.dir))

      const server = app.listen(process.env.PORT || 3000)

      this.nuxt.hook('generate:done', () => {
        server.close()
      })
    })
  })
}
