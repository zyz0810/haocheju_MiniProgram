let Ajax = require('./ajax.js')
let config = require('../utils/config.js')

module.exports = class Order extends Ajax {
  /**
   * 汽车人才banner及列表
   * page 页码
   * pageSize 一页几条数据
   */
  list(data) {
    super.post({
      url: "Api/Invite/joblist",
      data: data
    });
  }

  /**
   * 招聘详情
   * id 资讯id
   */
  view(data) {
    super.post({
      url: "Api/Invite/findjob",
      data: data,
      success: this.fn
    });
  } 

  /**
   * 发布简历
   */
  addjob(data) {
    super.post({
      url: '/api/invite/addjob',
      data: data,
      success: this.fn,
    });
  }

  /**
   * 道路救援
   * page 页码
   * pageSize  一页几条数据
   */
  road(data) {
    super.post({
      url: 'api/road/roadlist',
      data: data

    });
  }
}