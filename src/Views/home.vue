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
 * @Date: 2023-01-09 04:53:04
 * @LastEditors: Linson 854700937@qq.com
 * @LastEditTime: 2023-05-19 02:45:36
 * @FilePath: \pineapple-store-admin-vue\src\Views\home.vue
 * @Description: 菠萝电商后台管理系统
 * 
 * Copyright (c) 2023 by Linson 854700937@qq.com, All Rights Reserved. 
 -->

<template>
  <div class="home">
    <div style="padding-top: 30px; padding-bottom: 30px">
      <el-row :gutter="20">
        <el-col :span="5"> </el-col>
        <el-col :span="4">
          <el-card shadow="always"> 今日订单总数:200 </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover"> 今日销售总额:54784 </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="never"> 昨日销售总额:48961 </el-card>
        </el-col>
        <el-col :span="5"> </el-col>
      </el-row>

      <div style="padding-top: 20px">
        <el-row :gutter="20">
          <el-col :span="5"> </el-col>
          <el-col :span="4">
            <a href="http://121.4.154.210:8080/#/">
              <el-card shadow="always"> 前端地址</el-card>
            </a>
          </el-col>
          <el-col :span="4">
            <a href="https://gitee.com/S88888888/pineapple-store">
              <el-card shadow="hover"> 后端Gitee </el-card></a
            >
          </el-col>
          <el-col :span="4">
            <el-card shadow="never"> Linson vue3+TS </el-card>
          </el-col>
          <el-col :span="5"> </el-col>
        </el-row>
      </div>
    </div>

    <div style="width: 1000px; margin: 0 auto">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>系统介绍</span>
          </div>
        </template>

        <div>
          PineappleStore项目是一套电商系统，包括前台商城系统及后台管理系统，
          基于SpringBoot+MyBatis实现，
          前台商城系统包含首页门户、商品推荐、商品搜索、商品展示、购物车、订单流程、会员中心、
          客户服务、帮助中心等模块。后台管理系统包含商品管理、订单管理、会员管理、促销管理、
          运营管理、内容管理、统计报表、财务管理、权限管理、设置等模块。
        </div>
      </el-card>
    </div>

    <div class="main">
      <div>
        <h1>上周订单</h1>
        <div id="order" style="width: 500px; height: 480px"></div>
      </div>

      <div>
        <h1>本周浏览</h1>
        <div id="user" style="width: 500px; height: 450px"></div>
      </div>
    </div>

    <!-- <div class="main">
      <div>
        <h1>用户浏览</h1>
        <div id="user-box" style="width: 500px; height: 480px"></div>
      </div>
    </div> -->
  </div>
  <el-dialog
    v-model="visible"
    :close-on-click-modal="false"
    :show-close="false"
  >
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <el-button type="danger" @click="loginCheck">
          <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
          关闭
        </el-button>
      </div>
    </template>
    <div class="linson">
      <h1>项目介绍</h1>
      <div class="linson-xm">
        <span
          >PineappleStore项目是一套电商系统，包括前台商城系统及后台管理系统，
          基于SpringBoot+MyBatis实现，
          前台商城系统包含首页门户、商品推荐、商品搜索、商品展示、购物车、订单流程、会员中心、
          客户服务、帮助中心等模块。后台管理系统包含商品管理、订单管理、会员管理、促销管理、
          运营管理、内容管理、统计报表、财务管理、权限管理、设置等模块。</span
        >
      </div>

      <h1>技术栈</h1>
      <div class="linson-xm">
        <ul>
          <li>SpringBoot2</li>
          <li>mybatis-plus</li>
          <li>vue3 + Ts</li>
          <li>elementPlus</li>
          <li>vueX</li>
          <li>webSocket</li>
          <li>quartZ</li>
          <li>alipay（支付宝）</li>
          <li>滑动机器人验证</li>
          <li>短信验证码</li>
          <li>mybatis-plus-json</li>
        </ul>
      </div>

      <h1>Linson开源</h1>

      <div class="linson-xm">
        <a href="http://121.4.154.210:8080/#/" style="color: darkorange"
          >前台线上地址</a
        >
      </div>

      <div class="linson-xm">
        <a
          href="https://gitee.com/S88888888/pineapple-store-admin-vue"
          style="color: red"
          >后台管理系统Gitee地址</a
        >
      </div>
    </div>
  </el-dialog>

  <el-dialog
    v-model="loginVisible"
    :align-center="true"
    :show-close="false"
    :close-on-click-modal="false"
    :fullscreen="true"
    draggable
    width="600"
  >
    <div>
      <el-card class="box-card">
        <template #header="{ close, titleId, titleClass }">
          <div class="my-header">欢迎登录菠萝电商后台管理系统</div>
        </template>
        <el-form
          ref="ruleFormRef"
          :rules="rules"
          :model="ruleForm"
          label-width="80px"
        >
          <el-form-item label="账号" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>

          <el-form-item label="密码" prop="passWrod">
            <el-input v-model="ruleForm.passWrod" />
          </el-form-item>
        </el-form>

        <div class="login">
          <el-button @click="adminClick(ruleFormRef)">登录</el-button>
          <!-- <el-button>取消</el-button> -->
        </div>
      </el-card>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import {
  ElButton,
  ElDialog,
  FormRules,
  FormInstance,
  ElMessage,
} from "element-plus";
import { CircleCloseFilled } from "@element-plus/icons-vue";

