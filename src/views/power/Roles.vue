<template>
  <div class="roles">
        <!-- 面包屑导航区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
     </el-breadcrumb>

     <!-- 卡片视图区域   -->
     <el-card>
         <!-- 添加角色按钮区域 -->
         <el-row>
             <el-col>
                 <el-button type="primary" @click="addDialogVisible=true">添加角色</el-button>
                 <!-- <el-button type="primary">添加角色</el-button> -->
             </el-col>
         </el-row>


        <!-- 角色列表区域 -->
        <el-table :data="rolelist" border stripe>
            <!-- 展开列 -->
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-row :class="['bdbottom',i1===0 ? 'bdtop':'','vcenter']" v-for="(item1,i1) in scope.row.children" :key="i1">
                        <!-- 渲染一级权限 -->
                        <el-col :span="5">
                           <el-tag> {{item1.authName}}</el-tag>
                           <i class="el-icon-caret-right"></i>
                        </el-col>
                        <!-- 渲染二级和三级权限 -->
                        <el-col :span="19">
                            <!-- 通过for循环渲染二级权限 -->
                            <el-row :class="[i2===0 ? '':'bdtop','vcenter']" v-for="(item2,i2) in item1.children" :key="i2">
                                <!-- 渲染二级权限 -->
                                <el-col :span="6">
                                    <el-tag type="success">{{item2.authName}}</el-tag>
                                    <i class="el-icon-caret-right"></i>
                                </el-col>
                                <!-- 渲染三级权限 -->
                                <el-col :span="18">
                                    <el-tag type="warning" v-for="(item3,i3) in item2.children" :key="i3" closable @close="removeRightById(scope.row,item3.id)">
                                        {{item3.authName}}
                                    </el-tag>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <pre>
                        <!-- {{scope.row}} -->
                    </pre>
                    
                </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="角色名称" prop="roleName"></el-table-column>
            <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
            <el-table-column label="操作" width="400">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeUserById(scope.row.id)">删除</el-button>
                    <el-button type="warning" size="mini" icon="el-icon-setting" @click="showSetRightDialog(scope.row)">分配权限</el-button>
                </template>
            </el-table-column>

        </el-table>

     </el-card>

        <!-- 分配权限的对话框 -->
        <el-dialog
            title="分配权限"
            :visible.sync="setRightDialogVisible"
            width="50%"
            @close="setRightDialogClosed">
            <!-- 树形控件 -->
            <el-tree :data="rightslist" :props="treeProps" show-checkbox node-key="id" default-expand-all :default-checked-keys="defKeys" ref="treeRef"></el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setRightDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="allotRights">确 定</el-button>
            </span>
        </el-dialog>



            <!-- 添加用户的弹框 -->
    <el-dialog
        title="添加用户"
        :visible.sync="addDialogVisible"
        width="50%" @close="addDialogClosed">
        <!-- 内容主体区域 -->
        <el-form :model="addForm" :rules="addFormRules" ref="p  " label-width="70px" class="demo-ruleForm">
            <el-form-item label="角色名称 " prop="roleName">
                <el-input v-model="addForm.roleName"></el-input>
            </el-form-item>
             <el-form-item label="角色描述 " prop="roleDesc">
                <el-input v-model="addForm.roleDesc"></el-input>
            </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
    </el-dialog>


  </div>
</template>

