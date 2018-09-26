let Ajax = require('./ajax.js')

module.exports = class Tenant extends Ajax {


    /**
     * 商家详情
     * id 店铺ID
     * lat 纬度
     * lng 经度
     */
    view(data) {
        super.get({
            url:  'applet/tenant/view.jhtml',
            data: data,
            hideErrorTip: true,
        });
    }

    /**
     * 优惠买单分享
     * id 商家Id
     */
    offerToPayShare(data) {
        super.get({
            url:'applet/tenant/offerToPay/share.jhtml',
            data:data
        });
    }


    /**
     * 获取商家商品分类
     * tenantId 店铺Id
     */
    productCategory(data) {
        super.get({
            url:  'applet/productCategoryTenant/all.jhtml',
            data: data
        });
    }

    /**
     * 获取商家商品分类(树形结构)
     * tenantId 店铺Id
     */
    productCategoryTree(data) {
        super.get({
            url:  'applet/productCategoryTenant/alll.jhtml',
            data: data
        });
    }

    /**
     * 获取商家商品分类
     * tenantId 店铺Id
     */
    productCategoryRoot(data) {
        super.get({
            url:  'applet/productCategoryTenant/roots.jhtml',
            data: data
        });
    }
    /**
     * 是否全部一级分类
     * tenantId 店铺Id
     */
    allFirstGrade(data) {
        super.get({
            url:  'applet/productCategoryTenant/allFirstGrade.jhtml',
            data: data
        })
    }

    /**
     * 获取商家门店列表
     * id 店铺Id
     * pageSize 每页记录数
     * pageNumber页码
     */
    deliveryCenterList (data) {
        super.get({
            url:  'applet/tenant/deliveryCenter/list.jhtml',
            data: data
        });
    }

    /**
     * 获取商家门店列表
     * ids 店铺Id（数组）
     * pageSize 每页记录数
     * pageNumber页码
     */
    deliveryCenterLists(data) {
        super.get({
            url:  'applet/tenant/deliveryCenter/lists.jhtml',
            data: data
        });
    }



    /**
     * 添加店铺到收藏
     * id 店铺Id
     */
    favorite(data) {
        super.post({
            url:'applet/member/favorite/tenant/add.jhtml',
            data:data
        });
    }

    /**
     * 取消店铺收藏
     * id 店铺ID
     */
    delFavorite(data) {
        super.post({
            url:'applet/member/favorite/tenant/delete.jhtml',
            data:data
        });
    }

    /**
     * 店铺软文
     * id 店铺Id
     */
    article(data) {
      super.get({
        url:'applet/tenant/article.jhtml',
        data: data,
      });
    }


    /**
     * 进店成为会员
     * id 店铺Id
     * extension  推广人
     */
    becomeVip(data) {
        super.post({
            url:'applet/tenant/becomeVip.jhtml',
            data: data,
            hideErrorTip: true
        });
    }



}