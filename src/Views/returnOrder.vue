<template>
  <el-card class="box-card-main">
    <template #header>
      <div class="card-header-top">
        <div>
          <p style="font-size: 15px">
            <el-icon> <Search /> </el-icon>搜索筛选
          </p>
        </div>
        <div>
          <el-button round @click="reData">重置数据</el-button>
          <el-button :icon="Search" round @click="indexSearch">搜索</el-button>
          <el-button :icon="Promotion" type="primary" round @click="returnOrder"
            >审核退货</el-button
          >
          <el-button
            :icon="Promotion"
            type="primary"
            round
            @click="noReturnOrder"
            >驳回申请</el-button
          >
        </div>
      </div>

      <div class="card-header-box">
        <div>
          <el-input
            class="searchInput"
            v-model="searchInputId"
            wi
            placeholder="订单编号"
            style="width: 250px"
          />

          <el-input
            class="searchInput"
            v-model="searchInputName"
            wi
            placeholder="用户名称"
            style="width: 200px"
          />

          <el-date-picker
            style="margin-left: 20px"
            v-model="dataTimeOne"
            type="date"
            placeholder="购买时间"
            @change="dataTimeOneChange"
          />
        </div>
      </div>

      <div class="card-header-box-datatime">
        <!-- <el-date-picker
          style="margin-left: 20px"
          v-model="dataTimeTwo"
          type="date"
          placeholder="结束时间"
          @change="dataTimeTwoChange"
        /> -->
      </div>
    </template>

    <el-table
      v-loading="loading"
      :data="tableData"
      :border="true"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column fixed type="index" :index="indexMethod" />

      <el-table-column prop="orderId" label="订单编号" width="300" />

      <el-table-column
        prop="createTime"
        :formatter="createTimeFilter"
        label="购买时间"
        width="180"
      />

      <el-table-column prop="status" label="订单状态" width="100">
        <template #default="scope">
          <div>
            <p v-if="scope.row.status == 1">待付款</p>
            <p v-else-if="scope.row.status == 2">待发货</p>
            <p v-else-if="scope.row.status == 3">待收货</p>
            <p v-else-if="scope.row.status == 4">待评价</p>
            <p v-else-if="scope.row.status == 5">已完成</p>
            <p v-else-if="scope.row.status == 6">已关闭</p>
            <p v-else-if="scope.row.status == 7">申请退货</p>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="username" label="用户账号" width="120" />

      <el-table-column prop="untitled" label="产品名称" width="200" />

      <el-table-column prop="totalAmount" label="订单金额" width="150" />

      <el-table-column prop="payType" label="支付工具" width="100">
        <template #default="scope">
          <div>
            <p v-if="scope.row.payType == 1">>微信</p>
            <p v-else-if="scope.row.payType == 2">支付宝</p>
            <p v-else>未支付</p>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="orderRemark" label="订单备注" width="180" />

      <el-table-column fixed="right" label="操作" width="300">
        <template #default="scope">
          <el-popconfirm
            title="确定删除"
            confirm-button-text="是"
            cancel-button-text="否"
            @confirm="deleteClick(scope.row.orderId)"
            icon-color="red"
          >
            <template #reference>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>

          <el-button
            type="primary"
            size="small"
            @click="goOrderItem(scope.row.orderId)"
            >查看</el-button
          >
          <el-button
            type="primary"
            size="small"
            @click="getReturnDescUI(scope.row.orderId)"
            >退单理由</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog width="500" v-model="returnDescShow" title="退货理由">
      <el-input
        type="text"
        v-model="returnDescData"
        :disabled="true"
      ></el-input>

      <!-- {{ returnDescTime.value }} -->
    </el-dialog>

    <el-card class="box-card-footer">
      <div class="box-footer">
        <div></div>

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
import { Delete, Search, Plus, Edit, Promotion } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { ref, onMounted, reactive } from "vue";
import createTimeFilter from "../utils/dateFormat";
import orderList from "../api/orderList";
import { useRouter } from "vue-router";

//生命周期事件，当挂载完毕
onMounted(() => {
  getData();
});

//#region  表单初始化
//表单加载动画
const loading = ref<boolean>(true);

//表单数据
let tableData = ref([]);

//每次查询多少条
const size = ref<number>(7);
//总共有多少页
const current = ref<number>(1);
//总共有多少条
let total = ref<number>(0);

