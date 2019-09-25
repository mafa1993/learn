(function () {
//暂时不考虑文件名与name不一致, 需要config的情况
    /**
     * 引入模块的函数
     * @param deps array 依赖数组
     * @param cb 引入依赖后的回调
     */
    function require(deps,cb){
        let depLen = deps.length;
        //无依赖直接执行cb
        if(depLen === 0){
            cb();
            return ;
        }

        for(let i = 0; i < depLen ;i++){
            loadScript(deps[i])
        }
        //执行cb
        cb();
    }

    function loadScript(dep) {
        let htmlsign = document.createElement("script");
        htmlsign.setAttribute('src',dep+'.js');
        document.querySelector("body")[0].appendChild(htmlsign);
    }

    /**
     * 定义模块的函数
     * @param deps array  依赖
     * @param name string 名字, 缺省为文件名
     * @parma cb function 回调
     */
    function define(deps,name,cb){

    }
})()