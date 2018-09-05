(function () {
    require(dep,cb){
        let depLen = dep.length;
        //没有依赖, 直接执行cb
        if(depLen === 0){
            cb();
        }
        var required=new Array(); //已经加载过的进行存储
        for(let i=0;i<depLen;i++){
         //有依赖, 加载依赖, 依赖不重复加载, 都是使用define先定义过的

        }
    }
})()