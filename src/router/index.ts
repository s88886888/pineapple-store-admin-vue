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
 * @LastEditTime: 2023-01-20 22:03:59
 * @FilePath: \pineapple-admin-vue\src\router\index.ts
 * @Description: 菠萝电商后台管理系统
 * 
 * Copyright (c) 2023 by Linson 854700937@qq.com, All Rights Reserved. 
 */

import { createRouter, createWebHistory,RouteRecordRaw } from 'vue-router'


const routes:Array<RouteRecordRaw> = [

    {
        name: 'demo',
        path: '/',
        component: () => import('../Views/demo.vue')
    },
    {
        name: 'addGoods',
        path: '/addGoods',
        component: () => import('../Views/addGoods.vue')
    },
    {
        name: 'indexGoods',
        path: '/indexGoods',
        component: () => import('../Views/indexGoods.vue')
    },
    {
        name: 'indexImg',
        path: '/indexImg',
        component: () => import('../Views/indexImg.vue')
    },
    {
        name: 'goodsList',
        path: '/goodsList',
        component: () => import('../Views/goodsList.vue')
    },
    {
        name: 'orderList',
        path: '/orderList',
        component: () => import('../Views/orderList.vue')
    },
    {
        name: 'orderItem',
        path: '/orderItem',
        component: () => import('../Views/orderItem.vue')
    },
    {
        name: 'categoryList',
        path: '/categoryList',
        component: () => import('../Views/categoryList.vue')
    },
    {
        name: 'addCategory',
        path: '/addCategory',
        component: () => import('../Views/addCategory.vue')
    },
    {
        name: 'goodsStock',
        path: '/goodsStock',
        component: () => import('../views/goodsStock.vue')
    }



];

const router = createRouter({
    history: createWebHistory(),
    routes
})



export default router