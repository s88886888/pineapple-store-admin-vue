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
 * @LastEditTime: 2023-01-21 00:29:20
 * @FilePath: \pineapple-admin-vue\src\api\goodsstock.ts
 * @Description: 菠萝电商后台管理系统
 * 
 * Copyright (c) 2023 by Linson 854700937@qq.com, All Rights Reserved. 
 */



import axios from '../utils/http'




const goodsstock = {
   /**
    * @description: 获取全部分页数据
    * @param {*} param
    * @return {*}
    */
   getGoodsSkuPage(param: {}) { return axios.get('/product-sku/page/', param) },

   /**
    * @description: 分页模糊查询
    * @param {*} param
    * @return {*}
    */
   getGoodsSkuLikePage(param: {}) { return axios.get('/product-sku/Like-page/', param) },

   /**
    * @description: Id获取一条数据
    * @param {*} param
    * @return {*}
    */
   getGoodsSkuById(param: {}) { return axios.get('/product-sku/getId/', param) },




   putGoodsSkuStock(data: {}) { return axios.put('/product-sku/updateStock/', data) },

   delGoodsSkuStock(data: {}) { return axios.delete('/product-sku/delete/', data) },



}



export default goodsstock





