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
 * @Date: 2023-01-09 06:44:13
 * @LastEditors: Linson 854700937@qq.com
 * @LastEditTime: 2023-05-15 20:31:54
 * @FilePath: \pineapple-admin-vue\src\components\header.vue
 * @Description: 菠萝电商后台管理系统
 * 
 * Copyright (c) 2023 by Linson 854700937@qq.com, All Rights Reserved. 
 -->

<template>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="0" class="logo-txt">菠萝电商后台</el-menu-item>

      <div class="flex-grow" />

      <!-- <el-menu-item index="1">你好：Admin</el-menu-item> -->
      <!-- <el-sub-menu index="2">
        <template #title>退出</template>
         <el-menu-item index="2-1">退出</el-menu-item>

      </el-sub-menu> -->
      <div style="margin-top:15px"><el-button >退出</el-button></div>
    </el-menu>
</template>

<script setup lang="ts">
import { ref } from "vue";
// 头部部分
const activeIndex = ref<string>("3");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
// 头部部分End
</script>

<style scoped>
/* 顶部 */
.flex-grow {
  flex-grow: 1;
}
.el-menu-demo .logo-txt {
  font-size: 25px;
}


/* 顶部End */
</style>
