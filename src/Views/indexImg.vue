<template>

  <el-card class="box-card-main">
    
    <template #header>
      <div class="card-header">
        <el-button type="primary" @click="addIndexImg" round>新增</el-button>
        <div>
          <el-input
            class="searchInput"
            v-model="searchInput"
            wi
            placeholder="请输入图片名称"
            style="width: 200px"
          />
          <el-button style="" :icon="Search" round @click="indexSearch"
            >搜索</el-button
          >
        </div>
      </div>
    </template>

    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column fixed type="index" :index="indexMethod" />
      <el-table-column  prop="imgId" label="编号" width="100" />
      <el-table-column
        prop="createTime"
        :formatter="createTimeFilter"
        label="时间"
        width="120"
      />
      <el-table-column prop="imgName" label="图片名字" width="150" />
      <el-table-column prop="status" label="启用状态" width="100">
        <template #default="scope">
          <!-- <div style="display: flex; align-items: center">
          <p v-if="scope.row.status">启用</p>
          <p v-else="scope.row.status">关闭</p>
        </div> -->

          <el-tooltip :content="'点击按钮控制开关'" placement="top">
            <el-switch
              v-model="scope.row.status"
              @click="editStatus(scope.row.imgId)"
              style="
                --el-switch-on-color: #13ce66;
                --el-switch-off-color: #ff4949;
              "
              :active-value="1"
              :inactive-value="0"
            />
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column prop="imgUrl" label="图片" width="300">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="点击图片可以放大查看"
              placement="top"
            >
              <el-image
                preview-teleported
                :src="scope.row.imgUrl"
                :preview-src-list="[scope.row.imgUrl]"
              />
            </el-tooltip>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="imgUrl" label="图片地址" width="370" />
      <el-table-column prop="describes" label="文字描述" width="200" />

      <el-table-column fixed="right" label="操作" width="150">
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
              <el-button link type="primary" size="small">删除</el-button>
            </template>
          </el-popconfirm>

          <el-button
            link
            type="primary"
            size="small"
            @click="editIndexImg(scope.row.imgId)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
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
import { Delete, Search, Plus } from "@element-plus/icons-vue";
import { ref, onMounted, reactive } from "vue";
import createTimeFilter from "../utils/dateFormat";
import indexImg from "../api/indexImg";
import upload from "../api/upload";

//生命周期事件，当挂载完毕
onMounted(() => {
  getData();
});
//////////////////////////////////表单初始化///////////////////////////

//表单加载动画
const loading = ref<boolean>(true);
//表单数据
let tableData = ref([]);

//查询所有数据
function getData() {
  indexImg
    .getIndexImgAll()
    .then((res) => {
      if (res.code == 200) {
        tableData.value = res.data;
        //加钱优化
        setTimeout(() => {
          loading.value = false;
        }, 800);
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

/* 用于控制该表单域下组件的默认尺寸	'large' | 'default' | 'small'	'default' */
const formSize = ref("default");

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

//////////////////////////////删除事件///////////////////////////////
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

////////////////////////////公共数据/////////////////////////////


const indexMethod = (index: number) => {
  return index * 1
}

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
const searchInput = ref<string>("");

const indexSearch = () => {
  loading.value = true;
  if (searchInput.value == "") {
    return getData();
  }

  indexImg.getIndexImgLikeName(searchInput.value).then((res) => {
    if (res.code == 200) {
      tableData.value = res.data;
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
  });
};

//////////////////////////////编辑事件/////////////////////////////
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
const editStatus = (id: string) => {
  loading.value = true;
  indexImg.putIndexImgById(id).then((res) => {
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

////////////////////////////////新增数据//////////////////////////////////////

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
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
}
.searchInput {
  margin-right: 15px;
}
button.el-dialog__headerbtn {
  display: none;
}
</style>
