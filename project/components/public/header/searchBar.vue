<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col
        :span="3"
        class="left">
        <img
          src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png"
          alt="美团">
      </el-col>
      <el-col
        :span="15"
        class="center">
        <div class="wrapper">
          <el-input
            placeholder="搜索商家或地点"
            v-model="input"
            @focus="focus"
            @blur="blur"
            @input="handleInput"/>
          <button class="el-button el-button--primary"><i class="el-icon-search"/></button>
          <dl 
            class="hotPlace"
            v-if="isHotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item, index) in hotPlaceData" :key="index">{{item}}</dd>
          </dl>
          <dl 
            class="searchList"
            v-if="isSearchPlace">
            <dd v-for="(item, index) in searchPlaceData" :key="index">{{item}}</dd>
          </dl>
        </div>
        <p class="suggest">
          <nuxt-link to="/products?keyword=故宫博物院">故宫博物院</nuxt-link>
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
        </p>
        <ul class="nav">
          <li><nuxt-link
            to="/"
            class="takeout">美团外卖</nuxt-link></li>
          <li><nuxt-link
            to="/"
            class="movie">猫眼电影</nuxt-link></li>
          <li><nuxt-link
            to="/"
            class="hotel">美团酒店</nuxt-link></li>
          <li><nuxt-link
            to="/"
            class="apartment">民宿/公寓</nuxt-link></li>
          <li><nuxt-link
            to="/"
            class="business">商家入驻</nuxt-link></li>
        </ul>
      </el-col>
      <el-col
        :span="6"
        class="right">
        <ul class="security">
          <li><i class="refund"/><p class="txt">随时退</p></li>
          <li><i class="single"/><p class="txt">不满意免单</p></li>
          <li><i class="overdue"/><p class="txt">过期退</p></li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  components: {},
  data() {
    return {
      isFocus: false,
      input: '',
      hotPlaceData: [],
      searchPlaceData: []
    }
  },
  computed: {
    isHotPlace: function(){
      return this.isFocus && !this.input;
    },
    isSearchPlace: function(){
      return this.isFocus && this.input;
    }
  },
  async mounted(){
    const _self = this;
    const {status, data:{result}} = await this.$axios.get('/home/hotSearch',{
      params:{
        city: _self.$store.state.city.position.city.replace('市','')
      }
    })
    if(status === 200 && result){
      this.hotPlaceData = result.map(item => item.name);
    }
  },
  watch: {},
  methods: {
    focus: function(){
      this.isFocus = true;
    },
    blur: function(){
      let _self = this;
      setTimeout(function(){
        _self.isFocus = false;
      },200);
    },
    handleInput: _.debounce(async function() { // _.debounce: Delay function
      this.searchPlaceData = [];
      const _self = this;
      const city = this.$store.state.city.position.city.replace('市', '')
      const {status, data:{top}} = await this.$axios.get('/home/top',{
        params: {
          city,
          input: _self.input
        }
      });
      if(status === 200){
        if(top.length){
          _self.searchPlaceData = top.map(item => item.name);
        }else{
          _self.searchPlaceData = ['暂无数据'];
        }
      }
    }, 300)
  }
}
</script>

<style></style>
