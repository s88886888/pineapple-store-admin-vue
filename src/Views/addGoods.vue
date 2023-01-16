<template>
  <el-card class="box-card-main">
    
    <template #header>
      <div class="card-header-top">
        <el-steps :active="activeSteps" align-center finish-status="success">
          <el-step title="添加商品" />
          <el-step title="添加商品介绍图片" />
          <el-step title="添加商品库存" />
        </el-steps>
      </div>
    </template>

    <div class="card-header-box">
      <!-- //添加商品 -->
      <el-card v-show="addGoodsShow" class="box-card-addGoods">
        <el-form
          ref="ruleGoodsFormRef"
          :model="addGoodsForm"
          :rules="addGoodsRules"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
        >
          <el-form-item label="商品名字" prop="productName">
            <el-input v-model="addGoodsForm.productName" style="width: 400px" />
          </el-form-item>

          <el-form-item label="商品分类" prop="categoryId">
            <el-select
              v-model="addGoodsForm.categoryId"
              filterable
              placeholder="请选择商品分类"
              @change="categoryIdChange"
            >
              <el-option
                v-for="item in categoryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="商品状态"
            prop="productStatus"
            style="margin-left: 10px"
          >
            <el-tooltip :content="'是否上架'" placement="top">
              <div>
                <el-switch
                  v-model="addGoodsForm.productStatus"
                  style="--el-switch-on-color: #13ce66;--el-switch-off-color: #ff4949;"
                  :active-value="1"
                  :inactive-value="0"
                />
              </div>
            </el-tooltip>
          </el-form-item>

          <el-form-item label="商品图片" prop="url" required>
            <template #default="scope">
              <el-upload
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
                  :src="addGoodsUrl"
                />
              </el-dialog>
            </template>
          </el-form-item>

          <el-form-item label="商品描述" prop="content">
            <el-input v-model="addGoodsForm.content" type="textarea" />
          </el-form-item>

          <el-form-item
            label="商品推荐"
            prop="productStar"
            style="margin-left: 10px"
          >
            <el-select
              v-model="addGoodsForm.productStar"
              filterable
              placeholder="请选择商品推荐分类"
            >
              <el-option
                v-for="item in productStatusoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-card>
      <!-- //添加商品 -->

      <!-- 添加商品图片-->
      <el-card class="box-card-addgoodsImgs" v-show="AddGoodsImgShow">
        <el-form
          :model="AddGoodsImgForm"
          status-icon
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="照片" prop="url">
            <el-upload
              v-model:file-list="addGoodImgsList"
              :http-request="uploadImg"
              multiple
              drag
              list-type="picture-card"
              :on-preview="addGoodImgsListPreview"
              :on-remove="removeIndex"
            >
              <el-icon><Plus /></el-icon>
            </el-upload>

            <el-dialog v-model="GoodImgsVisible">
              <el-image
                style="width: 100%; height: 100%"
                :src="GoodImgsUrl"
                alt="Preview Image"
              />
            </el-dialog>
          </el-form-item>
        </el-form>
      </el-card>
      <!-- 添加商品图片 -->


      <!-- 添加库存 -->
      <el-card class="box-card-GoodsSku" v-show="GoodsSKuShow">
        <div v-for="o in 4" :key="o" class="text item">
          {{ "List item " + o }}
        </div>
      </el-card>

      <!-- 添加库存 -->
    </div>

    <!-- 步骤按钮 -->
    <div class="card-header-footer">
      <el-button @click="backClick" v-show="backshow">上一步</el-button>
      <el-button
        :loading="nextBtShow"
        type="primary"
        @click="submitForm(ruleGoodsFormRef)"
        >下一步</el-button
      >
    </div>
    <!-- 步骤按钮 -->
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
import upload from "../api/upload";
import { reactive, ref, onMounted, watch } from "vue";
import addGoods from "../api/addGoods";
const formSize = ref("large");

//生命周期事件，当挂载完毕
onMounted(() => {
  getCategory();
  addGoodImgsList.value.splice(0);
});

//#region 添加商品
const addGoodsForm = reactive({
  productName: "",
  content: "",
  productStatus: "",
  categoryId: 0,
  url: "",
  productStar: 0,
});
//点击上传的图片变大
const dialogVisibleShowImg = ref(false);

//上传事件的照片地址
const addGoodsUrl = ref("");

//商品推荐
const productStatus = ref<number>(0);

