let Ajax = require('./ajax.js')

module.exports = class ruzhu extends Ajax {
  /**
   * 商家入驻（汽贸交易/租车）
   * name 商家名称
   * logo 门店logo（一张）
   * address 地址
   * phone 联系电话
   * opentime 营业时间
   * long 经度
   * lant 维度
   * type	1、汽贸 2 、租车
   */
  add(data) {
    super.post({
      url: "api/newcar/addcar",
      data: data,
    });
  }
  /**
   * 新版汽车贸易/租车列表
   * type 1、汽贸交易 2、租车
   */
  list(data) {
    super.post({
      url: "Api/newcar/newlist",
      data: data,
    });
  }
  /**
   * 新版汽车贸易详情/租车详情
   * id
   */
  view(data) {
    super.post({
      url: "Api/newcar/details",
      data: data,
    });
  }
}