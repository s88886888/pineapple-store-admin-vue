<template>
  <el-card class="box-card-main">
    <template #header>
      <div class="card-header-top">
        <div>
          <el-input
            class="searchInput"
            v-model="userName"
            wi
            placeholder="请输入用户名称"
            clearable
            style="width: 200px"
          />

          <el-input
            class="searchInput"
            v-model="userPhone"
            wi
            placeholder="请输入用户手机"
            clearable
            style="width: 200px"
          />
        </div>
        <div>
          <el-button round @click="reData">重置数据</el-button>
          <el-button :icon="Search" round @click="getData">搜索</el-button>
        </div>
      </div>
    </template>

    <el-table
      v-loading="loading"
      :data="tableData"
      :border="true"
      :table-layout="'auto'"
      style="width: 100%"
    >
      <el-table-column fixed type="index" :index="indexMethod" />
      <el-table-column prop="userId" label="用户编号" width="100" />
      <el-table-column prop="username" label="用户名称" width="160" />

      <el-table-column prop="userMobile" label="手机号码" width="150" />

      <el-table-column prop="userRegtime" label="注册时间" width="300" />
      <el-table-column prop="userIp" label="最后一次登录IP" width="200" />



      <el-table-column prop="token" label="token" width="400" />

        <el-table-column fixed="right" label="账号有效" width="120">
        <template #default="scope">
          <div>
            <el-tooltip :content="'点击按钮控制开关'" placement="top">
              <el-switch
                v-model="scope.row.isValid"
                @click="editStatus(scope.row.userId)"
                style="
                  --el-switch-on-color: #13ce66;
                  --el-switch-off-color: #ff4949;
                "
                :active-value="1"
                :inactive-value="0"
              />
            </el-tooltip>
          </div>
        </template>
      </el-table-column>

      <!-- <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-popconfirm
            title="你确定删除吗？"
            confirm-button-text="是"
            cancel-button-text="否"
            @confirm="deleteClick(scope.row.productId)"
            :icon="Delete"
            icon-color="red"
          >
            <template #reference>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>-->
    </el-table> 

    <el-card class="box-card-footer">
      <div class="box-footer">
        <div>
          <!-- <el-input placeholder="Please input" /> -->
        </div>

        <div>
          <el-pagination
            :page-size="size"
            :total="total"
            background
            layout="prev, pager, next"
            @current-change="currentChange"
          />
        </div>
      </div>
    </el-card>
  </el-card>
</template>

<script setup lang="ts">
import {
  ElMessage,
  UploadFile,
  FormInstance,
  FormRules,
  UploadUserFile,
} from "element-plus";
import { Delete, Search, Plus, Edit } from "@element-plus/icons-vue";
import { ref, onMounted, reactive } from "vue";
import createTimeFilter from "../utils/dateFormat";
import indexImg from "../api/indexImg";
import user from "../api/user";
import upload from "../api/upload";
import { useRouter } from "vue-router";

//查询所有数据
function getData() {
  loading.value = true;
  user
    .getUserList({
      name: userName.value,
      phone: userPhone.value,
      current: current.value,
      size: size.value,
    })
    .then((res) => {
      if (res.code == 200) {
        tableData.value = res.data.records;
        current.value = res.data.current;
        total.value = res.data.total;
        //加钱优化
        setTimeout(() => {
          loading.value = false;
        }, 500);
      } else {
        ElMessage({
          showClose: true,
          message: res.msg,
          type: "error",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

//生命周期事件，当挂载完毕
onMounted(async () => {
  getData();
});

//#region  表单初始化
//表单加载动画
const loading = ref<boolean>(true);
//表单数据
let tableData = ref([]);

//每次查询多少条
const size = ref<number>(10);
//当前页数
const current = ref<number>(1);
//总共有多少条
let total = ref<number>(0);

//分页器一旦发生改变
const currentChange = (val: number) => {
  current.value = val;
  getData();
};

/* 用于控制该表单域下组件的默认尺寸	'large' | 'default' | 'small'	'default' */
const formSize = ref("default");

//#endregion

//#region  公共事件
const indexMethod = (index: number) => {
  return index * 1;
};

//搜索框值
const userPhone = ref<string>("");
const userName = ref<string>("");
const reData = () => {
  userPhone.value = "";
  userName.value = "";
};




const editStatus =(userId:number)=>{

user.updateUserStatus(userId).then(res=>{

if(res.code==200)
{
  return  ElMessage({
          showClose: true,
          message: res.msg,
          type: "success",
        });
}

})


}


//#endregion

//#region 删除事件
//删除根据一条ID进行删除

//#endregion

//#endregion

//#region 新增数据

const router = useRouter();
//新增数据事件

//#endregion
</script>

<style scoped>
.card-header-top {
  display: flex;
  justify-content: space-between;
}
.searchInput {
  margin-right: 15px;
}
button.el-dialog__headerbtn {
  display: none;
}

.box-footer {
  display: flex;
  justify-content: space-between;
}
.box-card-main {
  padding-bottom: 50px;
}
.card-header-box {
  /* margin-top: 20px; */
  /* display: flex; */
  /* justify-content: center; */
}
</style>
