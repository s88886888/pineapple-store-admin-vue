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
 * @Date: 2023-01-09 04:40:43
 * @LastEditors: Linson 854700937@qq.com
 * @LastEditTime: 2023-05-15 20:54:45
 * @FilePath: \pineapple-admin-vue\src\App.vue
 * @Description: 菠萝电商后台管理系统
 * 
 * Copyright (c) 2023 by Linson 854700937@qq.com, All Rights Reserved. 
 -->

<template>

<!-- <RouterView v-if="path === '/login'" /> -->
  <el-container class="common-layout">
    <el-header>
      <top v-show="!(path === '/login')"></top>
    </el-header>

    <el-container class="container-box">
      <el-aside width="auto">
        <menuIndex v-show="!(path === '/login')"></menuIndex>
      </el-aside>

      <el-main>
        <navHead ></navHead>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import top from "./components/header.vue";
import menuIndex from "./components/aside.vue";
import navHead from "./components/navHead.vue";
import { useRoute } from "vue-router";
import { ref, onMounted, watch } from "vue";

const route = useRoute();

const path = ref("");

//生命周期事件，当挂载完毕
onMounted(async () => {
  path.value = route.path;
});

watch(
  () => route.path,
  () => {
    path.value = route.path;
  },
  { deep: true }
);
</script>
