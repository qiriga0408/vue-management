<template>
  <!-- <div class="home"> -->
      <el-container class="home_container">
        <!-- 头部区域 -->
          <el-header>
              <div>
                <img src="../assets/heima.png" alt="">
                <span>电商后台管理系统</span>
              </div>
              <el-button type="info" @click="logout">退出</el-button>
          </el-header>
          <!-- 内容部分 -->
          <el-container>
            <!-- 左侧栏 -->
            <el-aside :width="iscCollapse?'64px':'200px'">
              <div class="toggole-buton" @click="toggleCollapse">|||</div>
              <!-- 侧边栏菜单区域 -->
                 <el-menu
                  background-color="#333744"
                  text-color="#fff"
                  active-text-color="#ffd04b"
                  unique-opened
                  :collapse="iscCollapse"
                  :collapse-transition="false"
                  :router="true"
                  :default-active="activePath"
                  >

                  <!-- 一级菜单 -->
                  <el-submenu  v-for="(item,key) in manulist" :key="key" :index="item.id + ''">
                    <!-- 一级菜单模板区域 -->
                    <template slot="title">
                      <i :class="inconsObj[item.id]"></i>
                      <span>{{item.authName}}</span>
                    </template>

                    <!-- 二级菜单 -->
                   <el-menu-item   :index="'/'+ subItem.path " v-for="(subItem,subKey) in item.children" :key="subKey"
                   @click="saveNavState('/'+ subItem.path)">
                     <template slot="title">
                      <i class="el-icon-menu"></i>
                      <span>{{subItem.authName}}</span>
                    </template></el-menu-item> 
                  </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 右侧栏 -->
            <el-main>
              <!-- 路由占位符 -->
              <router-view></router-view>
            </el-main>
          </el-container>
     </el-container>
     
      
  <!-- </div> -->
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    
  },
  data(){
    return{
      //左侧菜单的获取
      manulist:[],
      inconsObj:{
        '125':'iconfont icon-user',
        '103':'iconfont icon-tijikongjian',
        '101':'iconfont icon-shangpin',
        '102':'iconfont icon-danju',
        '145':'iconfont icon-baobiao',

      },
      iscCollapse:false,
      //被激活的链接地址
      activePath:''
    }
  },
  methods:{
    //保存链接的激活状态
    saveNavState(activePath){
        window.sessionStorage.setItem('activePath',activePath)
        this.activePath=activePath
    },
    //退出登录
    logout(){
      window.sessionStorage.clear()
      this.$router.push({path:'/Login'})
    },
    //获取所有的菜单
    async getManuList(){
        let {data:res}=await this.$http.get('menus')
        if(res.meta.status!==200){
            return this.$message.error(res.meta.msg)
        }
        this.manulist=res.data
        // console.log(res)
        
    },
    //点击按钮，切换菜单的折叠与展开
    toggleCollapse(){
        this.iscCollapse=!this.iscCollapse
    }
  },
  created(){
    this.getManuList();
    this.activePath=window.sessionStorage.getItem('activePath')
  }
}
</script>
<style lang="scss" scoped>
.home_container{
  width: 100%;
  height: 100%;
  .el-header{
    background: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0;
    color: white;
    font-size: 20px;
    div{
      display: flex;
      align-items: center;
      span{
        margin-left: 20px;
      }
    }
  }
  .el-aside{
    background: #333744;
    .toggole-buton{
      font-size: 10px;
      background: #4A5064;
      line-height: 24px;
      color: #fff;
      text-align: center;
      letter-spacing: 0.3em;
      cursor: pointer;
    }
    .el-menu{
      border-right:none;
    }
  }
  .el-main{
    background-color: #EAEDF1;
  }
  .iconfont{
    margin-right: 15px;
  }
}
  
</style>
