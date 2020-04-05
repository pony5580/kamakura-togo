# 鎌倉のテイクアウト可能なお店リスト

> Nuxt.js _ Contentful _ Firebase で構築しています

[Nuxt.js](https://nuxtjs.org).

[Contentful](https://www.contentful.com/g).

[Firebase](https://firebase.google.com/?hl=jag).

## Build Setup

```bash
# install dependencies
$ yarn install

# 開発サーバーが localhost:3000 で立ち上がります
$ yarn dev

# 静的ページで出力してFirebaseにdeployしてください
$ yarn generate
```

## 環境変数について

Contentful の設定ファイルは.env ファイルで管理しリポジトリには入れてないので下記の内容の.env ファイルを作成して対応お願いします

```
CTF_SPACE_ID=<Contentfulで記載されているspace_id>
CTF_CDA_ACCESS_TOKEN=<Contentfulで記載されているアクセストークン>
CTF_BLOG_POST_TYPE_ID=<contentfulで記載されているポストタイプ>
```
