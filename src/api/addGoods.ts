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
 * @LastEditTime: 2023-01-12 19:14:45
 * @FilePath: \pineapple-admin-vue\src\api\goodList.ts
 * @Description: 菠萝电商后台管理系统
 * 
 * Copyright (c) 2023 by Linson 854700937@qq.com, All Rights Reserved. 
 */



import axios from '../utils/http'




const addGoods = {

    /**
      * @description: 查询分页查询
      * @param  null
      * @return: 数组
      */

    getGoodListPage(param: {}) { return axios.get('/product/getList', param) },



    /**
     * @description: 查询所有分类
     * @param {*} param
     * @return {*}
     */
    getCategoryList(param: {}) { return axios.get('/category/List', param) },

    /**
     * @description: 根据id查询多张图片
     * @param {*} param
     * @return {*}
     */
    getImgbyId(id: string) { return axios.get('/product/getImgLisbyId/' + id) },




    getGoodListLike(param: {}) { return axios.get('/product/getProductName/' + name, param) },
    /**
    * @description: 根据一条ID进行删除一条数据
    * @param  string
    * @return: null
    */
    delGoodList(id: string) { return axios.delete('/product/' + id) },
    /**
    * @description: 根据id进行修改数据
    * @param  Array
    * @return: null
    */
    putGoodList(params: {}) { return axios.put('/product/', params) },

    putGoodListById(data:{}) { return axios.put('/product/updateStatus', data) },

    PostGoodListById(params: {}) { return axios.post('/index-img/', params) },


}



export default addGoods





