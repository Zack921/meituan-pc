<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <emenu/>
      </el-col>
      <el-col :span="19">
        2
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import emenu from '@/components/index/menu.vue'
  export default {
    components: {
      emenu
    }
  }
</script>

<style lang="scss">
  @import "@/assets/css/index/index.scss";
</style>
