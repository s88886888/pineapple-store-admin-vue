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
 * @Date: 2023-01-09 04:44:37
 * @LastEditors: Linson 854700937@qq.com
 * @LastEditTime: 2023-05-16 16:15:02
 * @FilePath: \pineapple-store-admin-vue\src\router\index.ts
 * @Description: 菠萝电商后台管理系统
 * 
 * Copyright (c) 2023 by Linson 854700937@qq.com, All Rights Reserved. 
 */

import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [

  {
    name: 'home',
    path: '/',
    meta: {
      title: '面板',
    },
    component: () => import('../views/home.vue')
  },
  {
    name: 'indexImg',
    path: '/indexImg',
    meta: {
      title: '轮播图管理',
    },
    component: () => import('../views/indexImg.vue')
  },
  {
    path: '/goodsList',
    name: 'goodsList',
    meta: {
      title: '商品管理',
    },
    component: () => import('../views/goodsList.vue'),
  },

  {
    name: 'addGoods',
    path: '/addGoods',
    meta: {
      title: '添加商品',
    },
    component: () => import('../views/addGoods.vue')
  },
  {
    name: 'updateGoods',
    path: '/updateGoods',
    meta: {
      title: '更新商品',
    },
    component: () => import('../views/updateGoods.vue')
  },
  {
    name: 'orderList',
    path: '/orderList',
    meta: {
      title: '订单管理',
    },
    component: () => import('../views/orderList.vue')
  },
  {
    name: 'orderItem',
    path: '/orderItem',
    meta: {
      title: '订单详细',
    },
    component: () => import('../views/orderItem.vue')
  },
  {
    name: 'categoryList',
    path: '/categoryList',
    meta: {
      title: '分类管理',
    },
    component: () => import('../views/categoryList.vue')
  },
  {
    name: 'goodsStock',
    path: '/goodsStock',
    meta: {
      title: '商品库存',
    },
    component: () => import('../views/goodsStock.vue')
  },
  {
    name: 'addCategory',
    path: '/addCategory',
    meta: {
      title: '订单详细',
    },
    component: () => import('../views/addCategory.vue')
  },
  {
    name: 'delivergoodslist',
    path: '/deliverGoodsList',
    meta: {
      title: '发货管理',
    },
    component: () => import('../views/deliverGoodsList.vue')
  },
  {
    name: 'returnOrder',
    path: '/returnOrder',
    meta: {
      title: '退货管理',
    },
    component: () => import('../views/returnOrder.vue')
  },
  {
    name: 'user',
    path: '/user',
    meta: {
      title: '用户管理',
    },
    component: () => import('../views/user.vue')
  },
  {
    name: 'imgdemo',
    path: '/imgdemo',
    meta: {
      title: '图片测试',
    },
    component: () => import('../views/imgdemo.vue')
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})



// 全局守卫：登录拦截 本地没有存token,请重新登录
router.beforeEach((to, from, next) => {
  // 判断有没有登录
  if (!localStorage.getItem('token')) {
    if (to.name === "home") {
      next();
    } else {
      router.push('/')
    }
  } else {
    next();
  }
});



export default router