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
      <el-menu-item index="1">Processing Center</el-menu-item>
      <el-sub-menu index="2">
        <template #title>Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-sub-menu index="2-4">
          <template #title>item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
    </el-menu>
</template>

<script setup lang="ts">
import { ref } from "vue";
// 头部部分
const activeIndex = ref<string>("1");
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
