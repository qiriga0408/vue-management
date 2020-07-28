<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>
<script>
export default {
name:"App",
  components: {},
  props: {},
  data() {
    return {
      
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style lang="scss">
#app{
  width: 100%;
  height: 100%;
  // background: firebrick;
  .home{
    width: 100%;
    height: 100%;
  }
  .login{
    width: 100%;
    height: 100%;
    background: #2b4b6b;
  }
}


  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

</style>
