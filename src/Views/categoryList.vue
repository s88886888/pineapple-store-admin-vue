<template>
  <el-card class="box-card-main">
    <template #header>
      <div class="card-header-top">
        <el-button type="primary" @click="addIndexImg" round>新增</el-button>
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

      <el-table-column prop="categorySlogan" label="分类简介" width="300" />

      <el-table-column prop="productStatus" label="轮播图导航推荐" width="150">
        <template #default="scope">
          <div>
            <el-tooltip :content="'点击按钮控制开关'" placement="top">
              <el-switch
                v-model="scope.row.categoryStar"
                @click="editStatus(scope.row.categoryId,scope.row.categoryStar)"
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


      <el-table-column prop="productStatus" label="菠萝推荐" width="150">
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
                @click="editStatus(scope.row.productId,scope.row.productId)"
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
                @click="editStatus(scope.row.categoryId,scope.row.productStatus)"
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
                :src="scope.row.url"
                close-on-press-escape
                :preview-src-list="Imglist"
                @click="previewclick(scope.row.categoryImg)"
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
            @click="editIndexImg(scope.row.imgId)"
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

  <!-- 编辑框框 -->
  <el-dialog
    v-model="dialogVisibleEdit"
    title="编辑"
    width="30%"
    draggable
    align-center
    :show-close="false"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
      v-loading="loadingEdit"
    >
      <el-form-item label="图片名字" prop="imgName">
        <el-input v-model="ruleForm.imgName" />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-tooltip :content="'图片是否显示'" placement="top">
          <el-switch
            v-model="ruleForm.status"
            style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
            :active-value="1"
            :inactive-value="0"
          />
        </el-tooltip>
      </el-form-item>

      <el-form-item label="图片" prop="resource">
        <template #default="scope">
          <el-upload
            v-model:file-list="fileList"
            :http-request="uploadImg"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-exceed="imageIndexnum"
            :on-remove="removeIndex"
            accept="image/jpeg,image/gif,image/png"
            :limit="1"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>

          <el-dialog v-model="dialogVisibleShowImg">
            <img
              w-full
              style="width: 100%; height: 100%"
              :src="dialogImageUrl"
            />
          </el-dialog>
        </template>
      </el-form-item>

      <el-form-item label="文字描述" prop="describes">
        <el-input v-model="ruleForm.describes" type="textarea" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          确定
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeEidt">关闭</el-button>
        <!-- <el-button type="primary" @click="dialogVisible = false">
              关闭
            </el-button> -->
      </span>
    </template>
  </el-dialog>
  <!-- 编辑框框 End -->
</template>

<script setup lang="ts">
import {
  ElMessage,
  UploadFile,
  FormInstance,
  FormRules,
  UploadUserFile,
} from "element-plus";
import { Delete, Search, Plus, Edit } from "@element-plus/icons-vue";
import { ref, onMounted, reactive } from "vue";
import indexImg from "../api/indexImg";
import goodList from "../api/goodList";
import upload from "../api/upload";
import categoryList from "../api/categoryList";
import orderList from "../api/orderList";

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

/* 用于控制该表单域下组件的默认尺寸	'large' | 'default' | 'small'	'default' */
const formSize = ref("default");

const Imglist = reactive([
  "https://s2.loli.net/2023/01/11/qsFPEVK83XkOYHy.jpg",
]);

//点击图片多图事件
const previewclick = async (id: string) => {
  await goodList.getImgbyId(id).then((res) => {
    if (res.code == 200) {
      Imglist.splice(0);
      for (let i = 0; i < res.data[0].imgList.length; i++) {
        Imglist.push(res.data[0].imgList[i].url);
      }
    } else {
      Imglist.splice(0);
      Imglist.push("https://s2.loli.net/2023/01/11/qsFPEVK83XkOYHy.jpg");
      ElMessage({
        showClose: true,
        message: res.msg,
        type: "error",
      });
    }
  });
};
//表单验证
const rules = reactive<FormRules>({
  imgName: [
    { required: true, message: "请输入名字", trigger: "blur" },
    { min: 2, max: 10, message: "大小控制在 2 to 10 字符", trigger: "blur" },
  ],
  describes: [{ required: true, message: "请输入文字", trigger: "blur" }],
});

//重置表单数据
const ruleFormRef = ref<FormInstance>();
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

//#endregion

