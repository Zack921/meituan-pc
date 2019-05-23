<template>
  <div class="m-product-categroy">
    <dl class="classic">
      <dt>分类</dt>
      <dt>全部</dt>
      <dd 
        v-for="item in categoryData"
        :key="item.type">
        <Iselect :name="item.type" :list="item.module" />
      </dd>
    </dl>
    <dl class="classic">
      <dt>区域</dt>
      <dt>全部</dt>
      <dd 
        v-for="item in areaData"
        :key="item.type">
        <Iselect :name="item.type" :list="item.module" />
      </dd>
    </dl>
  </div>
</template>

<script>
import Iselect from './iselect';
export default {
  components: {
    Iselect
  },
  data() {
    return {}
  },
  props: {
    categoryData: { // [{type:'',module:[]}]
      type: Array,
      default() {
        return [];
      }
    },
    areaData: { // [{type:'',module:[]}]
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style lang="scss">
  .m-product-categroy{
    padding: 15px 20px 0;
    background: #FFF;
    border: 1px solid #E5E5E5;
    border-radius: 4px;
    color: #333;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }
  .classic{
    display: flex;
    padding-bottom: 10px;
    >dt{
      width: 80px;
      &:nth-child(2){
        border-radius: 100px;
        background: #13D1BE;
        color: #FFF;
        height: 22px;
        line-height: 22px;
        width: 40px;
        box-sizing: border-box;
        margin-right: 40px;
        text-align: center;
      }
    }
    &:nth-child(1){
      dd{
        border-bottom: 1px solid #ddd;
      }
    }
  }
</style>
