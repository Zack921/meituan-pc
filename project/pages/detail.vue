<template>
  <div class="page-detail">
    <el-row>
      <el-col :span="24">
        <Crumbs :type="type" :keyword="keyword" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <MySummary :meta="product" />
      </el-col>
    </el-row>
    <el-row class="m-title">
      <el-col :span="24">
        <h3>商家团购及优惠</h3>
      </el-col>
    </el-row>
    <el-row v-if="login">
      <el-col :span="24">
        <List v-if="canShow" :list="list" />
      </el-col>
    </el-row>
    <el-row v-else>
      <el-col :span="24">
        <div class="deal-need-login">
          <img
            src="https://i.loli.net/2019/01/10/5c3763c93e4bc.png"
            alt="登录查看"
          >
          <span>请登录后查看详细团购优惠</span>
          <el-button type="primary" round>
            <a href="/login">立即登录</a>
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Crumbs from '../components/detail/crumbs';
import MySummary from '../components/detail/summary';
import List from '../components/detail/list';
export default {
  components: {
    Crumbs,
    MySummary,
    List
  },
  data() {
    return {
      type: this.$route.query.type,
      keyword: this.$route.query.keyword,
    }
  },
  async asyncData(ctx){
    const city = ctx.store.state.city.position.city.replace('市','');
    const type = ctx.query.type;
    const keyword = ctx.query.keyword;
    const {status, data: {product, more: list, login}} = await ctx.$axios.get('/detail/getPdDetail',{
      params: {
        city,
        type,
        keyword
      }
    });
    if(status === 200){
      return {
        product,
        list,
        login
      }
    }else{
      return {
        product: {},
        list: [],
        login: false
      }
    }
  },
  computed: {
    canShow() {
      return this.list.filter(item => item.photos.length).length
    }
  },
  watch: {},
  methods: {}
}
</script>

<style lang="scss">
  @import "@/assets/css/detail/index.scss";
</style>
