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
 * @LastEditTime: 2023-01-14 20:57:13
 * @FilePath: \pineapple-admin-vue\src\components\aside.vue
 * @Description: 菠萝电商后台管理系统
 * 
 * Copyright (c) 2023 by Linson 854700937@qq.com, All Rights Reserved. 
 -->

<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical"
    :collapse="false"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><Goods /></el-icon>
        <span>商品管理菜单</span>
      </template>

      <el-menu-item-group>
        <router-link to="/addGoods">
          <el-menu-item index="1-1"> <el-icon><Sell /></el-icon>添加商品
          </el-menu-item>
        </router-link>
      </el-menu-item-group>

      <el-menu-item-group>
        <router-link to="/goodsList"
          ><el-menu-item index="1-2"><el-icon><Money /></el-icon>商品列表</el-menu-item>
        </router-link>
      </el-menu-item-group>

      <el-menu-item-group>
        <template #title></template>
        <router-link to="/indexImg"
          ><el-menu-item index="1-3"> <el-icon><Picture /></el-icon>设置轮播图</el-menu-item>
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

    </el-sub-menu>

    <el-menu-item index="3" disabled>
      <el-icon><document /></el-icon>
      <template #title>用户管理</template>
    </el-menu-item>

    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <template #title>设置</template>
    </el-menu-item>

    <el-menu-item index="4"> </el-menu-item>

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
  Picture
} from "@element-plus/icons-vue";

//折叠开关
const isCollapse = ref<boolean>(false);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
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
