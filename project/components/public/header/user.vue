<template>
  <div class="m-user">
    <template v-if="user">
      欢迎您，<span class="username">{{ user }}</span>
      [<nuxt-link to="/exit">退出</nuxt-link>]
    </template>
    <template v-else>
      <nuxt-link
        to="/login"
        class="login">登录</nuxt-link>
      <nuxt-link
        to="/register"
        class="register">注册</nuxt-link>
    </template>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      user: ''
    }
  },
  async mounted(){
    const {status, data} = await this.$axios.get('/user/getUser');
    if (status === 200) {
      if(data && data.code === 0){
        this.user = data.username;
      }
    }
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style></style>
