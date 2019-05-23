<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市：</dt>
      <dd
        style="cursor:pointer"
        v-for="item in list"
        :key="item.id"
        @click="handleSelect(item.province, item.name)">
        {{ item.name === "市辖区" ? item.province : item.name }}
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      list: []
    }
  },
  async mounted(){
    const { status, data: { city }} = await this.$axios.get('/city/hotCity')
    if (status === 200) {
      let wantArray;
      for (const value of city) {
        wantArray = [...value.value];
        for (const value of wantArray) {
          if (value.hot === true) {
            this.list.push(value)
          }
        }
      }
    }
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
  @import "@/assets/css/changeCity/hot.scss";
</style>