<script>
export default {
name:"Roles",
  components: {},
  props: {},
  data() {
    return {
        //所有角色列表数据
        rolelist:[],
        //控制分配权限对话框的显示和隐藏
        setRightDialogVisible:false,
        //所有权限的数据
        rightslist:[],
        //树形控件的属性绑定对象
        treeProps:{
            label:'authName',
            children:'children'
        },
        //默认选中的节点id值数组
        defKeys:[],
        //当前即将分配权限的角色id
        roleId:'',
         //控制添加用户弹框的显示与隐藏 
        addDialogVisible:false,
         // 添加用户的表单数据
        addForm:{
            roleName:'',
            roleDesc:'',
        },
          //添加用户表单的验证规则对象
                  addFormRules:{
            roleName:[
                {required:true,message:'请输入角色名称',trigger:'blur'},
              
            ],
            roleDesc:[
                {required:true,message:'请输入角色描述',trigger:'blur'},
        
            ] 
        },
    };
  },
  watch: {},
  computed: {},
  methods: {
      //获取列表数据
      async getRolesList(){
         let {data:res}=await this.$http.get('roles')
         if(res.meta.status!==200){
             return this.$message.error('获取角色列表数据失败')
         }else{
             this.rolelist=res.data
         }
      },
      //根据id删除对应的权限
      async removeRightById(role,rightId){
          //弹框提示用户是否要删除
          let confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err=>err)

            if(confirmResult !== 'confirm'){
                return this.$message.info('取消了删除')
            }else{
               let {data:res}=await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
                // console.log("确认了删除")
                if(res.meta.status!==200){
                    return this.$message.error('删除权限失败')
                }else{
                    // this.getRolesList();
                    role.children=res.data
                }
            }

      },
    //   展示分配权限的对话框
     async showSetRightDialog(role){
         this.roleId = role.id
          //获取所有权限的数据
         let {data:res} = await this.$http.get('rights/tree')
         if(res.meta.status!==200){
             return this.$message.error('获取权限失败')
         }else{
             //把获取到的权限数据保存到rightslist这个空数组里
             this.rightslist = res.data

            //递归获取三级节点的id
            this.getLeafKeys(role,this.defKeys);

         }
         //对话框的显示与隐藏
          this.setRightDialogVisible=true
      },
      //通过递归的方式，获取角色下所有三级权限的id，并保存到defKeys这个数组中
      getLeafKeys(node,arr){
          //如果当前node节点不包含children属性，则就是三级节点
          if(!node.children){
              return arr.push(node.id)
          }else{
              node.children.forEach(item => {
                this.getLeafKeys(item,arr)
              });
          }
      },
      //监听分配权限的对话框关闭事件
      setRightDialogClosed(){
          this.defKeys = []
      },
      //点击为角色分配权限
     async allotRights(){
          const keys=[
              ...this.$refs.treeRef.getCheckedKeys(),
              ...this.$refs.treeRef.getHalfCheckedKeys()
          ]

         const idStr = keys.join(',')

         let {data:res}=await this.$http.post(`roles/${this.roleId}/rights`,{
             rids:idStr
         })

         if(res.meta.status !== 200){
             return this.$message.error('更新权限失败')
         }else{
             this.$message.success('分配权限成功')
             this.getRolesList()
             this.setRightDialogVisible = false
         }

      },
          //根据id删除对应的用户信息
     async removeUserById(id){
        //  console.log(id)
         //弹框询问用户是否删除数据
           let confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).catch(err=>{
            return err
        })
        //如果用户确认删除，则返回值为字符串 confirm
        //如果用户取消删除，则返回值为字符串 cancel
        // console.log(confirmResult)
        if(confirmResult !=='confirm'){
            return this.$message.info('已取消删除')
        }else{
            let {data:res}=await this.$http.delete('roles/'+id)
            // console.log(res)
            if(res.meta.status !== 200){
                return this.$message.error('删除用户失败')
            }else{
                this.$message.success('删除用户成功')
                this.getRolesList()
            }
        }
      },
       //点击确定按钮，添加新用户
      addUser(){
           this.$refs.addFormRef.validate(async(valid)=>{
               if(!valid){
                   return
               }else{
                   //可以发起添加用户的网络请求
                   let {data:res}=await this.$http.post('roles',this.addForm)
                   if(res.meta.status!==201){
                       this.$message.error("添加用户失败!")
                   }else{
                       this.$message.success("添加用户成功")
                       //隐藏添加用户弹框
                       this.addDialogVisible = false
                    //    重新获取用户列表数据
                       this.getRolesList()
                   }
               }
           })
      },
  },
  created() {
       //获取列表数据
      this.getRolesList()
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.el-tag{
    margin: 7px;
}
.bdtop{
    border-top: 1px solid #eee;
}
.bdbottom{
    border-bottom: 1px solid #eee;
}
.vcenter{
    display: flex;
    align-items: center;
}
</style>