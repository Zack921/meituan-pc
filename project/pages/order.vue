<template>
  <div class="page-order">
    <el-row>
      <el-col :span="4" class="navbar">
        <h3>我的美团</h3>
        <dl>
          <dt>我的订单</dt>
          <dd>全部订单<i class="el-icon-arrow-right"/></dd>
          <dd>待付款<i class="el-icon-arrow-right"/></dd>
          <dd>待使用<i class="el-icon-arrow-right"/></dd>
        </dl>
        <dl>
          <dt>我的收藏</dt>
          <dd>收藏的商家<i class="el-icon-arrow-right"/></dd>
          <dd>收藏的团购<i class="el-icon-arrow-right"/></dd>
        </dl>
        <dl>
          <dt>抵用卷</dt>
          <dd>可用卷<i class="el-icon-arrow-right"/></dd>
          <dd>失效卷<i class="el-icon-arrow-right"/></dd>
        </dl>
      </el-col>
      <el-col :span="19" class="table">
        <el-tabs v-model="activeName">
          <el-tab-pane label="全部订单" name="all">
            <List :tableData="curData" />
          </el-tab-pane>
          <el-tab-pane label="待付款" name="unpay">
            <List :tableData="curData" />
          </el-tab-pane>
          <el-tab-pane label="待使用" name="unuse">
            <List :tableData="curData" />
          </el-tab-pane>
          <el-tab-pane label="待评价" name="unreplay">
            <List :tableData="curData" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import List from '../components/order/list';
export default {
  components: {
    List
  },
  data() {
    return {
      activeName: 'all'
    }
  },
  computed: {},
  watch: {
    activeName: function(){
      let status = this.toStatus(this.activeName);
      if(status === -1){
        this.curData = this.orders;
      }else{
        this.curData = this.orders.filter(item => item.status === status);
      }
    }
  },
  methods: {
    toStatus: function(statusText){
      switch (statusText){
        case 'unuse':
          return 0
        case 'unreplay':
          return 1
        case 'unpay':
          return 2
        default: 
          return -1
      }
    }
  },
  async asyncData(ctx){
    const {status, data: {code, orders}} = await ctx.$axios.post('/order/getOrder');
    if(status === 200 && code === 0){
      return {
        orders,
        curData: orders
      };
    }else{
      return {
        orders: [],
        curData: []
      };
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/css/order/index.scss';
</style>
