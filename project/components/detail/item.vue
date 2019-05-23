<template>
  <li
    v-if="meta.photos.length"
    class="m-detail-item">
    <dl class="section">
      <dd>
        <img
          :src="meta.photos[0].url"
          :alt="meta.photos[0].title"
        >
      </dd>
      <dd>
        <h4>{{ meta.name }}</h4>
        <p>
          <span v-if="meta.biz_ext&&meta.biz_ext.ticket_ordering">剩余：{{ Number(meta.biz_ext.ticket_ordering) }}</span>
          <span v-if="meta.deadline">截止日期：{{ meta.deadline }}</span>
        </p>
        <p>
          <span class="price">{{ Number(meta.biz_ext.cost) }}</span>
          <sub>门店价{{ Number(meta.biz_ext.cost) }}</sub>
        </p>
      </dd>
      <dd>
        <el-button
          type="warning"
          round
          @click="createCart(meta.name, meta.biz_ext.cost, meta.photos[0].url)">立即抢购
        </el-button>
      </dd>
    </dl>
  </li>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  props: {
    meta: {
      type: Object,
      default: function(){
        return {}
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    createCart: async function(name, price, img){
      const _self = this;
      const detail = [{
        name,
        price,
        num: 1,
        img
      }];
      const {status, data: {cartNo, code}} = await this.$axios.post('/cart/createCart', {
        id: Math.random().toString().slice(3, 9),
        detail
      });
      if(status === 200 && code === 0){
        this.$message({
          message: '下单成功',
          type: 'success',
          duration: 1000
        });
        setTimeout(function(){
          _self.$router.push({path: `/cart?id=${cartNo}`});
        }, 500);
      }else{
        this.$message.error('订单创建失败');
      }
    }
  }
}
</script>

<style></style>
