<template>
  <div class="m-crumbs">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">{{ `${$store.state.city.position.city.replace('市','')}美团` }}</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a :href="`/products?keyword=${keyword}`" style="cursor:pointer">
          {{$store.state.city.position.city.replace('市','')}}{{ decodeURIComponent(keyword) }}
        </a>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  props: {
    keyword: {
      type: String,
      default() {
        return '';
      }
    }
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style></style>
