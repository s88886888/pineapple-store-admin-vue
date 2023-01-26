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
 * @Date: 2023-01-17 18:45:12
 * @LastEditors: Linson 854700937@qq.com
 * @LastEditTime: 2023-01-23 19:17:56
 * @FilePath: \pineapple-admin-vue\src\views\addCategory.vue
 * @Description: 菠萝电商后台管理系统
 * 
 * Copyright (c) 2023 by Linson 854700937@qq.com, All Rights Reserved. 
 -->

<template>
  <el-card class="box-card-fa">
    <el-card class="box-card">
      <div class="box-card-main">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"

          class="demo-ruleForm"
          :size="size"
        >
          <el-form-item
            v-if="categoryId != null"
            label="分类编号"
            prop="categoryId"
          >
            <el-input
              v-model="ruleForm.categoryId"
              disabled
              autocomplete="off"
            />
          </el-form-item>

          <el-form-item label="分类名称" prop="categoryName">
            <el-input v-model="ruleForm.categoryName" autocomplete="off" />
          </el-form-item>

          <el-form-item label="分类等级" prop="categoryLevel">
            <el-select
              v-model="categoryLevel"
              class="m-2"
              placeholder="请选择分类等级"
              @change="categoryLevelChange"
            >
              <el-option
                v-for="item in LevelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="上级分类" prop="">
            <el-select
              v-model="categoryParentId"
              class="m-2"
              placeholder="请选择上级分类"
              :disabled="ParentIdShow"
              filterable
            >
              <el-option
                v-for="item in categoryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="分类图片" prop="">
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

          <el-form-item label="轮播推荐" prop="status">
            <el-tooltip
              :content="'轮播图推荐的分类数量不能超过10个'"
              placement="top"
            >
              <el-switch
                v-model="ruleForm.categoryStar"
                style="
                  --el-switch-on-color: #13ce66;
                  --el-switch-off-color: #ff4949;
                "
                :active-value="1"
                :inactive-value="0"
              />
            </el-tooltip>
          </el-form-item>
 
          <el-form-item label="菠萝推荐" prop="status">
            <el-tooltip :content="'菠萝推荐和轮播不能同时进行'" placement="top">
              <el-switch
                v-model="ruleForm.categoryStar"
                style="
                  --el-switch-on-color: #13ce66;
                  --el-switch-off-color: #ff4949;
                "
                :active-value="2"
                :inactive-value="0"
              />
            </el-tooltip>
          </el-form-item>

          <el-form-item label="分类简介" prop="categorySlogan">
            <el-input
              v-model="ruleForm.categorySlogan"
              autocomplete="off"
              type="textarea"
            />
          </el-form-item>

          <el-form-item>
            <div class="btnClick">
              <el-button
                v-if="categoryId != null"
                type="primary"
                @click="submitForm(ruleFormRef, true)"
                >编辑</el-button
              >

              <el-button
                v-else
                type="primary"
                @click="submitForm(ruleFormRef, false)"
                >创建</el-button
              >

              <el-button class="rbtn" @click="resetForm(ruleFormRef)"
                >重置</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </el-card>
</template>

<script setup lang="ts">
import { reactive, ref, watch, onMounted } from "vue";
import {
  FormInstance,
  ElMessage,
  UploadFile,
  UploadUserFile,
} from "element-plus";
import categoryList from "../api/categoryList";
import upload from "../api/upload";
import { useRoute } from "vue-router";

const Route = useRoute();
const size = ref("large");
const categoryLevel = ref(1);
const categoryId = ref();

onMounted(() => {
  fileList.value.splice(0);
  categoryId.value = Route.query.categoryId;
});

const categoryLevelChange = (val: number) => {
  ruleForm.categoryLevel = val;
};

