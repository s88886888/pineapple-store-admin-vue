<!--
 *  ┌─────────────────────────────────────────────────────────────┐
 *  │┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐│
 *  ││Esc│!1 │@2 │#3 │$4 │%5 │^6 │&7 │*8 │(9 │)0 │_- │+= │|\ │`~ ││
 *  │├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴───┤│
 *  ││ Tab │ Q │ W │ E │ R │ T │ Y │ U │ I │ O │ P │{[ │}] │ BS  ││
 *  │├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤│
 *  ││ Ctrl │ A │ S │ D │ F │ G │ H │ J │ K │ L │: ;│" '│ Enter  ││
 *  │├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────┬───┤│
 *  ││ Shift  │ Z │ X │ C │ V │ B │ N │ M │< ,│> .│? /│Shift │Fn ││
 *  │└─────┬──┴┬──┴──┬┴───┴───┴───┴───┴───┴──┬┴───┴┬──┴┬─────┴───┘│
 *  │      │Fn │ Alt │         Space         │ Alt │Win│   HHKB   │
 *  │      └───┴─────┴───────────────────────┴─────┴───┘          │
 *  └─────────────────────────────────────────────────────────────┘
 * 
 * @Author: Linson 854700937@qq.com
 * @Date: 2023-01-15 21:51:26
 * @LastEditors: Linson 854700937@qq.com
 * @LastEditTime: 2023-03-05 17:40:21
 * @FilePath: \pineapple-admin-vue\src\views\orderItem.vue
 * @Description: 菠萝电商后台管理系统
 * 
 * Copyright (c) 2023 by Linson 854700937@qq.com, All Rights Reserved. 
 -->

<template>
  <el-card class="box-card-main">
    <!-- 卡片头--步骤头 -->
    <template #header>
      <div class="card-header-top">
        <el-steps :active="activeStrps" align-center finish-status="success">
          <el-step title="提交订单" :description="createTime" />
          <el-step title="支付订单" :description="payTime" />
          <el-step title="平台发货" :description="deliveryTime"/>
          <el-step title="确认收货" />
          <el-step title="完成评价" />
        </el-steps>
      </div>
    </template>
    <!-- 卡片头--步骤头End -->

    <!-- 卡片主体 -->
    <el-card shadow="always" class="box-card">
      <template #header>
        <div class="card-main-header">
          <span>当前订单状态：{{ orderStuts }}</span>
          <div>
            <el-button plain @click="centerDialogVisible = true"
              >删除订单</el-button
            >

            <el-button plain @click="editVisible = true">备注订单</el-button>
          </div>
        </div>
      </template>

      <div class="box-card-main-basedata">
        <div class="card-main">
          <div>
            <p>
              <el-icon><CollectionTag /></el-icon>基本信息
            </p>
          </div>

          <el-table :data="tableData" :border="true" style="width: 100%">
            <el-table-column
              fixed
              prop="orderId"
              label="订单编号"
              width="300"
            />
            <el-table-column prop="username" label="用户账号" width="150" />

            <el-table-column prop="payType" label="支付方式" width="150">
              <template #default="scope">
                <div>
                  <p v-if="scope.row.payType == 1">>微信</p>
                  <p v-else-if="scope.row.payType == 2">支付宝</p>
                  <p v-else>未支付</p>
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="status" label="订单类型" width="150">
              <template #default="scope">
                <div>
                  <p v-if="scope.row.status == 1">待付款</p>
                  <p v-else-if="scope.row.status == 2">待发货</p>
                  <p v-else-if="scope.row.status == 3">待收货</p>
                  <p v-else-if="scope.row.status == 4">待评价</p>
                  <p v-else-if="scope.row.status == 5">已完成</p>
                  <p v-else="scope.row.status == 6">已关闭</p>
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="orderRemark" label="订单备注" width="150">
              <template #default="scope">
                <div>
                  <p v-if="scope.row.orderRemark == null">无</p>
                  <p v-else>{{ scope.row.orderRemark }}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="deliveryType" label="配送方式" width="150">
              <template #default="scope">
                <div>
                  <p v-if="scope.row.deliveryType == null">无</p>
                  <p v-else>{{ scope.row.deliveryType }}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="deliveryFlowId" label="物流单号" width="150">
              <template #default="scope">
                <div>
                  <p v-if="scope.row.deliveryFlowId == null">无</p>
                  <p v-else>{{ scope.row.deliveryFlowId }}</p>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div class="box-card-main-basedata">
        <div class="card-main">
          <div>
            <p>
              <el-icon><CollectionTag /></el-icon>收货人信息
            </p>
          </div>

          <el-table :data="tableData" :border="true" style="width: 100%">
            <el-table-column prop="receiverName" label="姓名" width="200" />

            <el-table-column prop="receiverMobile" label="电话" width="200" />
            <el-table-column prop="orderRemark" label="备注" width="300" />
            <el-table-column prop="receiverAddress" label="地址" width="500" />

          </el-table>
        </div>
      </div>

      <div class="box-card-main-basedata">
        <div class="card-main">
          <div>
            <p>
              <el-icon><CollectionTag /></el-icon>商品信息
            </p>
          </div>

          <el-table :data="productList" :border="true" style="width: 100%">
            <el-table-column prop="productImg" label="商品图片" width="180">
              <template #default="scope">
                <div>
                  <el-image
                    :fit="'cover'"
                    style="width: 100px; height: 100px"
                    :src="scope.row.productImg"
                  />
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="productName" label="商品名称" width="200" />

            <el-table-column prop="totalAmount" label="商品价格" width="200" />
            <el-table-column prop="skuName" label="商品属性" width="220" />
            <el-table-column prop="buyCounts" label="商品数量" width="200" />
            <el-table-column prop="totalAmount" label="小计" width="200" />
          </el-table>
        </div>
      </div>

      <div class="box-card-main-money">
        <span></span>
        <div style="margin-right: 210px">
          <p style="color: coral">合计:{{ money }}</p>
        </div>
      </div>
    </el-card>
    <!-- 卡片主体 -->
  </el-card>

  <!-- 删除弹出框 -->
  <el-dialog
    v-model="centerDialogVisible"
    title="警告"
    width="30%"
    align-center
  >
    <span>删除订单，数据无法挽回</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmdelorder"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 删除弹出框End -->

  <!-- 修改备注 -->
  <el-dialog v-model="editVisible" title="修改备注" width="30%" center>
    <el-form :model="form" >
      <el-form-item label="备注">
        <el-input v-model="form.orderRemark" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editVisible = false">取消</el-button>
        <el-button type="primary" @click="putOrderItemRemark"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 修改备注End -->
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { CollectionTag } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import orderItem from "../api/orderItem";
import { useRoute, useRouter } from "vue-router";
import orderList from "../api/orderList";

