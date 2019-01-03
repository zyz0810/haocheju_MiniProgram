let Ajax = require('./ajax.js')

module.exports = class cars extends Ajax {
  /**
   * 汽贸交易列表
   * @param page 页码
   * @param pageSize 一页几条数据
   */
  newList(data) {
    super.post({
      url: "api/newcar/index",
      data: data
    });

  }
  /**
   * 二手车列表
   * @param page 页码
   * @param pageSize 一页几条数据
   * brandname  传0
   * price 传0
   * type 传0
   */
  usedList(data) {
    super.post({
      url: "api/oldcar/index",
      data: data
    });

  }
  /**
   * 获取车系
   * @param carId 车系Id
   */
  usedCommend(data) {
    super.post({
      url: 'api/oldcar/lists',
      data: data
    });

  }
  /**
   * 获取车系
   * @param carId 车系Id
   */
  mode(data) {
    super.post({
      url: 'Api/Brandlist/cartype',
      data: data
    });

  }
  /**
  * 获取品牌
  */
  brand(data) {
    super.post({
      url: 'api/brandlist/first',
      data: data
    });

  }
  /**
     * 新车详情
     * @param id 新车Id
     * @param userId  用户Id
     */
  newView(data) {
    super.post({
      url: 'Api/Newcar/detail',
      data: data
    });

  }
  /**
    * 二手车详情
    * @param id 二手车Id
    * @param userId  用户Id
    */
  usedView(data) {
    super.post({
      url: 'api/oldcar/detail',
      data: data
    });

  }
  /**
     * 收藏车辆
     * @param userId 用户Id
     * @param productId  车Id
     * @param type  1、新车 2、二手车
     */
  favorite(data) {
    super.post({
      url: 'Api/Collect/pullcollect',
      data: data
    });

  }
  /**
     * 取消收藏车辆
     * @param 	cid 收藏ID
     */
  delFavorite(data) {
    super.post({
      url: 'Api/Collect/cancelcollect',
      data: data
    });

  }
  /**
     * 新车预约详情
     * @param 	productId 车Id
     */
  subscribeNew(data) {
    super.post({
      url: 'Api/Newcar/newcontent',
      data: data
    });

  }
  /**
     * 二手车预约详情
     * @param 	productId 车Id
     */
  subscribeOld(data) {
    super.post({
      url: 'Api/Oldcar/oldcontent',
      data: data
    });

  }
 /**
     * 预约车辆
     * @param 	username 姓名
     * phonenum 手机号
     * type 1、新车 2、二手车
     * productId 车子Id
     */
  subscribe(data) {
    super.post({
      url: 'api/subscribe/pull',
      data: data
    });

  }
  /**
     * 拼车列表
     * @param page  页码
     * @param type  1、车找人 2人找车
     */
  carPool(data) {
    super.post({
      url: 'Api/Carpool/poollist',
      data: data
    });

  }
  /**
     * 拼车详情
     * @param id
     */
  carpoolDetail(data) {
    super.post({
      url: 'api/carpool/detail',
      data: data
    });

  }
 /**
     * 拼车表单
     * @param type  、车找人 2 人找车
     */
  pullpool(data) {
    super.post({
      url: 'Api/Carpool/pullpool',
      data: data
    });

  }
}