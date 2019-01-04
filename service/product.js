let Ajax = require('./ajax.js')

module.exports = class Product extends Ajax {
  /**
   * 商品页banner及列表
   * page 页码
   * type 1、维修保养 2、用品配车 3、汽保设备 4、美容装饰
   * flag 1、是否是优惠商品
   */
  list(data) {
    super.post({
      url: 'api/shop/index',
      data: data
    });
  }

  /**
   * 商品页详情
   * id 商品id
   */
  view(data) {
    super.post({
      url: 'api/shop/detail',
      data: data

    });
  }
}