<template>
  <el-card class="box-card-main">
    <template #header>
      <div class="card-header-top">
        <el-button type="primary" @click="goAddCategory" round>新增</el-button>
        <div>
          <el-button round @click="reData">重置数据</el-button>
          <el-button :icon="Search" round @click="indexSearch">搜索</el-button>
        </div>
      </div>

      <div class="card-header-box">
        <el-input
          class="searchInput"
          v-model="searchInputId"
          wi
          placeholder="请输入分类编号"
          style="width: 200px"
        />

        <el-input
          class="searchInput"
          v-model="searchInputName"
          wi
          placeholder="请输入分类名称"
          style="width: 200px"
        />

        <el-input
          class="searchInput"
          v-model="searchInputSlogan"
          wi
          placeholder="分类简介"
          style="width: 200px"
        />

        <el-select v-model="searchInputStatus" placeholder="分类推荐">
          <el-option
            v-for="item in StatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </template>

    <el-table
      v-loading="loading"
      :data="tableData"
      :border="true"
      :table-layout="'auto'"
      style="width: 100%"
    >
      <el-table-column fixed type="index" :index="indexMethod" />
      <el-table-column prop="categoryId" label="分类编号" width="100" />

      <el-table-column prop="categoryName" label="分类名称" width="160" />

      <el-table-column prop="categoryLevel" label="分类等级" width="160">
        <template #default="scope">
          <div>
            <p v-if="scope.row.categoryLevel==1"> 一级分类</p>
            <p v-if="scope.row.categoryLevel==2"> 二级分类</p>
            <p v-if="scope.row.categoryLevel==3"> 三级分类</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="categorySlogan" label="分类简介" width="300" />

      <el-table-column prop="productStatus" label="轮播图导航推荐" width="150">
        <template #default="scope">
          <div>
            <el-tooltip :content="'点击按钮控制开关'" placement="top">
              <el-switch
                v-model="scope.row.categoryStar"
                @click="
                  editStatus(scope.row.categoryId, scope.row.categoryStar)
                "
                style="
                  --el-switch-on-color: #13ce66;
                  --el-switch-off-color: #ff4949;
                "
                :active-value="1"
                :inactive-value="0"
              />
            </el-tooltip>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="productStatus" label="菠萝优选" width="150">
        <template #default="scope">
          <!-- <div style="display: flex; align-items: center">
              <p v-if="scope.row.status">启用</p>
              <p v-else="scope.row.status">关闭</p>
            </div> -->
          <div>
            <span>上架: </span>
            <el-tooltip :content="'点击按钮控制开关'" placement="top">
              <el-switch
                v-model="scope.row.productStatus"
                @click="
                  editStatus(scope.row.categoryId, scope.row.productStatus)
                "
                style="
                  --el-switch-on-color: #13ce66;
                  --el-switch-off-color: #ff4949;
                "
                :active-value="1"
                :inactive-value="0"
              />
            </el-tooltip>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="url" label="分类图片" width="200">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="点击图片可以放大查看"
              placement="top"
            >
              <el-image
                style="width: 100px; height: 100px"
                preview-teleported
                :src="scope.row.categoryImg"
                close-on-press-escape
                :preview-src-list="[scope.row.categoryImg]"
              />
            </el-tooltip>
          </div>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-popconfirm
            title="你确定删除吗？"
            confirm-button-text="是"
            cancel-button-text="否"
            @confirm="deleteClick(scope.row.imgId)"
            :icon="Delete"
            icon-color="red"
          >
            <template #reference>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>

          <el-button
            type="primary"
            size="small"
            @click="edit(scope.row.categoryId)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-card class="box-card-footer">
      <div class="box-footer">
        <div></div>

        <div>
          <el-pagination
            :page-size="size"
            :total="total"
            background
            layout="prev, pager, next"
            @current-change="currentChange"
          />
        </div>
      </div>
    </el-card>
  </el-card>
</template>

<script setup lang="ts">
import {
  ElMessage,
  UploadFile,
  FormInstance,
  FormRules,
  UploadUserFile,
} from "element-plus";
import { Delete, Search, Plus } from "@element-plus/icons-vue";
import { ref, onMounted } from "vue";

