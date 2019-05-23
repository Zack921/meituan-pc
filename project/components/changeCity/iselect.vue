<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select v-model="sProvince" placeholder="省份">
      <el-option
        v-for="item in provinces"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select 
      v-model="sCity" 
      placeholder="城市"
      :disabled="!cities.length"
      @change="handleSelect">
      <el-option
        v-for="item in cities"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <span class="name">直接搜索:</span>
    <el-select
      v-model="sCityInSearch"
      filterable
      remote
      clearable
      placeholder="请输入城市中文或拼音"
      @change="handleSelect"
      :remote-method="remoteMethod">
      <el-option
        v-for="item in citiesInSearch"
        :key="item.id"
        :label="item.value"
        :value="item.id">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  components: {},
  data() {
    return {
      provinces: [],
      sProvince: '',
      cities: [],
      sCity: '',
      citiesInSearch: [],
      sCityInSearch: '',
      allCities: []
    }
  },
  async mounted(){
    const _self = this;
    const {status, data: {provinces, code}} = await this.$axios.get('/city/getProvinces');
    if(status === 200 && code === 0){
      _self.provinces = provinces.map(item => {
        return {
          label: item.value,
          value: item.id
        };
      });
    }
    this.remoteMethod('');
  },
  computed: {},
  watch: {
    sProvince: async function(newVal){
      const _self = this;
      const {status, data: {cities, code}} = await this.$axios.get(`/city/getCitiesByProvince?id=${newVal}`);
      if(status === 200 && code === 0){
        _self.cities = cities.map(item => {
          return {
            label: item.name === '市辖区' ? item.province : item.name,
            value: item.id
          };
        });
      }
    }
  },
  methods: {
    remoteMethod: _.debounce(async function(query){
      this.citiesInSearch = this.allCities;
      if(this.allCities.length){
        this.citiesInSearch = this.allCities.filter(item => item.value.indexOf(query) > -1);
      }else{
        const {status, data: {cities, code}} = await this.$axios.get('/city/getAllCities');
        if(status === 200 && code === 0){
          const wantCityArr = [];
          let tempCityArr = [];
          for(let obj of cities){
            wantCityArr.push(...obj.value);
          }
          this.allCities = wantCityArr.map(item => {
            return {
              value: item.name === '市辖区' ? item.province : item.name,
              id: item.id,
              province: item.province
            };
          });
          this.citiesInSearch = this.allCities.filter(item => item.value.indexOf(query) > -1);
        }else{
          this.citiesInSearch = [];
        }
      }
    }, 200),
    handleSelect: function(value){
      const {value: city, province} = this.allCities.filter(item => item.id === value)[0];
      this.$store.commit('city/setPosition',{
        city,
        province
      });
      this.$router.push({path:'/'})
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/iselect.scss";
</style>
