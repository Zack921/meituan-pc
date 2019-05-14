<template>
  <div class="m-geo">
    <i class="el-icon-location" />{{$store.state.city.position.city}}
    <nuxt-link class="changeCity" to="/changeCity">切换城市</nuxt-link>
    <span v-if="hotCities.length">[{{hotCities.join(',')}}]</span>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      hotCities: []
    }
  },
  async mounted(){
    const {data:{cities}} = await this.$axios.get('/city/getHotCities');
    this.hotCities = cities.map(item => item.name.replace('市', ''));
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style></style>
