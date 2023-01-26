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
 * @Date: 2023-01-09 11:03:39
 * @LastEditors: Linson 854700937@qq.com
 * @LastEditTime: 2023-01-15 20:40:34
 * @FilePath: \pineapple-admin-vue\src\utils\request.ts
 * @Description: 菠萝电商后台管理系统
 * 
 * Copyright (c) 2023 by Linson 854700937@qq.com, All Rights Reserved. 
 */



import axios from 'axios'


const request = axios.create({
  baseURL: '/api',
  timeout: 2000
})




// 请求拦截器
request.interceptors.request.use(config => {
  // 统一设置用户身份 token



  if (localStorage.token) {

    typeof config.headers?.set === 'function' &&
      config.headers.set('Authorization', "window.sessionStorage.getItem('token')")

  }
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
  
})

// 相应拦截器
request.interceptors.response.use(response => {
  // 统一设置接口相应错误, 比如 token 过期失效, 服务端异常
  return response.data
}, error => {
  const { status } = error.response
  if (status === 401) { // token失效
    // this.$Message.error('token失效，请重新登录')
    // 清除token
    localStorage.removeItem('loginToken')
    // router.push('/')
  }
  return Promise.reject(error)
})

export default request
