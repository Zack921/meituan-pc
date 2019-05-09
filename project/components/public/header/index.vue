<template>
  <div class="m-header">
    <el-row>
      <el-col>
        <top-bar />
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <search-bar />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TopBar from './topBar.vue'
import SearchBar from './searchBar.vue'
export default {
  components: {
    TopBar,
    SearchBar
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style lang="scss">
  @import '@/assets/css/public/header/index.scss';
</style>
