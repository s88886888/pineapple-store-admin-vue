/*
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
 * @Date: 2023-01-09 04:40:43
 * @LastEditors: Linson 854700937@qq.com
 * @LastEditTime: 2023-01-27 03:27:44
 * @FilePath: \pineapple-admin-vue\src\main.ts
 * @Description: 菠萝电商后台管理系统
 * 
 * Copyright (c) 2023 by Linson 854700937@qq.com, All Rights Reserved. 
 */

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
//vue-router 路由导入
import router from './router/index.js'
//Element-Plus 路由导入
import ElementPlus from 'element-plus'
//Element-Plus CSS 样式路由导入
import 'element-plus/dist/index.css'
//Element-Plus icons 图标库路由导入
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//导入axios 都怪vue3没有this了
// 1、axios是基于promise的HTTP库，可以使用在浏览器和node.js中，它不是vue的第三方插件
// 2、axios使用的时候不能像vue的插件（如：Vue-Router、VueX等）通过Vue.use()安装插件，需要在原型上进行绑定：Vue.prototype.$axios = axios;
// 3、vue-axios是axios集成到Vue.js的小包装器，可以像插件一样安装:Vue.use(vueAxios);
import VueAxios from 'vue-axios'
import axios from "axios";
import locale from "element-plus/lib/locale/lang/zh-cn";//饿了么ui中文
import store from './store/index'


const app = createApp(App)
app.use(router)
app.use(ElementPlus,{locale})
app.mount('#app')
app.use(VueAxios, axios)
app.use(store)


//axios 全局注册
app.config.globalProperties.$axios = axios;



//设置axios请求的地址默认
// axios.defaults.baseURL = "/api";

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}