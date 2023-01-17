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
 * @Date: 2023-01-11 12:59:21
 * @LastEditors: Linson 854700937@qq.com
 * @LastEditTime: 2023-01-18 03:15:28
 * @FilePath: \pineapple-admin-vue\src\api\categoryList.ts
 * @Description: 菠萝电商后台管理系统
 * 
 * Copyright (c) 2023 by Linson 854700937@qq.com, All Rights Reserved. 
 */



import axios from '../utils/http'




const categoryList = {
    /**
     * @description: 获取全部分页数据
     * @param {*} param
     * @return {*}
     */
    getcategoryList(param: {}) { return axios.get('/category/List', param) },


    /**
 * @description: 根据ID获取
 * @param {*} param
 * @return {*}
 */
    getcategoryById(id: string) { return axios.get('/category/getId/' + id) },


    /**
 * @description: 获取全部分页数据
 * @param {*} param
 * @return {*}
 */
    getcategoryListByLevel(param: {}) { return axios.get('/category/getlistByLevel', param) },

    /**
     * @description: 分页获取数据
     * @param {*} param
     * @return {*}
     */
    getcategoryListPage(param: {}) { return axios.get('/category/SelectPage', param) },

    /**
     * @description: 修改方法
     * @return {*}
     */
    putcategoryList(param: {}) { return axios.put('/category/', param) },

    /**
 * @description: 增加一条新数据
 * @return {*}
 */
    postCategory(param: {}) { return axios.post('/category/', param) },

    /**
     * @description: 删除一条数据
     * @param {*} param
     * @return {*}
     */
    delCategory(id: String) { return axios.delete('/category/' + id) }



}



export default categoryList





