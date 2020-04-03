<template>
  <div class="container">
    <v-simple-table fixed-header>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left th name">店舗名</th>
            <th class="text-left th area">地域</th>
            <th v-if="!$vuetify.breakpoint.xsOnly" class="text-left th time">
              営業時間
            </th>
            <th v-if="smAndDown" class="text-left th holiday">定休日</th>
            <th class="text-right th category">ジャンル</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in items"
            :key="item.id"
            @click="toDetail(item.sys.id)"
          >
            <td>{{ item.fields.title }}</td>
            <td>{{ getInclude(item.fields.area).fields.name }}</td>
            <td v-if="!$vuetify.breakpoint.xsOnly">
              {{ item.fields.business_hours }}
            </td>
            <td v-if="smAndDown">{{ item.fields.holiday }}</td>
            <td class="text-right">
              <span
                v-for="cat in item.fields.category"
                :key="cat.sys.id"
                class="tag"
                >{{ getInclude(cat).fields.name }}</span
              >
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
// import axios from 'axios'
import client from '~/plugins/contentful'

export default {
  async asyncData() {
    let responsData = []
    await client
      .getEntries({
        content_type: 'storesToGo',
      })
      .then((res) => (responsData = res))
    return { responsData }
  },
  data() {
    return {
      responsData: null,
    }
  },
  computed: {
    items() {
      return this.responsData.items
    },
    smAndDown() {
      return !this.$vuetify.breakpoint.smAndDown
    },
  },
  methods: {
    toDetail(id) {
      this.$router.push({ path: `/store/${id}` })
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
.container {
  padding: 0 5vw;
}
.tag {
  background: #f5f5f5;
  padding: 5px 10px;
  margin: 0 3px;
}
.theme--light.v-data-table tbody tr {
  transition: color 1000ms cubic-bezier(0.075, 0.82, 0.165, 1);
}

.theme--light.v-data-table
  tbody
  tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  cursor: pointer;
  background: #fff;
  color: #999;
}
.v-data-table td {
  padding: 5px 16px;
  .xs &,
  .sm & {
    font-size: 12px;
  }
}
table .th {
  white-space: nowrap;
  &.name {
    width: 15vw;
  }
  &.area {
    width: 5rem;
  }
  &.time {
    width: 25vw;
  }
  &.category {
    width: 10rem;
  }
  .xs &,
  .sm & {
    font-size: 12px;
    &.name {
      width: 13rem;
    }
  }
}
</style>
