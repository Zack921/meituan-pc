<template>
  <div class="m-product-select">
    <dl class="tab">
      <dt>{{ name }}<i class="el-icon-arrow-down el-icon-right"/></dt>
      <dd>
        <h3>{{ name }}</h3>
        <span v-for="item in list" :key="item">{{item}}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  props: {
    name: {
      type: String,
      default() {
        return '';
      }
    },
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style></style>
