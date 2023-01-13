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
 * @Date: 2023-01-09 11:04:25
 * @LastEditors: Linson 854700937@qq.com
 * @LastEditTime: 2023-01-11 10:58:45
 * @FilePath: \pineapple-admin-vue\src\api\indexImg.ts
 * @Description: 菠萝电商后台管理系统
 * 
 * Copyright (c) 2023 by Linson 854700937@qq.com, All Rights Reserved. 
 */


import axios from '../utils/http'




const indexImg = {

  /**
    * @description: 查询所有
    * @param  null
    * @return: 数组
    */
  getIndexImgAll() { return axios.get('/index-img/listStatus') },

  /**
  * @description: 根据id查询一条数据
  * @param  string
  * @return: 类对象
  */
  getIndexImgByid(id: string) { return axios.get('/index-img/getId/' + id) },

  getIndexImgLikeName(name: string) { return axios.get('/index-img/likeName/' + name) },
  /**
  * @description: 根据一条ID进行删除一条数据
  * @param  string
  * @return: null
  */
  delIndexImg(id: string) { return axios.delete('/index-img/' + id) },
  /**
  * @description: 根据id进行修改数据
  * @param  Array
  * @return: null
  */
  putIndexImg(params:{}) { return axios.put('/index-img/', params) },
  putIndexImgById(id:string) { return axios.put('/index-img/'+id) },
  PostIndexImgById(params:{}) { return axios.post('/index-img/', params) },


}



export default indexImg