//查询所有数据
function getData() {
  loading.value = true;
  orderList
    .getorderListPage({ current: current.value, size: size.value, status: "7" })
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

//分页器一旦发生改变
const currentChange = (val: number) => {
  current.value = val;

  if (
    searchInputName.value != "" ||
    searchInputId.value != "" ||
    searchInputOrderStatus.value != "" ||
    searchInputStatus.value != 0 ||
    dataTimeOne.value != "" ||
    dataTimeTwo.value != ""
  ) {
    return indexSearch();
  }

  getData();
};

//#endregion

//#region  公共事件
const indexMethod = (index: number) => {
  return index * 1;
};

//搜索框值
const searchInputName = ref<string>("");
const searchInputId = ref<String>("");
const searchInputOrderStatus = ref<string>("2");
const searchInputStatus = ref<number>(0);

const dataTimeOne = ref<string>("");
const dataTimeTwo = ref<string>("");

const dataTimeOneChange = (val: string) => {
  dataTimeOne.value = val;
};
const dataTimeTwoChange = (val: string) => {
  dataTimeTwo.value = val;
};

//痛苦面具搜索事件
function indexSearch() {
  loading.value = true;
  orderList
    .getorderListPage({
      id: searchInputId.value,
      name: searchInputName.value,
      status: "7",
      dataTimeOne: dataTimeOne.value,
      dataTimeTwo: dataTimeTwo.value,
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
const reData = () => {
  searchInputName.value = "";
  searchInputId.value = "";
  searchInputOrderStatus.value = "";
  searchInputStatus.value = 0;
  dataTimeOne.value = "";
  dataTimeTwo.value = "";
};

const searchInputOrderStatusChange = (val: number) => {
  searchInputStatus.value = val;
};
const router = useRouter();
const goOrderItem = (val: string) => {
  router.push({ name: "orderItem", query: { orderId: val } }); //传递参数
};

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

const multipleSelection = ref([]);

//实在是偷懒 不想写类型 QAQ ---->any
const handleSelectionChange = (val: any) => {
  multipleSelection.value = val;
  console.log(multipleSelection.value);
};

const returnOrder = () => {
  if (multipleSelection.value.length == 0) {
    return ElMessage({
      showClose: true,
      message: "请先选择订单",
      type: "error",
    });
  } else {
    multipleSelection.value.forEach((item: any) => {
      if (item.status != "7") {
        return ElMessage({
          showClose: true,
          message: "数据异常订单编号：" + item.orderId + "不是申请退货",
          type: "error",
        });
      }
    });

    loading.value = false;
    orderList.returnOrder(multipleSelection.value).then((res) => {
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
  }
};

const noReturnOrder = (orderId: string) => {
  if (multipleSelection.value.length == 0) {
    return ElMessage({
      showClose: true,
      message: "请先选择订单",
      type: "error",
    });
  } else {
    multipleSelection.value.forEach((item: any) => {
      if (item.status != "7") {
        return ElMessage({
          showClose: true,
          message: "数据异常订单编号：" + item.orderId + "不是申请退货",
          type: "error",
        });
      }
    });
    orderList.noReturnOrder(multipleSelection.value).then((res) => {
      if (res.code == 200) {
        loading.value = true;
        getData();
        return ElMessage({
          showClose: true,
          message: res.msg,
          type: "success",
        });
      } else {
        return ElMessage({
          showClose: true,
          message: res.msg,
          type: "error",
        });
      }
    });
  }
};

let returnDescShow = ref(false);
const returnDescData = ref(null);
const returnDescTime = ref(null);

const getReturnDescUI = (id: string) => {
  returnDescShow.value = true;
  orderList.getReturnDesc(id).then((res) => {
    returnDescData.value = res.data.orderReturn;
    returnDescTime.value = res.data.createTime;
  });
};
</script>

<style scoped>
.card-header-top {
  display: flex;
  justify-content: space-between;
}

.searchInput {
  margin-right: 15px;
}

.box-footer {
  display: flex;
  justify-content: space-between;
}

.box-card-main {
  padding-bottom: 50px;
}

.card-header-box {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.box-footer {
  display: flex;
  justify-content: center;
}

.card-header-box-datatime {
  display: flex;
  margin-top: 20px;
  justify-content: center;
}
</style>
