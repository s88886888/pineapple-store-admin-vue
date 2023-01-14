<template>
  <el-card class="box-card-main">

    <template #header>
      <div class="card-header-top">
        <div>
          <p style="font-size: 15px">
            <el-icon><Search /></el-icon>搜索筛选
          </p>
        </div>
        <div>
          <el-button round>重置数据</el-button>
          <!-- <el-button :icon="Search" round @click="indexSearch">搜索</el-button> -->
        </div>
      </div>

      <div class="card-header-box">
        <el-input
          class="searchInput"
          v-model="searchInputId"
          wi
          placeholder="请输入订单编号"
          style="width: 200px"
        />

        <el-input
          class="searchInput"
          v-model="searchInputUseName"
          wi
          placeholder="请输入用户账号"
          style="width: 200px"
        />

        <!-- <el-select
          v-model="searchInputOrderStatus"
          filterable
          placeholder="Select"
        >
          <el-option
            v-for="item in OrderStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select> -->

        <div class="Status" style="margin-left: 20px">
          <el-select v-model="searchInputStatus" placeholder="状态">
            <el-option
              v-for="item in StatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>

      <div class="block">
        <el-date-picker
          v-model="DataTime"
          type="datetime"
          placeholder="请选择订单开始时间"
          format="YYYY/MM/DD HH:mm:ss"
        />

        <el-date-picker
          style="margin-left: 20px"
          v-model="DataTime"
          type="datetime"
          placeholder="请选择订单结束时间"
          format="YYYY/MM/DD HH:mm:ss"
        />
      </div>
      
    </template>

    <el-table
      v-loading="loading"
      :data="tableData"
      :border="true"
      style="width: 100%"
    >
      <el-table-column fixed type="index" :index="indexMethod" />

      <el-table-column prop="orderId" label="订单编号1" width="300" />

      <!-- <el-table-column
        prop="createTime"
        :formatter="createTimeFilter"
        label="订单提交日期"
        width="180"
      /> -->

      <el-table-column prop="username" label="用户账号" width="120" />

      <el-table-column prop="totalAmount" label="订单金额" width="100" />

      <el-table-column prop="payType" label="支付方式" width="100">
        <template #default="scope">
          <div>
            <p v-if="scope.row.payType == 1">>微信</p>
            <p v-else-if="scope.row.payType == 2">支付宝</p>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="订单状态" width="100">
        <template #default="scope">
          <div>
            <p v-if="scope.row.status == 1">待付款</p>
            <p v-else-if="scope.row.status == 2">待发货</p>
            <p v-else-if="scope.row.status == 3">待收货</p>
            <p v-else-if="scope.row.status == 4">待评价</p>
            <p v-else-if="scope.row.status == 5">已完成</p>
            <p v-else-if="scope.row.status == 6">已关闭</p>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="orderRemark" label="订单备注" width="180" />

      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-popconfirm
            title="你确定删除吗？"
            confirm-button-text="是"
            cancel-button-text="否"
            @confirm="deleteClick(scope.row.imgId)"
            :icon="Delete"
            icon-color="red"
          >
            <template #reference>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>

          <el-button type="primary" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-card class="box-card-footer">
      <div class="box-footer">
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
import { ElMessage } from "element-plus";
import { Delete, Search } from "@element-plus/icons-vue";
import { ref, onMounted, reactive } from "vue";
// import createTimeFilter from "../utils/dateFormat";
import orderList from "../api/orderList";



//#region  表单初始化
//表单加载动画
const loading = ref<boolean>(true);

//表单数据
let tableData = ref([]);

//每次查询多少条
const size = ref<number>(5);
//总共有多少页
const current = ref<number>(1);
//总共有多少条
let total = ref<number>(0);

//查询所有数据
function getData() {
  loading.value = true;
  orderList
    .getorderListPage({ current: current.value, size: size.value })
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
onMounted(() => {
  getData();
});


//分页器一旦发生改变
const currentChange = (val: number) => {
  current.value = val;
  getData();
};

//#endregion

//#region  公共事件
const indexMethod = (index: number) => {
  return index * 1;
};

//搜索框值
const searchInputUseName = ref<string>("");
const searchInputId = ref<string>("");
const searchInputOrderStatus = ref<number>(0);

const searchInputStatus = ref<number>(1);
//上下架选择框
const StatusOptions = [
  {
    value: 1,
    label: "已支付",
  },
  {
    value: 0,
    label: "未支付",
  },
];
//商品分类
const OrderStatusOptions = reactive([
  {
    value: 0,
    label: "请选择订单状态",
  },
  {
    value: 1,
    label: "待付款",
  },
  {
    value: 2,
    label: "待发货",
  },
  {
    value: 3,
    label: "待收货",
  },
  {
    value: 4,
    label: "待评价",
  },
  {
    value: 5,
    label: "已完成",
  },
  {
    value: 6,
    label: "已关闭",
  },
]);


const DataTime = ref("");

//痛苦面具搜索事件
/* function indexSearch() {
  loading.value = true;
  orderList
    .getorderListPage({
      Id: searchInputId.value,
      name: searchInputName.value,
      content: searchInputContent.value,
      status: searchInputStatus.value,
      categoryId: searchInputOrderStatus.value,
      current: current.value,
      size: size.value,
    })
    .then((res) => {
      if (res.code == 200) {
        tableData.value = res.data.records;
        current.value = res.data.current;
        total.value = res.data.total;
        size.value = res.data.size;
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
 */
//#endregion

//#region 删除事件
//删除根据一条ID进行删除
const deleteClick = (id: string) => {
  orderList.delorderList(id).then((res) => {
    if (res.code == 200) {
      loading.value = true;
      getData();
      ElMessage({
        showClose: true,
        message: res.msg,
        type: "success",
      });
    } else {
      ElMessage({
        showClose: true,
        message: res.msg,
        type: "error",
      });
    }
  });
};
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
  justify-content: center;
}
.box-card-main {
  padding-bottom: 50px;
}
.card-header-box {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.block {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
