<template>
  <div class="page-cart">
    <el-row>
      <el-col v-if="cartData.length" :span="24" class="m-cart">
        <el-table
          :data="cartData"
          style="width: 980px">
          <el-table-column
            prop="name"
            label="项目"
            width="532">
          </el-table-column>
          <el-table-column
            prop="price"
            label="单价"
            width="132">
          </el-table-column>
          <el-table-column
            label="数量"
            width="212">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.num" :min="1"  />
            </template>
          </el-table-column>
          <el-table-column label="总价">
            <template slot-scope="scope">
              <div>{{`¥${scope.row.num * scope.row.price}`}}</div>
            </template>
          </el-table-column>
        </el-table>
        <p>应付金额：<em class="money">￥{{ total }}</em></p>
        <div class="post">
          <el-button
            type="primary"
            @click="submit"
          >提交订单</el-button>
        </div>
      </el-col>
      <el-col v-else class="empty">购物车为空</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {},
  computed: {
    total: function(){
      let temp = 0;
      this.cartData.forEach(item => {
        temp += item.num * item.price
      });
      return temp;
    }
  },
  watch: {},
  methods: {
    submit: async function(){
      const _self = this;
      const {status, data: {code, orderId}} = await this.$axios.post('/order/createOrder', {
        id: _self.$route.query.id
      });
      if(status === 200 && code === 0){
        this.$message({
          message: '提交成功',
          type: 'success',
          duration: 300
        });
        setTimeout(function(){
          _self.$router.push({path: '/order'});
        }, 500);
      }else{
        this.$message.error('提交失败');
      }
    }
  },
  async asyncData(ctx){
    const {status, data: {data, code}} = await ctx.$axios.post('/cart/getCart', {
      id: ctx.query.id
    })
    if(status === 200 && code === 0){
      return {
        cartData: data
      };
    }else{
      return {
        cartData: []
      };
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/cart/index.scss";
</style>
