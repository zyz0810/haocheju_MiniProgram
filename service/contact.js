let Ajax = require('./ajax.js')
let config = require('../utils/config.js')

module.exports = class Order extends Ajax {
  /**
   * 说说列表
   * pageSize 页大小
   * pageNumber 页号
   */
  list(data) {
    super.post({
      url: "Api/Circle/index",
      data: data
    });
  }

  /**
   * 发表动态
   * images[{file 文件}]  图片集合
   * content  发布内容
   * userId  会员ID
   */
  uploadImg(data) {
    super.post({
      url: "Api/Circle/pullcircle",
      data: data,
      contentType: false,
      processData: false,
      success: this.fn
    });
  }

  /**
   * 点赞
   * pid     说说ID
   * userId  用户ID
   */
  liked(data) {
    super.post({
      url: 'Api/Circle/spot',
      data: data,
      success: this.fn,
    });
  }

  /**
   * 点赞
   * pauthor 被回复者
   * author  回复者
   * cid     说说Id
   * conmment评论内容
   */
  reply(data) {
    super.post({
      url: 'api/circle/issue',
      data: data

    });
  }
}