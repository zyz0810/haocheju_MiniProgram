let Ajax = require('./ajax.js')

module.exports = class Member extends Ajax {
  /**
   * 登陆接口
   * @param String js_code wx.login获得
   * @param Number cid 1
   */
  login(data) {
    super.post({
      url: 'applet/login.jhtml',
      hideErrorTip: true,
      data: data
    })
  }

  /**
   * 绑定手机
   * phonenum 手机号
   * captcha 验证码
   * userId 用户Id
   */
  bindMobile(data) {
    super.post({
      url: 'api/users/bindPhone',
      data: data
    })
  }

  /**
   * 用户信息
   * userId 用户ID
   */
  view(data) {
    super.post({
      url: 'api/users/center',
      data: data
    })
  }




  /**
   * 修改用户信息
   * userId 用户ID
   * phonenum 手机号
   * nickname 用户名
   * sex 性别  1、男 2、女
   * signature 签名
   */
  edit(data) {
    super.post({
      url: "api/users/edit",
      data: data
    })
  }

  /**
   * 发短信
   * phonenum 手机号
   */
  getCode(data) {
    super.post({
      url: "api/code/getcode",
      data: data
    })
  }

  /**
   * 实名认证
   * username 姓名
   * idcard 身份证
   * userId 用户Id
   */
  autonym(data) {
    super.post({
      url: "api/illegal/autonym",
      data: data
    })
  }

  /**
   * 实名认证
   * type 1、新车 2、二手车
   */
  collection(data) {
    super.post({
      url: "api/collect/user",
      data: data
    })
  }

  /**
   * 添加车商
   *    userId 用户Id
   *    providername 车商名字
   *    prividerperson 联系人
   *    address 公司地址
   *    position 职位
   *    phone 手机号
   *    logo logo
   *    images 门面图
   *    license 营业执照
   *    name 账号（只能是英文或数字）
   */
  dealer(data) {
    super.post({
      url: "api/provider/add",
      data: data
    })
  }



  /**
   * 上传图片
   *    file 文件名
   */
  uploads(data) {
    super.post({
      url: 'api/users/uploads',
      data: data
    });
  }

  /**
   * 分享
   *    url 当前页面路径
   */
  shareApi(data) {
    super.post({
      url: 'api/share/index',
      data: data
    })
  }

  /**
   * 保险
   *    carno 车牌号
   *    mobile 手机号
   */
  insuranceAdd(data) {
    super.post({
      url: 'api/insurance/add',
      data: data
    })
  }

  /**
   * 检验验证码
   *    phonenum
   *    code
   */
  getcodeCheck(data) {
    super.post({
      url: 'api/code/ckeckCode',
      data: data
    })
  }

  /**http://che.0556360.com/api/index/wxusers?code=0114lvtS1LYku41qlbuS1Q2ctS14lvt6&from=844b&vit=fps
   * 微信获取用户信息
   *    code 微信code
   */
  wxLogin(data) {
    super.post({
      url: 'api/index/wxusers',
      data: data
    })
  }

  /**
   * 获取当前页面url
   *    url 当前页面url
   */
  wxUrl(data) {
    super.post({
      url: 'api/share/wxurl',
      data: data
    })
  }
  /**
   * 建议反馈
   *    phone 手机号
   *    images 图片
   *    content 内容
   *    userId 用户Id
   */
  feedback(data) {
    super.post({
      url: 'api/feedback/index',
      data: data
    })
  }


}