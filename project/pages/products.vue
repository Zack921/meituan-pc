<template>
 <el-row class="page-product">
   <el-col :span="19">
    <Crumb :keyword="keyword"/>
    <Category :categoryData="categoryData" :areaData="areaData"/>
    <List :list="list"/>
   </el-col>
   <el-col :span="5">
     <MyMap 
      v-if="point.length"
      :width="230"
      :height="290"
      :point="point"/>
   </el-col>
 </el-row>
</template>

<script>
import Crumb from '@/components/products/crumb.vue';
import Category from '@/components/products/category.vue';
import List from '@/components/products/list.vue';
import MyMap from '@/components/public/map.vue';
export default {
  components: {
    Crumb,
    Category,
    List,
    MyMap
  },
  data() {
    return {
      keyword: '',
      categoryData: [],
      areaData: [],
      list:[],
      point: []
    }
  },
  async asyncData(ctx){ // ssr
    const keyword = ctx.query.keyword ? ctx.query.keyword : '';
    const city = ctx.store.state.city.position.city.replace('市','')
    const {status, data: {types: categoryData, areas: areaData}} = await ctx.$axios.get('/products/getCategory', {
      params: {
        city
      }
    });
    const {status: status2, data:{pois: list}} = await ctx.$axios.get('home/resultsByKeywords', {
      params: {
        city
      }
    });
    if(status === 200 && status2 === 200){
      return {
        keyword,
        categoryData,
        areaData,
        list: list.filter(item => item.photos.length > 0),
        point: list[0].entr_location.split(',')
      };
    }
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style lang="scss">
  @import "@/assets/css/products/index.scss";
</style>
