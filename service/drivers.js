let Ajax = require('./ajax.js')
let config = require('../utils/config.js')

module.exports = class Order extends Ajax {
  /**
   * 驾校banner及列表
   * page 页码
   * pageSize 一页几条数据
   */
  list(data) {
    super.post({
      url: "api/drive/drivelist",
      data: data
    });
  }

  /**
   * 资讯页banner及列表
   * id 驾校id
   */
  view(data) {
    super.post({
      url: "api/drive/detail",
      data: data,
      success: this.fn
    });
  }

  /**
   * 违章查询
   * carno 车牌号
   * engineno 发动机号
   * vin 车架号
   */
  violation(data) {
    super.post({
      url: 'Api/Illegal/index',
      data: data,
      success: this.fn,
    });
  }
  /**
   * 提交年审
   * name 名字
   * mobile 手机号
   * carno 车牌号
   * caraddress 地址
   * caryear 年限
   */
  examination(data) {
    super.post({
      url: 'api/careful/caryear',
      data: data
    });
  }
}