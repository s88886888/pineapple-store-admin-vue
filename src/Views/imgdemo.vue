<template>
  <div>
    <el-upload

              :http-request="up"
              multiple
              drag
              list-type="picture-card"
            >
              <el-icon><Plus /></el-icon>
            </el-upload>


  </div>
</template>

<script setup lang="ts">
import imgupload from '../api/imgupload';





const up =(file: { file: any })=>{
    imgupload(file.file);
}


</script>


<style scoped></style>
