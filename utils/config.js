

module.exports = {
  //ajax请求baseurl
  BASE_URL: "http://che.0556360.com/",
  //登陆失败后尝试重复登陆次数
  LOGIN_ERROR_TRY_COUNT: 5,
  //登陆失败后多长时间间隔重新发起登陆请求
  LOGIN_ERROR_TRY_TIMEOUT: 1000,
  //上传接口地址
  UPLOAD_URL: "/applet/file/upload2local.jhtml",
  //上传临时文件接口地址
  UPLOAD_TEMP_URL: "api/users/uploads",
  //小程序id
  APPID: "wx598a34393c2e44e0"
}