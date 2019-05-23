<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <Iselect />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <Hot />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <Category />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Iselect from '@/components/changeCity/iselect.vue';
import Hot from '@/components/changeCity/hot.vue';
import Category from '@/components/changeCity/category.vue';
export default {
  components: {
    Iselect,
    Hot,
    Category
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style></style>
