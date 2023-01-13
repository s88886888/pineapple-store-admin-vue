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
 * @LastEditTime: 2023-01-12 14:31:34
 * @FilePath: \pineapple-admin-vue\src\App.vue
 * @Description: 菠萝电商后台管理系统
 * 
 * Copyright (c) 2023 by Linson 854700937@qq.com, All Rights Reserved. 
 -->

<template>
  <el-container class="common-layout">
    <el-header>
      <top></top>
    </el-header>

    <el-container class="container-box">
        <el-aside width="auto">
          <menuIndex></menuIndex>
        </el-aside>

      <el-main>

        <div calass="container">
          <el-card class="box-card">
            <el-breadcrumb class="container-breadcrumb" separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item><a href="/">页面1</a></el-breadcrumb-item>
            </el-breadcrumb>
          </el-card>

          <div class="container-main">
            <RouterView />
          </div>
        </div>
        
      </el-main>

    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import top from "./components/header.vue";
import menuIndex from "./components/aside.vue";
</script>

<style >
/* .box-card-main {
  margin-top: 10px;
}
.container-box{
  height: 100%;
} */

</style>
