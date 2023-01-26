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
import { ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore, mapState } from "vuex";
import store from "../store/index";

const router = useRouter();
const route = useRoute();
const editableTabsValue = ref("");

const removeTab = (targetName: string) => {
  store.commit("delVisitedView", { path: targetName });
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
