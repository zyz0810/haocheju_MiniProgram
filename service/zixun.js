let Ajax = require('./ajax.js')

module.exports = class zixun extends Ajax {
    /**
     * 资讯页banner及列表
     * page 页码
     */
    list(data) {
        super.post({
          url:"Api/Home/newList",
            data: data
        });
    }
    /**
     * 资讯页banner及列表
     * id 资讯id
     */
    view(data) {
        super.post({
            url:"Api/Home/newAjax",
            data: data
        });
    }

}