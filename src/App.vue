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



  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

</style>
