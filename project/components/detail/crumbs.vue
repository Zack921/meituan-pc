<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">{{`${city}美团`}}</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: `/products?keyword=${type}` }">
      {{`${city}${type}`}}
    </el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: `/detail?keyword=${keyword}&type=${type}` }">
      {{`${city}${keyword}`}}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      city: this.$store.state.city.position.city.replace('市','')
    }
  },
  props: {
    type: {
      type: String,
      default: ''
    },
    keyword: {
      type: String,
      default: ''
    }
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style></style>