import categoryList from "../api/categoryList";
import { useRouter } from "vue-router";

//生命周期事件，当挂载完毕
onMounted(() => {
  getData();
});

//#region  表单初始化
//表单加载动画
const loading = ref<boolean>(true);
//表单数据
let tableData = ref([]);

//每次查询多少条
const size = ref<number>(5);
//总共有多少页
const current = ref<number>(1);
//总共有多少条
let total = ref<number>(0);

//查询所有数据
function getData() {
  loading.value = true;
  categoryList
    .getcategoryListPage({ current: current.value, size: size.value })
    .then((res) => {
      if (res.code == 200) {
        tableData.value = res.data.records;
        current.value = res.data.current;
        total.value = res.data.total;
        //加钱优化
        setTimeout(() => {
          loading.value = false;
        }, 500);
      } else {
        ElMessage({
          showClose: true,
          message: res.msg,
          type: "error",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

//分页器一旦发生改变
const currentChange = (val: number) => {
  current.value = val;

  if (
    searchInputId.value != 0 ||
    searchInputName.value != "" ||
    searchInputSlogan.value != "" ||
    searchInputStatus.value != 0
  ) {
    return indexSearch();
  }

  return getData();
};

//#endregion

//#region  公共事件
const indexMethod = (index: number) => {
  return index * 1;
};

//搜索框值
const searchInputName = ref<string>("");
const searchInputId = ref<number | null>();
const searchInputSlogan = ref<string>("");
const searchInputStatus = ref<number>(0);
//上下架选择框
const StatusOptions = [
  {
    value: 0,
    label: "未选择",
  },
  {
    value: 1,
    label: "轮播图推荐",
  },
  {
    value: 2,
    label: "菠萝推荐",
  },
];

//痛苦面具搜索事件
function indexSearch() {
  loading.value = true;
  categoryList
    .getcategoryListPage({
      categoryId: searchInputId.value,
      Name: searchInputName.value,
      slogan: searchInputSlogan.value,
      Status: searchInputStatus.value,
      current: current.value,
      size: size.value,
    })
    .then((res) => {
      if (res.code == 200) {
        tableData.value = res.data.records;
        current.value = res.data.current;
        total.value = res.data.total;
        size.value = res.data.size;
        //加钱优化
        setTimeout(() => {
          loading.value = false;
        }, 500);
      } else {
        ElMessage({
          showClose: true,
          message: res.msg,
          type: "error",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

const reData = () => {
  searchInputName.value = "";
  searchInputId.value = null;
  searchInputSlogan.value = "";
  searchInputStatus.value = 0;
};

//#endregion

//#region 删除事件
//删除根据一条ID进行删除
const deleteClick = (id: string) => {
  categoryList.delCategory(id).then((res) => {
    if (res.code == 200) {
      loading.value = true;
      getData();
      ElMessage({
        showClose: true,
        message: res.msg,
        type: "success",
      });
    } else {
      ElMessage({
        showClose: true,
        message: res.msg,
        type: "error",
      });
    }
  });
};
//#endregion

//#region 编辑事件
//点击编辑事件

const router = useRouter();

const edit = (id: string) => {
  router.push({ name: "addCategory", query: { categoryId: id } });
};

//编辑Status状态
const editStatus = (val: number, star: number) => {
  loading.value = true;
  categoryList
    .putcategoryList({ categoryId: val, categoryStar: star })
    .then((res) => {
      if (res.code == 200) {
        loading.value = false;
        ElMessage({
          showClose: true,
          message: res.msg,
          type: "success",
        });
      } else {
        loading.value = false;
        ElMessage({
          showClose: true,
          message: res.msg,
          type: "error",
        });
      }
    });
};

//#endregion

//#region 新增数据

//新增数据事件
const Router = useRouter();
const goAddCategory = () => {
  Router.push({ path: "/addCategory" });
};

//#endregion
</script>

<style scoped>
.card-header-top {
  display: flex;
  justify-content: space-between;
}
.searchInput {
  margin-right: 15px;
}
button.el-dialog__headerbtn {
  display: none;
}

.box-footer {
  display: flex;
  justify-content: space-between;
}
.box-card-main {
  padding-bottom: 50px;
}
.card-header-box {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
