let Ajax = require('./ajax.js')

module.exports = class first extends Ajax {
  /**
   * 商城首页
   */
  do(data) {
    super.get({
      url: "api/home/index",
      data: data,
    });
  }
  /**
   * 商城首页
   */
  nav(data) {
    super.post({
      url: "api/home/shield",
      data: data,
    });
  }
}