<template>
  <div class="rights">
         <!-- 面包屑导航区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
     </el-breadcrumb>

     <!-- 卡片视图区域 -->
     <el-card>
         <el-table :data="rightsList" border stripe>
             <el-table-column type="index" label="#"></el-table-column>
             <el-table-column label="权限名称" prop="authName"></el-table-column>
             <el-table-column label="路径" prop="path"></el-table-column>
            <el-table-column label="权限等级" prop="level">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.level=='0'">一级</el-tag>
                    <el-tag type="success" v-else-if="scope.row.level=='1'">二级</el-tag>
                    <el-tag type="warning" v-else>三级</el-tag>
                </template>
            </el-table-column>
         </el-table>
     </el-card>
  </div>
</template>

<script>
export default {
name:"Rights",
  components: {},
  props: {},
  data() {
    return {
        // 权限列表数据
        rightsList:[]
    };
  },
  watch: {},
  computed: {},
  methods: {
     async getRightsList(){
          let {data:res}=await this.$http.get('rights/list')
          if(res.meta.status!==200){
              return this.$message.error('获取权限列表数据失败!')
          }else{
              this.rightsList= res.data
            //   console.log(this.rightsList)
          }
      }
        },
  created() {
       // 获取权限列表数据
      this.getRightsList()
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
</style>