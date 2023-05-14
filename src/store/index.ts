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
 * @Date: 2023-01-27 01:27:01
 * @LastEditors: Linson 854700937@qq.com
 * @LastEditTime: 2023-01-27 02:14:08
 * @FilePath: \pineapple-admin-vue\src\store\index.ts
 * @Description: 菠萝电商后台管理系统
 * 
 * Copyright (c) 2023 by Linson 854700937@qq.com, All Rights Reserved. 
 */


import { createStore } from 'vuex' // 引入useStore 方法

export default createStore({
    state: {
        visitedView: [{
            name: "Home",
            fullPath: "/",
            path: "/",
            meta: { keepAlive: false, title: '首页' },
            query: ''
        }],
        num: 0,
        routerName: "",

        //用户访问过的页面，默认第一个标签为首页
    },
    mutations: {
        //用户访问过的页面
        addVisitedView(state, view) {
            if (state.visitedView.some(v => v.path === view.path)) return
            state.visitedView.push(view)
        },
        //关闭用户访问过的页面
        delVisitedView(state, view) {
            for (const [i, v] of state.visitedView.entries()) {
                if (v.path === view.path) {
                    state.visitedView.splice(i, 1)
                    break
                }
            }
        },
        setRouterName(state, value) {
            state.routerName = value;
        }
    },
    actions: {},
    modules: {},
    getters: {
        getRouteInfo(state) {
            return state.visitedView
        },
        getRouterName(state) {
            return state.routerName
        }
    }
})
