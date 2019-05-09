<template>
  <div class="m-menu">
    <dl 
      class="nav"
      @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd 
        v-for="(item, index) in navData"
        :key="index"
        @mouseenter="mouseenter">
        <i :class="item.type" />{{ item.name }}<span class="arrow"/>
      </dd>
    </dl>
    <div 
      v-if="kind"
      class="detail"
      @mouseenter="dEnter"
      @mouseleave="dLeave">
      <template v-for="(item, index) in detailContent.child">
        <h4 :key="index">{{ item.title }}</h4>
        <span v-for="item2 in item.child" :key="item2">{{ item2 }}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      kind: '',
      navData: [{
        type: 'food',
        name: '美食',
        child: [{
          title: '美食',
          child: ['代金券', '甜品']
        }]
      },{
        type: 'takeout',
        name: '外卖',
        child: [{
          title: '美团外卖',
          child: ['美团外卖']
        }]
      }]
    }
  },
  computed: {
    detailContent: function(){
      return this.navData.filter(item => item.type === this.kind)[0];
    }
  },
  watch: {},
  methods: {
    mouseenter: function(e){
      this.kind = e.target.querySelector('i').className;
    },
    mouseleave: function(){
      const _self = this;
      _self._timer = setTimeout(function(){
        _self.kind = '';
      }, 200);
    },
    dEnter: function(){
      clearTimeout(this._timer);
    },
    dLeave: function(){
      this.kind = '';
    }
  }
}
</script>