//查询所有商品分类
function getCategory() {
  addGoods
    .getCategoryList({})
    .then((res) => {
      if (res.code == 200) {
        for (let i = 0; i < res.data.length; i++) {
          categoryOptions.push({
            value: res.data[i].categoryId,
            label: res.data[i].categoryName,
          });
        }
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

const ruleGoodsFormRef = ref<FormInstance>();

//商品分类值
const searchInputCategory = ref<number>(0);

//商品分类
const categoryOptions = reactive([
  {
    value: 0,
    label: "请选择商品分类",
  },
]);

//步骤条
const activeSteps = ref<number>(0);

const nextBtShow = ref<boolean>(false);

// 上传图片事件
let uploadImg = (file: { file: any }) => {
  upload(file.file).then((res) => {
    if (res.status == 200) {
      if (res.data.code === "image_repeated") {
        if (activeSteps.value == 0) {
          addGoodsForm.url = res.data.images;
        } else {
          AddGoodsImgForm.push({ uid: file.file.uid, url: res.data.images });
        }
      } else {
        if (activeSteps.value == 0) {
          addGoodsForm.url = res.data.data.url;
        } else {
          AddGoodsImgForm.push({ uid: file.file.uid, url: res.data.data.url });
        }
      }
      return ElMessage({
        showClose: true,
        message: "上传成功",
        type: "success",
      });
    } else {
      ElMessage({
        showClose: true,
        message: "图床服务商出错原因是：" + res.data.message,
        type: "error",
      });
    }
  });
};

//点击查看变大的图片
const handlePictureCardPreview = (file: UploadFile) => {
  addGoodsUrl.value = file.url!;
  dialogVisibleShowImg.value = true;
};

//弹出层移除图片事件
const removeIndex = (file: UploadFile) => {
  if (activeSteps.value == 0) {
    addGoodsForm.url = "";
  } else {
    const index = AddGoodsImgForm.findIndex((val) => val.uid == file.uid);
    AddGoodsImgForm.splice(index, 1);
  }
};

//弹出层图片数量超出
const imageIndexnum = () => {
  return ElMessage({
    showClose: true,
    message: "只允许设置一张商品图片主图，先删除再上传",
    type: "error",
  });
};

//商品推荐状态
const productStatusoptions = [
  {
    value: 0,
    label: "不选择推荐",
  },
  {
    value: 1,
    label: "轮播图推荐",
  },
  {
    value: 2,
    label: "菠萝推荐",
  },
  {
    value: 3,
    label: "菠萝优选",
  },
];

const categoryIdChange = (val: number) => {
  addGoodsForm.categoryId = val;
};

const ChenckCategoryId = (_rule: any, value: any, callback: any) => {
  if (value === 0) {
    callback(new Error("请选择商品分类"));
  } else {
    if (addGoodsForm.categoryId != 0) {
      if (!ruleGoodsFormRef.value) return;
      // ruleGoodsFormRef.value.validateField("categoryId", () => null);
    }
    callback();
  }
};

const Chenckurl = (_rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("图片加载完成后,再尝试提交"));
  } else {
    if (addGoodsForm.url != "") {
      if (!ruleGoodsFormRef.value) return;
      // ruleGoodsFormRef.value.validateField("url", () => null);
    }
    callback();
  }
};

//添加商品表单验证
const addGoodsRules = reactive<FormRules>({
  productName: [
    { required: true, message: "请输入商品名称", trigger: "blur" },
    { min: 2, max: 8, message: "大小控制在  2 to 8 字节", trigger: "blur" },
  ],
  content: [
    { required: true, message: "请输入商品描述", trigger: "blur" },
    { min: 2, max: 50, message: "大小控制在  2 to 50 字节", trigger: "blur" },
  ],
  categoryId: [
    {
      required: true,
      validator: ChenckCategoryId,
      trigger: "change",
    },
  ],
  url: [
    {
      required: true,
      validator: Chenckurl,
      trigger: "change",
    },
  ],
  productStatus: [],
  productStar: [],
});

const addGoodsShow = ref<boolean>(false);
const backshow = ref<boolean>(false);

const GoodsSKuShow = ref<boolean>(true);

//#endregion

//#region 添加商品图片

const AddGoodsImgShow = ref<boolean>(false);

type GoodsImgsType = {
  uid: number;
  url: string;
};

const AddGoodsImgForm = reactive<[GoodsImgsType]>([{ uid: 0, url: "" }]);

const addGoodImgsList = ref<UploadUserFile[]>([
  {
    name: "",
    url: "",
  },
]);

const GoodImgsUrl = ref("");
const GoodImgsVisible = ref(false);

const addGoodImgsListPreview = (file: UploadFile) => {
  GoodImgsUrl.value = file.url!;
  GoodImgsVisible.value = true;
};

//#endregion

//#region  公共事件

//监听器
watch(activeSteps, (val) => {
  console.log(val);

  if (val == 0) {
    addGoodsShow.value = true;
    backshow.value = false;
    AddGoodsImgShow.value = false;
  } else if (val == 1) {
    addGoodsShow.value = false;
    AddGoodsImgShow.value = true;
    backshow.value = true;
  } else if (val == 2) {
    addGoodsShow.value = false;
    AddGoodsImgShow.value = false;
    backshow.value = true;
  }
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      if (activeSteps.value == 2) {
        return;
      }
      if (activeSteps.value == 1) {
        const index = AddGoodsImgForm.findIndex((val) => val.uid == 0);
        AddGoodsImgForm.splice(index, 1);
        console.log(addGoodsForm);
        console.log(AddGoodsImgForm);
      }
      activeSteps.value++;
    } else {
      console.log("error submit!");
    }
  });
};

const backClick = () => {
  if (activeSteps.value == 0) {
    return ElMessage({
      showClose: true,
      message: "返回到头了",
      type: "error",
    });
  } else {
    AddGoodsImgShow.value = true;
    activeSteps.value--;
  }
};

//#endregion
</script>

<style scoped>
.box-card-main {
  padding-bottom: 50px;
}
.card-header-box {
  display: flex;
  justify-content: center;
}

.card-header-footer {
  padding-top: 50px;
  display: flex;
  justify-content: center;
}
</style>
