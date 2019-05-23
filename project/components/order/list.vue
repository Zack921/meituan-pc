<template>
  <div class="m-order">
    <ul>
      <li v-if="tableData.length">
        <el-row
          v-for="(item, idx) in tableData"
          :key="idx">
          <el-col :span="4">
            <img
              :src="item.img"
              alt="">
          </el-col>
          <el-col :span="10">
            <h4>{{ item.name }}</h4>
            <p>数量: {{ item.count }}</p>
          </el-col>
          <el-col :span="4">
            总价: $ {{ item.total }}
          </el-col>
          <el-col :span="6">
            {{ toStatusText(item.status) }}
          </el-col>
        </el-row>
      </li>
      <li
        v-else
        class="empty">
        没有订单
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  props: {
    tableData: {
      type: Array,
      default: ()=>[]
    }
  },
  computed: {},
  watch: {},
  methods: {
    toStatusText: function(status){
      switch (status){
        case 0:
          return '待使用'
        case 1:
          return '待评价'
        case 2:
          return '待付款'
        default: 
          return ''
      }
    }
  }
}
</script>

<style></style>
