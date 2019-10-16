self.addEventListener('install',e=>{
    //waitUntil接收一个promise对象，直到这个promise对象完成后，才继续后面的执行，不然promise异步，直接执行了后面的操作
    e.waitUntil(
        caches.open('app-v1') //caches为CacheStorage对象，打开app-v1这个缓存
        .then(cache=>{
            console.log('open cache');
            return cache.addAll([  //向cacheStorage里添加这两个文件的缓存
                './app.js',
                //'index.html',// 缓存这个html页面，不加html会走网络
                './main.css'
            ])
        
        })
    )
})

//利用fetch方法，进行请求拦截
self.addEventListener('fetch',e=>{
    e.respondWith( //fetch的响应替换
        //e.request即为请求的每个url，如果匹配到，match方法为检查caches里面元素的key是否有和erequest匹配的
        caches.match(e.request).then(res=>{
            if(res){
                //缓存中存在
                return res;
            }else{
                console.log('e.result',e.result);
                //缓存中不存在，自行请求
                fetch(e.result,{credentials:'same-origin'})
                .then(res=>{
                    if(res){
                        //请求到了，添加到cache中
                        caches.open('a0pp-v1').then(function(cache) {
                            cache.put(e.request, res); //添加到缓存
                          });
                    }else{
                        //没请求道，返回错误
                    }
                })

            }
        })
    )
})