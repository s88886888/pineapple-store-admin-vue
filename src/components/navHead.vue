<template>
  <div calass="container">
    <el-card class="box-card">
      <div class="main-box">
        <div class="page">
          <el-breadcrumb class="container-breadcrumb" separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item
              ><a href="/">{{ route.meta.title }}</a></el-breadcrumb-item
            >
          </el-breadcrumb>
        </div>

        <div class="tab">
          <el-tabs
            v-model="editableTabsValue"
            type="card"
            class="demo-tabs"
            closable
            @tab-remove="removeTab"
            @tab-click="addRouter"
            @edit="handleTabsEdit"
          >
            <el-tab-pane
              v-for="item in visitedView"
              :key="item.path"
              :label="item.meta.title"
              :name="item.path"
            ></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-card>

    <div class="container-main">
      <!-- <KeepAlive> -->

      <RouterView />

      <!-- </KeepAlive> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore, mapState } from "vuex";

import store from "../store/index";

const router = useRouter();
const route = useRoute();
const editableTabsValue = ref("/");

// const linsonStore = useStore();

const handleTabsEdit = () => {
  console.log(store.getters.getRouteInfo);
};

const removeTab = (targetName: string) => {
  console.log(targetName);

  if (targetName === "/") {
    return ElMessage({
      showClose: true,
      message: "首页标签不能被删除",
      type: "error",
    });
  }

  store.commit("delVisitedView", { path: targetName });
  router.push({
    path: store.getters.getRouteInfo[store.getters.getRouteInfo.length - 1]
      .path,
  });
  editableTabsValue.value =
    store.getters.getRouteInfo[store.getters.getRouteInfo.length - 1].path;
};

const addRouter = (val: { props: { name: string } }) => {
  router.push({ path: val.props.name });
};

let visitedView = computed(() => {
  return store.state.visitedView;
});

watch(
  () => route.path,
  () => {
    if (route.meta.title == null) {
      return;
    }
    let viewObj = {
      name: route.name,
      fullPath: route.fullPath,
      path: route.path,
      meta: route.meta,
      query: route.query,
    };
    store.commit("addVisitedView", viewObj); //将此路由储存在vuex
    editableTabsValue.value = viewObj.path;
  },
  { deep: true }
);
</script>

<style scoped>
.page .el-breadcrumb {
  font-size: 16px;
  line-height: 1;
}
.tab {
  padding-top: 20px;
}
</style>