import * as echarts from "echarts";
import { ECharts, EChartsOption, init } from "echarts";
import user from "../api/user";
import selectDataShow from "../api/selectData";

//进入弹出项目说明
const visible = ref(true);

const loginVisible = ref(false);

const token = ref<String | null>("");

const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  name: "admin",
  passWrod: "123456",
});

let myChart: any;

onMounted(() => {

  selectDataShow.selectWeekOrder().then((res) => {
    let data: any[] = [];
    for (let i in res.data) {
      data.push(res.data[i].num);
    }
    laskWeekOrder(data);
  });

  init1();
  // init2();
});

function laskWeekOrder(data: any) {
  const charEle = document.getElementById("order") as HTMLElement;
  const charEch: ECharts = init(charEle);
  const option: EChartsOption = {
    xAxis: {
      type: "category",
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: data,
        type: "line",
      },
    ],
  };
  charEch.setOption(option);
}

function init1() {
  echarts.dispose(document.getElementById("user") as HTMLElement);
  myChart = echarts.init(document.getElementById("user") as HTMLElement);
  var option2 = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "用户访问",
        type: "bar",
        barWidth: "60%",
        data: [42, 52, 184, 334, 178, 318, 226],
      },
    ],
  };

  myChart.setOption(option2);
}

// function init2() {
//   echarts.dispose(document.getElementById("user-box") as HTMLElement);
//   myChart = echarts.init(document.getElementById("user-box") as HTMLElement);
//   var option1 = {
//     title: {
//       text: "用户行为分析",
//       subtext: "商品数据",
//       left: "center",
//     },
//     tooltip: {
//       trigger: "item",
//     },
//     legend: {
//       orient: "vertical",
//       left: "left",
//     },
//     series: [
//       {
//         name: "Access From",
//         type: "pie",
//         radius: "50%",
//         data: [
//           { value: 1048, name: "数码" },
//           { value: 735, name: "零食" },
//           { value: 580, name: "蛋糕" },
//           { value: 484, name: "手机" },
//           { value: 300, name: "苹果" },
//         ],
//         emphasis: {
//           itemStyle: {
//             shadowBlur: 10,
//             shadowOffsetX: 0,
//             shadowColor: "rgba(0, 0, 0, 0.5)",
//           },
//         },
//       },
//     ],
//   };

//   myChart.setOption(option1);
// }

const rules = reactive<FormRules>({
  name: [
    { required: true, message: "请输入账户", trigger: "blur" },
    { min: 5, max: 10, message: "长度在5，10", trigger: "blur" },
  ],
  passWrod: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 5, max: 10, message: "长度在5，10", trigger: "blur" },
  ],
});

const loginCheck = () => {
  token.value = window.localStorage.getItem("token");

  if (token.value) {
    visible.value = false;
    loginVisible.value = false;
  } else {
    visible.value = false;
    loginVisible.value = true;
  }
};

const adminClick = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      user.adminLogin(ruleForm).then((res) => {
        if (res.code == 200) {
          window.localStorage.setItem("token", res.data);
          token.value = res.data;
          loginVisible.value = false;
        } else {
          return ElMessage({
            showClose: true,
            message: res.msg,
            type: "error",
          });
        }
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style scoped>
.box-card {
  width: 500px;
}
.login {
  /* margin: auto; */
  margin-left: 150px;
}
.main {
  display: flex;
  justify-content: center;
}
.linson {
  /* display: flex;
  justify-content: center; */
  margin: 0 auto;
  text-align: center;
}
.linson-xm li {
  list-style-type: none;
  margin: 0 auto;
}

.box-card {
  width: 400px;
  margin: auto;
}
</style>