//#region  公共事件
const indexMethod = (index: number) => {
  return index * 1;
};

//数据初始化
const ruleForm = ref({
  imgName: "",
  status: 0,
  imgUrl: "",
  describes: "",
});

//弹出框图片
const fileList = ref<UploadUserFile[]>([
  {
    name: "",
    url: "",
  },
]);

//弹出框开关
const dialogVisibleEdit = ref(false);

//弹出框加载动画
let loadingEdit = ref<boolean>(true);

//上传事件的照片地址
const dialogImageUrl = ref("");

//点击上传的图片变大
const dialogVisibleShowImg = ref(false);

//点击查看变大的图片
const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  dialogVisibleShowImg.value = true;
};

//弹出层图片数量超出
const imageIndexnum = () => {
  return ElMessage({
    showClose: true,
    message: "只允许存在一张图片，先删除再上传",
    type: "error",
  });
};
//弹出层移除图片事件
const removeIndex = () => {
  ruleForm.value.imgUrl = "";
};

// 上传图片事件
let uploadImg = (file: { file: Blob }) => {
  upload(file.file).then((res) => {
    if (res.status == 200) {
      if (res.data.code === "image_repeated") {
        ruleForm.value.imgUrl = res.data.images;
      } else {
        ruleForm.value.imgUrl = res.data.data.url;
      }
      return ElMessage({
        showClose: true,
        message: "上传成功",
        type: "success",
      });
    } else {
      console.log(res);

      ElMessage({
        showClose: true,
        message: "图床服务商出错原因是：" + res.data.message,
        type: "error",
      });
    }
  });
};

// true 是新增 false 是编辑
let addOrEdit = ref<boolean>(true);

//新增or编辑事件提交
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      if (addOrEdit.value) {
        if (ruleForm.value.imgUrl == "") {
          return ElMessage({
            showClose: true,
            message: "图片未加载",
            type: "error",
          });
        }
        loadingEdit.value = true;
        await indexImg
          .PostIndexImgById(ruleForm.value)
          .then((res) => {
            if (res.code == 200) {
              getData();
              dialogVisibleEdit.value = false;
              loadingEdit.value = false;
              return ElMessage({
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
          })
          .catch((err) => {});
      } else {
        if (ruleForm.value.imgUrl == "") {
          return ElMessage({
            showClose: true,
            message: "请耐心等待图片加载",
            type: "error",
          });
        }
        loadingEdit.value = true;
        await indexImg
          .putIndexImg(ruleForm.value)
          .then((res) => {
            if (res.code == 200) {
              //刷新一下
              getData();
              dialogVisibleEdit.value = false;
              loadingEdit.value = false;
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
          })
          .catch((res) => {});
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};

//搜索框值
const searchInputName = ref<string>("");
const searchInputId = ref<number|null>();
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
}

//#endregion

//#region 删除事件
//删除根据一条ID进行删除
const deleteClick = (id: string) => {
  indexImg.delIndexImg(id).then((res) => {
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

const editIndexImg = (id: string) => {
  addOrEdit.value = false;
  fileList.value.splice(0);
  indexImg.getIndexImgByid(id).then((res) => {
    if (res.code == 200) {
      dialogVisibleEdit.value = true;
      ruleForm.value = res.data;
      fileList.value.push({
        name: ruleForm.value.imgName,
        url: ruleForm.value.imgUrl,
      });
      //加钱优化
      // loadingEdit.value = false;
      setTimeout(() => {
        loadingEdit.value = false;
      }, 500);
    } else {
      ElMessage({
        showClose: true,
        message: res.msg,
        type: "error",
      });
    }
  });
};

//关闭编辑窗口
const closeEidt = () => {
  dialogVisibleEdit.value = false;
  loadingEdit.value = true;
};

//编辑Status状态
const editStatus = (val:number,star:number) => {
  loading.value = true;
  console.log(val,star);
  
  categoryList.putcategoryList({ categoryId:val,categoryStar:star}).then((res) => {
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
const addIndexImg = () => {
  addOrEdit.value = true;
  //数据初始化
  ruleForm.value = {
    imgName: "",
    status: 0,
    imgUrl: "",
    describes: "",
  };
  //清除图片
  fileList.value.splice(0);
  //关闭加载动画
  loadingEdit.value = false;
  //打开弹出层
  dialogVisibleEdit.value = true;
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
