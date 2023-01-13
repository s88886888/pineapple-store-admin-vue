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







const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
app.use(VueAxios, axios)

//axios 全局注册
app.config.globalProperties.$axios = axios;



//设置axios请求的地址默认
// axios.defaults.baseURL = "/api";

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}