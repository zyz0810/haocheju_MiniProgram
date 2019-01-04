let Ajax = require('./ajax.js')
let config = require('../utils/config.js')

module.exports = class Order extends Ajax {
  /**
   * 加入购物车（点击立即购买）
   * @param gid  商品ID
   * @param uid  用户ID
   * @param money 总价
   * @param cost 支付价格
   * @param discount 折扣价
   */
  add(data) {
    super.post({
      url: "api/order/orders",
      data: data
    });
  }

  /**
   * 订单详情
   * trade_no 订单号
   */
  detail(data) {
    super.post({
      url: "api/order/paydetail",
      data: data,
      success: this.fn
    });
  }

  /**
   * 微信支付
   */
  pay(data) {
    super.post({
      url: 'api/pay/wxpay',
      data: data,
      success: this.fn,
    });
  }

  /**
   * 我的订单列表
   * userId  用户Id
   * type 1、未支付 2、已经付 3、未核销 3、已核销 4、已完成
   */
  list(data) {
    super.post({
      url: 'api/order/lists',
      data: data

    });
  }
}