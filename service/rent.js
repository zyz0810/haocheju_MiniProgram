let Ajax = require('./ajax.js')
let config = require('../utils/config.js')

module.exports = class Order extends Ajax {
 /**
     * 租车门店列表
     * @param page 页码
     * @param pageSize  一页几条数据
     */
  tenant(data) {
    super.post({
      url: "api/provider/lists",
      data: data
    });
  }

  /**
     * 租车列表
     * @param providerid  门店ID
     */
  car(data) {
    super.post({
      url: "api/provider/rent",
      data: data,
      success: this.fn
    });
  }
 /**
     * 预约租车
     * @param name  名字
     * @param mobile  手机号
     * @param ordercar  格式 服务商---车品牌--车系
     * @param day  天数
     * @param price  价格
     * @param start  借车日期
     * @param end  还车日期
     * @param carid 车子Id
     */
  orderrent(data) {
    super.post({
      url: 'api/provider/orderrent',
      data: data,
      success: this.fn,
    });
  }
   /**
     * 代驾
     * @param mobile  手机号
     * @param start  出发地
     * @param end  目的地
     * @param datetime 出发时间 如 2018-12-12 8：30
     */
  driver(data) {
    super.post({
      url: 'api/drive/order',
      data: data
    });
  }
}