const ParentIdShow = ref<boolean>(true);
watch(categoryLevel, (val) => {
  if (val == 1) {
    ParentIdShow.value = true;
  } else {
    let num = 0;
    if (val == 2) {
      num = 1;
    } else {
      num = 2;
    }
    ParentIdShow.value = false;
    categoryList.getcategoryListByLevel({ Level: num }).then((res) => {
      if (res.code == 200) {
        categoryOptions.splice(0);
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
    });

    ParentIdShow.value = false;
  }
});

watch(categoryId, (val) => {
  if (val != undefined) {
    categoryList.getcategoryById(val).then((res) => {
      if (res.code == 200) {
        ruleForm.categoryId = res.data.categoryId;
        ruleForm.parentId = res.data.parentId;
        if (res.data.categoryImg != null) {
          ruleForm.categoryImg = res.data.categoryImg;
          fileList.value.push({
          name: res.data.categoryName,
          url: res.data.categoryImg,
        });
        }

        ruleForm.categoryName = res.data.categoryName;
        ruleForm.categorySlogan = res.data.categorySlogan;
        ruleForm.categoryStar = res.data.categoryStar;
        ruleForm.categoryLevel = res.data.categoryLevel;

        categoryLevel.value = res.data.categoryLevel;
        categoryParentId.value = res.data.parentId;



      } else {
        return ElMessage({
          showClose: true,
          message: res.msg,
          type: "error",
        });
      }
    });
  }
});

//点击上传的图片变大
const dialogVisibleShowImg = ref(false);

//上传事件的照片地址
const dialogImageUrl = ref("");

//点击查看变大的图片
const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  dialogVisibleShowImg.value = true;
};

// 上传图片事件
let uploadImg = (file: { file: Blob }) => {
  upload(file.file).then((res) => {
    if (res.status == 200) {
      if (res.data.code === "image_repeated") {
        ruleForm.categoryImg = res.data.images;
      } else {
        ruleForm.categoryImg = res.data.data.url;
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

//弹出层图片数量超出
const imageIndexnum = () => {
  return ElMessage({
    showClose: true,
    message: "只允许存在一张图片，先删除再上传",
    type: "error",
  });
};

//弹出层移除图片事件
const removeIndex = () => {};

const fileList = ref<UploadUserFile[]>([
  {
    name: "",
    url: "",
  },
]);

const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  categoryId: 0,
  categoryName: "",
  categoryLevel: 0,
  parentId: 0,
  categorySlogan: "",
  categoryStar: 0,
  categoryImg: "",
});

const rules = reactive({
  categoryName: [
    { required: true, message: "请输入分类名称", trigger: "blur" },
    { min: 2, max: 5, message: "大小控制在2-5字节", trigger: "blur" },
  ],
  categorySlogan: [
    { required: true, message: "请输入分类简介", trigger: "blur" },
    { min: 2, max: 50, message: "大小控制在3-50字节", trigger: "blur" },
  ],
  categoryImg: [{ trigger: "blur" }],
});

const LevelOptions = [
  {
    value: 1,
    label: "一级分类",
  },
  {
    value: 2,
    label: "二级分类",
  },
  {
    value: 3,
    label: "三级分类",
  },
];

const categoryParentId = ref<number>();

const categoryOptions = reactive([
  {
    value: 0,
    label: "未选择上级分类",
  },
]);

const submitForm = (formEl: FormInstance | undefined, type: boolean) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if (type) {
        categoryList.putcategoryList(ruleForm).then((res) => {
          if (res.code == 200) {
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
        categoryList.postCategory(ruleForm).then((res) => {
          if (res.code == 200) {
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
      }
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  ParentIdShow.value = true;
  categoryParentId.value = 0;
  ruleForm.categoryStar = 0;
  categoryLevel.value = 1;
  formEl.resetFields();
};
</script>

<style scoped>
.box-card-main {
  display: flex;
  justify-content: center;
}
.btnClick {
  width: 150px;
  margin: 0 auto;
}
.box-card-fa {
  margin-bottom: 50px;
}
</style>
