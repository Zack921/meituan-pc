<template>
  <div>
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd v-for="item in list" :key="item">
        <a :href="'#city-'+item">{{ item }}</a>
      </dd>
    </dl>
    <dl 
      v-for="item in block" 
      :key="item.title" 
      class="m-categroy-section">
      <dt :id="'city-'+item.title">{{ item.title }}</dt>
      <dd>
        <span
          style="cursor:pointer"
          v-for="(city, index) in item.cities"
          :key="index"
          @click="handleSelect(city.province, city.name)">
          {{ city.name === '市辖区' ? city.province : city.name}}
        </span>
      </dd>
    </dl>
  </div>
</template>

<script>
import pyjs from 'js-pinyin';
export default {
  components: {},
  data() {
    return {
      list: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      block: []
    }
  },
  async mounted(){
    const {status, data:{cities}} = await this.$axios.get('city/getAllCities');
    const temp = {};
    for(const obj of cities){
      for(const city of obj.value){
        const p_city = pyjs
          .getFullChars(city.name === '市辖区' ? city.province : city.name)
          .toLocaleLowerCase()
          .slice(0,1);
        const c_city = p_city.charCodeAt(0);
        if(c_city > 96 && c_city < 123){
          if(temp[p_city]){
            temp[p_city].push(city);
          }else{
            temp[p_city] = [city];
          }
        }
      }
    }
    for(const [k, v] of Object.entries(temp)){
      this.block.push({
        title: k.toUpperCase(),
        cities: v
      });
    }
    this.block.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
  },
  computed: {},
  watch: {},
  methods: {
    handleSelect: function(province, city){
      this.$store.commit('city/setPosition',{
        city: city === "市辖区" ? province : city,
        province
      });
      this.$router.push({path:'/'})
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/categroy.scss";
</style>
