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
 * @LastEditTime: 2023-01-27 04:31:47
 * @FilePath: \pineapple-admin-vue\src\views\home.vue
 * @Description: 菠萝电商后台管理系统
 * 
 * Copyright (c) 2023 by Linson 854700937@qq.com, All Rights Reserved. 
 -->

<template>







  <el-dialog v-model="visible" :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <el-button type="danger" @click="close">
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
        <a href="http://121.4.154.210:8080/#/" style="color:darkorange"
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

</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElButton, ElDialog } from "element-plus";
import { CircleCloseFilled } from "@element-plus/icons-vue";

const visible = ref(true);

</script>

<style scoped>
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
</style>
