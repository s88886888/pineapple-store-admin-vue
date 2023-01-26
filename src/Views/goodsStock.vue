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
          placeholder="商品编号"
          style="width: 200px"
        />

        <el-input
          class="searchInput"
          v-model="searchInputName"
          wi
          placeholder="商品名称"
          style="width: 200px"
        />
      </div>

      <div class="card-header-box">
        <el-input
          class="searchInput"
          v-model="searchInputSkuId"
          wi
          placeholder="库存编号"
          style="width: 200px"
        />

        <el-input
          class="searchInput"
          v-model="searchInputSkuName"
          wi
          placeholder="库存名称"
          style="width: 200px"
        />

        <el-select v-model="searchInputStock" class="m-2" placeholder="Select">
          <el-option
            v-for="item in StockOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-select
          v-model="searchInputStatus"
          style="margin-left: 20px"
          placeholder="Select"
        >
          <el-option
            v-for="item in statusOptions"
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
      <el-table-column prop="skuId" label="库存编号" width="100" />

      <el-table-column prop="productName" label="商品名称" width="160" />

      <el-table-column prop="url" label="商品主图" width="120">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="点击图片可以放大查看"
              placement="top"
            >
              <el-image
                style="width: 100px"
                preview-teleported
                :src="scope.row.url"
                :preview-src-list="[scope.row.url]"
              />
            </el-tooltip>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="skuName" label="库存名称" width="160" />

      <el-table-column prop="status" label="库存启用" width="100">
        <template #default="scope">
          <el-tooltip :content="'库存是否显示'" placement="top">
            <el-switch
              v-model="scope.row.status"
              style="
                --el-switch-on-color: #13ce66;
                --el-switch-off-color: #ff4949;
              "
              :active-value="1"
              :inactive-value="0"
              @click="clickEdit(scope.row.skuId,scope.row.status)"
            />
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="默认库存" width="100">
        <template #default="scope">
          <div>
            <p v-if="scope.row.skuStar == 1">是</p>
            <p v-if="scope.row.skuStar == 0">否</p>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="stock" label="库存数量" width="100" />
      <el-table-column prop="discounts" label="折扣力度" width="100" />
      <el-table-column prop="originalPrice" label="原价" width="100" />

      <el-table-column prop="sellPrice" label="销售价格" width="100" />

      <el-table-column
        prop="createTime"
        :formatter="createTimeFilter"
        label="添加时间"
        width="160"
      />
      <el-table-column
        prop="updateTime"
        :formatter="updateTimeFilter"
        label="更新时间"
        width="160"
      />

      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-popconfirm
            title="你确定删除吗？"
            confirm-button-text="是"
            cancel-button-text="否"
            @confirm="deleteClick(scope.row.skuId)"
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
            @click="edit(scope.row.productId)"
            >编辑</el-button
          >

          <el-button
            type="primary"
            size="small"
            @click="editStockShow(scope.row.skuId)"
            >补货</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-card class="box-card-footer">
      <div class="box-footer">
        <div></div>

        <div>
          <el-pagination
            :current-page="current"
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

  <el-dialog v-model="dialogVisible" title="补货" width="30%">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      class="demo-ruleForm"
    >
      <el-form-item label="库存编号" prop="stock">
        <el-input disabled v-model="ruleForm.skuId" autocomplete="off" />
      </el-form-item>

      <el-form-item label="库存名字" prop="stock">
        <el-input disabled v-model="ruleForm.skuName" autocomplete="off" />
      </el-form-item>

      <el-tooltip
        class="box-item"
        effect="dark"
        content="例如：输入 +10 或者-10  在原来的库存进行计算修改"
        placement="top"
      >
        <el-form-item label="调整库存数量" prop="stock">
          <el-input v-model="ruleForm.stock" autocomplete="off" />
        </el-form-item>
      </el-tooltip>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editStock"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage, FormInstance } from "element-plus";
import { Delete, Search, Plus } from "@element-plus/icons-vue";
import { ref, onMounted, reactive } from "vue";
import createTimeFilter from "../utils/dateFormat";
import updateTimeFilter from "../utils/updateFormat";
import { useRouter } from "vue-router";

import goodsstock from "../api/goodsstock";

import { ElMessageBox } from "element-plus";

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
//当前页
let current = ref<number>(1);
//总共有多少条
let total = ref<number>(0);

//查询所有数据
function getData() {
  loading.value = true;
  goodsstock
    .getGoodsSkuPage({ current: current.value, size: size.value })
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
    searchInputId.value != "" ||
    searchInputName.value != "" ||
    searchInputStatus.value != 0 ||
    searchInputSkuId.value != "" ||
    searchInputSkuName.value != ""
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

const clickEdit = (val:string,status:number) => {
  goodsstock.putGoodsSku({skuId:val,status:status}).then((res) => {
    if (res.code == 200) {

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

//搜索框值
const searchInputName = ref<string>("");
const searchInputId = ref<string>();

const searchInputSkuName = ref<string>("");
const searchInputSkuId = ref<string>();

const searchInputStatus = ref<number>(1);
const searchInputStock = ref<number>(0);

const statusOptions = [
  {
    value: 0,
    label: "未启用",
  },
  {
    value: 1,
    label: "启用",
  },
];

const StockOptions = [
  {
    value: 0,
    label: "库存充足",
  },
  {
    value: 1,
    label: "库存不足",
  },
];

//痛苦面具搜索事件
function indexSearch() {
  loading.value = true;
  goodsstock
    .getGoodsSkuLikePage({
      productId: searchInputId.value,
      productName: searchInputName.value,
      SkuId: searchInputSkuId.value,
      SkuName: searchInputSkuName.value,
      Stock: searchInputStock.value,
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
  searchInputId.value = "";
  searchInputSkuName.value = "";
  searchInputSkuId.value = "";
  searchInputStatus.value = 1;
  current.value = 1;
};

//#endregion

//#region 删除事件
//删除根据一条ID进行删除
const deleteClick = (id: string) => {
  goodsstock.delGoodsSkuStock({ skuId: id }).then((res) => {
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

const ruleFormRef = ref<FormInstance>();
const dialogVisible = ref(false);

let ruleForm = reactive({
  stock: 0,
  skuId: "",
  skuName: "",
});

const router = useRouter();

const edit = (id: string) => {
  router.push({ name: "updateGoods", query: { productId: id } });
};

const editStockShow = (val: string) => {
  dialogVisible.value = true;

  goodsstock.getGoodsSkuById({ Id: val }).then((res) => {
    if (res.code == 200) {
      ruleForm.skuId = res.data.skuId;
      ruleForm.skuName = res.data.skuName;
    }
  });
};
const editStock = () => {
  if (Number(ruleForm.stock)) {
    goodsstock
      .putGoodsSkuStock({ skuId: ruleForm.skuId, stock: ruleForm.stock })
      .then((res) => {
        if (res.code == 200) {
          dialogVisible.value = false;

          if (
            searchInputId.value != "" ||
            searchInputName.value != "" ||
            searchInputStatus.value != 0 ||
            searchInputSkuId.value != "" ||
            searchInputSkuName.value != ""
          ) {
            indexSearch();
          } else {
            getData();
          }
          return ElMessage({
            showClose: true,
            message: res.msg,
            type: "success",
          });
        } else {
          return ElMessage({
            showClose: true,
            message: res.msg,
            type: "error",
          });
        }
      });
  } else {
    return ElMessage({
      showClose: true,
      message: "修改的格式不正确",
      type: "error",
    });
  }
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
