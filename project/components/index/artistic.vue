<template>
  <section class="m-istyle">
    <dl @mouseover="over">
      <dt>有格调</dt>
      <dd
        :class="{active:kind==='all'}"
        kind="all"
        keyword="景点"
      >全部</dd>
      <dd
        :class="{active:kind==='part'}"
        kind="part"
        keyword="美食"
      >约会聚餐</dd>
      <dd
        :class="{active:kind==='spa'}"
        kind="spa"
        keyword="丽人"
      >丽人SPA</dd>
      <dd
        :class="{active:kind==='movie'}"
        kind="movie"
        keyword="电影"
      >电影演出</dd>
      <dd
        :class="{active:kind==='travel'}"
        kind="travel"
        keyword="旅游"
      >品质出游</dd>
    </dl>
    <ul class="ibody">
      <li
        v-for="item in cur"
        :key="item.title"
      >
        <el-card
          :body-style="{ padding: '0px' }"
          shadow="never"
        >
          <img
            :src="item.img"
            class="image"
          >
          <ul class="cbody">
            <li class="title">{{ item.title }}</li>
            <li class="pos"><span>{{ item.pos }}</span></li>
            <li class="price">￥<em>{{ item.price }}</em><span>/起</span></li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data: () => {
    return {
      kind: 'all',
      list: {
        all: [
          // {
          //   img:
          // 		'//p0.meituan.net/hotel/01b1941a2e0bf25aed72f69b39e2298c362774.png@368w_208h_1e_1c',
          //   title: '东方之家酒店',
          //   pos: '酒店套餐',
          //   price: 398
          // }
        ],
        part: [],
        spa: [],
        movie: [],
        travel: []
      }
    }
  },
  computed: {
    cur() {
      return this.list[this.kind]
    }
  },
  async mounted() {
    const that = this
    const { status, data: { count, pois }} = await that.$axios.get('/home/resultsByKeywords', {
      params: {
        keyword: '景点',
        city: that.$store.state.city.position.city
      }
    })
    if (status === 200 && count > 0) {
      const r = pois.filter(item => item.photos.length).map(item => {
        return {
          title: item.name,
          pos: item.type.split(';')[0],
          price: item.biz_ext.cost || '暂无',
          img: item.photos[0].url,
          url: '//abc.com'
        }
      })
      that.list[that.kind] = r.slice(0, 9)
    } else {
      that.list[that.kind] = []
    }
  },
  methods: {
    over: async function(e) {
      const dom = e.target // Current element
      const tag = dom.tagName.toLowerCase()
      if (tag === 'dd') {
        this.kind = dom.getAttribute('kind')
        // Online data
        // const keyword = dom.getAttribute('keyword')
        // const { status, data: { count, pois }} = await this.$axios.get('/search/resultsByKeywords', {
        //   params: {
        //     keyword,
        //     city: this.$store.state.city.position.city
        //   }
        // })
        // Local data
        const { status, data: { count, pois }} = await this.$axios.get('/home/resultsByKeywords')
        if (status === 200 && count > 0) {
          const r = pois
            .filter((item) => item.photos.length && item.kind === this.kind)
            .map((item, index) => {
              return {
                title: item.name,
                pos: item.type.split(';')[0],
                price: item.biz_ext.cost || '暂无',
                img: item.photos[0].url,
                url: '//abc.com'
              }
            })
          const all = pois
            .filter((item) => item.photos.length)
            .map((item, index) => {
              return {
                title: item.name,
                pos: item.type.split(';')[0],
                price: item.biz_ext.cost || '暂无',
                img: item.photos[0].url,
                url: '//abc.com'
              }
            })
          this.list[this.kind] = r.slice(0, 9) // add data
          this.list['all'] = all.slice(0, 9)
        } else {
          this.list[this.kind] = []
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/index/artistic.scss';
</style>
