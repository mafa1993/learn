if(navigator.serviceWorker){
    //scope配置作用域，这里指定为./ 当前目录下的，都会走service worker 包括 index.html这个文件本身
    navigator.serviceWorker.register('./msg_sw.js',{scope:"./"})//注册service workder
    .then(e=>{
        console.log(e)
    })
    .catch(e=>{
        console.warn('error',e)
    })
}else{
    throw new Error('service workder');
}