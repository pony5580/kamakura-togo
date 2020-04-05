<template>
  <div class="wrp">
    <v-container class="search">
      <v-row align="center">
        <v-col class="d-flex" cols="12">
          <v-select
            v-model="area"
            :items="getAreas()"
            item-text="name"
            item-value="name"
            label="地域"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
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
          <tr v-for="item in items" :key="item.id" @click="toDetail(item.id)">
            <td>{{ item.title }}</td>
            <td>{{ item.area.fields.name }}</td>
            <td v-if="!$vuetify.breakpoint.xsOnly">
              {{ item.business_hours }}
            </td>
            <td v-if="smAndDown">{{ item.holiday }}</td>
            <td class="text-right">
              <span
                v-for="cat in item.category"
                :key="cat.sys.id"
                class="tag"
                >{{ cat.fields.name }}</span
              >
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
import axios from '~/plugins/axios.js'
export default {
  async asyncData() {
    const res = await axios.get(`/_nuxt/api/datas.json`)
    return { responsData: res.data }
  },
  data() {
    return {
      area: '未設定',
      category: '未設定',
    }
  },
  computed: {
    items() {
      let data = this.responsData.items
      if (this.area !== '未設定') {
        data = data.filter((item) => {
          return item.area.fields.name === this.area
        })
      }
      return data
    },
    smAndDown() {
      return !this.$vuetify.breakpoint.smAndDown
    },
  },
  methods: {
    toDetail(id) {
      this.$router.push({ path: `/store/${id}` })
    },
    getAreas() {
      return [{ name: '未設定' }, ...this.responsData.areas]
    },
  },
}
</script>

<style lang="scss">
.search {
  width: 50vw;
  .xs & {
    width: 100%;
  }
}
.tag {
  background: #f5f5f5;
  padding: 5px 10px;
  margin: 0 3px;
}
.wrp {
  .theme--light.v-data-table tbody tr {
    transition: color 1000ms cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  .theme--light.v-data-table
    tbody
    tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    cursor: pointer;
    background: #fff !important;
    color: #999;
  }
  .v-data-table td {
    padding: 5px 16px !important;
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
      width: 6rem;
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
}
</style>
