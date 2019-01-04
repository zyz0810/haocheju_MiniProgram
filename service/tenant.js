let Ajax = require('./ajax.js')

module.exports = class Tenant extends Ajax {

  /**
   * 汽贸交易列表
   * page 页码
   * pageSize  一页几条数据
   */
  list(data) {
    super.post({
      url: 'api/newcar/index',
      data: data
    });
  }

  /**
   * 商家首页二手车列表
   * page 页码
   */
  usedCar(data) {
    super.post({
      url: 'Api/Provider/oldindex',
      data: data
    });
  }

  /**
   * 商家首页新车列表
   * providerid 商家Id
   * page 页码
   */
  newCar(data) {
    super.post({
      url: 'Api/Provider/newindex',
      data: data
    });
  }


  /**
   * 二手车区列表
   * providerid 商家Id
   * page 页码
   */
  usedList(data) {
    super.post({
      url: 'Api/Oldcar/index',
      data: data
    });
  }
}