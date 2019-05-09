<template>
  <el-row class="m-header">
    <el-col :span="5">
      <city />
    </el-col>
    <el-col :span="5">
      <user />
    </el-col>
    <el-col :span="14">
      <navbar />
    </el-col>
  </el-row>
</template>
<script>
import City from './city'
import User from './user'
import Navbar from './nav'
export default {
  components: {
    City,
    User,
    Navbar
  }
}
</script>
<style lang="scss">
@import '@/assets/css/public/header/index.scss';
</style>
