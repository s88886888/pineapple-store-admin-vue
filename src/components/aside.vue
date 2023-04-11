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
 * @Date: 2023-01-09 06:44:24
 * @LastEditors: Linson 854700937@qq.com
 * @LastEditTime: 2023-04-11 17:17:09
 * @FilePath: \pineapple-store-admin-vue\src\components\aside.vue
 * @Description: 菠萝电商后台管理系统
 * 
 * Copyright (c) 2023 by Linson 854700937@qq.com, All Rights Reserved. 
 -->

<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical"
    :collapse="isCollapse"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><Goods /></el-icon>
        <span>商品管理菜单</span>
      </template>

      <el-menu-item-group>
        <router-link to="/addGoods">
          <el-menu-item index="1-1">
            <el-icon><Sell /></el-icon>添加商品
          </el-menu-item>
        </router-link>
      </el-menu-item-group>

      <el-menu-item-group>
        <router-link to="/goodsList"
          ><el-menu-item index="1-2"
            ><el-icon><Money /></el-icon>商品列表</el-menu-item
          >
        </router-link>
      </el-menu-item-group>

      <el-menu-item-group>
        <router-link to="/categoryList"
          ><el-menu-item index="1-3"
            ><el-icon><CreditCard /></el-icon>分类列表</el-menu-item
          >
        </router-link>
      </el-menu-item-group>

      <el-menu-item-group>
        <router-link to="/goodsStock"
          ><el-menu-item index="1-4"
            ><el-icon><Box /></el-icon>库存列表</el-menu-item
          >
        </router-link>
      </el-menu-item-group>
    </el-sub-menu>

    <el-sub-menu index="2">
      <template #title>
        <el-icon><Memo /></el-icon>
        <span>订单管理菜单</span>
      </template>

      <el-menu-item-group>
        <router-link to="/orderList"
          ><el-menu-item index="2-1">
            <el-icon><Tickets /></el-icon>订单列表</el-menu-item
          >
        </router-link>
      </el-menu-item-group>

      <el-menu-item-group >
        <router-link to="/deliverGoodsList"
          ><el-menu-item index="2-2" >
            <el-icon><Tickets /></el-icon>发货管理</el-menu-item
          >
        </router-link>
      </el-menu-item-group>

      <el-menu-item-group>
        <router-link to="/returnOrder"
          ><el-menu-item index="2-3">
            <el-icon><Tickets /></el-icon>退货管理</el-menu-item
          >
        </router-link>
      </el-menu-item-group>
    </el-sub-menu>

    <el-sub-menu index="3">
      <template #title>
        <el-icon><House /></el-icon>
        <span>项目管理菜单</span>
      </template>

      <el-menu-item-group>
        <template #title></template>
        <router-link to="/indexImg"
          ><el-menu-item index="3-1">
            <el-icon><Picture /></el-icon>
            <p>设置轮播图</p></el-menu-item
          >
        </router-link>
      </el-menu-item-group>

      <el-menu-item-group>
        <template #title></template>
        <router-link to="/indexImg"
          ><el-menu-item index="3-2" disabled>
            <el-icon><Picture /></el-icon>设置退货理由</el-menu-item
          >
        </router-link>
      </el-menu-item-group>

      <el-menu-item-group>
        <template #title></template>
        <router-link to="/indexImg"
          ><el-menu-item index="3-3" disabled>
            <el-icon><Picture /></el-icon>设置首页广告</el-menu-item
          >
        </router-link>
      </el-menu-item-group>
    </el-sub-menu>

    <el-menu-item index="4" disabled>
      <el-icon><document /></el-icon>
      <template #title>用户管理</template>
    </el-menu-item>

    <el-sub-menu index="5">
      <template #title>
        <el-icon><setting /></el-icon>
        <span>设置</span>
      </template>

      <el-menu-item-group>
        <el-menu-item index="1-3" @click="AsideUIShow">折叠</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

    <el-menu-item index="6"> </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Sell,
  Setting,
  Memo,
  Goods,
  Tickets,
  Money,
  CreditCard,
  Handbag,
  Box,
  House,
  Picture,
} from "@element-plus/icons-vue";

//折叠开关
const isCollapse = ref<boolean>(false);

const AsideUIShow = () => {
  isCollapse.value = !isCollapse.value;
};


</script>

<style scoped>
/* 左边菜单*/
.el-menu-vertical:not(.el-menu--collapse) {
  min-height: 100%;
  height: 100%;
}
/* 左边菜单End */

.el-menu-vertical a {
  text-decoration: none;
}
</style>