import createTimeFilter from "../utils/dateFormat";

const centerDialogVisible = ref(false);

onMounted(() => {
  if (route.query.orderId) {
    orderId.value = route.query.orderId;
    getOrderitem();
  }
});

const form = reactive({
  orderRemark: "",
});

const route = useRoute();
const router = useRouter();
const money = ref<number>(0);
const createTime = ref();
const payTime = ref();
const deliveryTime = ref();
let activeStrps = ref<number>(1);
const orderId = ref();
let orderStuts = ref();

function getOrderitem() {
  orderItem.getOrderitem(orderId.value).then((res) => {
    if (res.code == 200) {
      tableData.push(res.data[0]);
      money.value = res.data[0].totalAmount;

      /*  订单状态 1:待付款 2:待发货 3:待收货 4:待评价 5:已完成 6:已关闭 */
      switch (res.data[0].status) {
        case "1":
          orderStuts.value = "待付款";
          break;
        case "2":
          orderStuts.value = "待发货";
          break;
        case "3":
          orderStuts.value = "待收货";
          break;
        case "4":
          orderStuts.value = "待评价";
          break;
        case "5":
          orderStuts.value = "已完成";
          break;
        case "6":
          orderStuts.value = "已关闭";
          break;
        default:
          orderStuts.value = "错误";
      }

      createTime.value = createTimeFilter({
        createTime: res.data[0].createTime,
      });

      if (res.data[0].payTime != null) {
        payTime.value = createTimeFilter({ createTime: res.data[0].payTime });
        activeStrps.value = 2;
      }

      if (res.data[0].deliveryTime != null) {
        deliveryTime.value = createTimeFilter({ createTime: res.data[0].deliveryTime });
        activeStrps.value = 3;
      }

      productList.value = res.data[0].productList;
      
    } else {
      ElMessage({
        showClose: true,
        message: res.msg,
        type: "error",
      });
    }
  });
}

const editVisible = ref<boolean>(false);
const tableData = reactive<string[]>([]);

const productList = ref([]);

const confirmdelorder = () => {
  centerDialogVisible.value = false;
  if (orderId.value != null && orderId.value != "") {
    orderList.delorderList(orderId.value).then((res) => {
      if (res.code == 200) {
        router.push({ path: "/orderList" });
        ElMessage({
          showClose: true,
          message: res.msg,
          type: "error",
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

const putOrderItemRemark = () => {
  orderItem
    .putOrderitem({ orderId: orderId.value, orderRemark: form.orderRemark })
    .then((res) => {
      if (res.code == 200) {
        tableData.splice(0);
        getOrderitem();
        ElMessage({
          type: "success",
          message: res.msg,
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
</script>

<style scoped>
.box-card-main {
  padding-bottom: 50px;
}
.card-main-header {
  display: flex;
  justify-content: space-between;
}
.box-card-main-money {
  display: flex;
  justify-content: space-between;
}

.box-card-main-basedata {
  display: flex;
  justify-content: center;
}
</style>
