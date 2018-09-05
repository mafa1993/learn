var files = [
	"index.js"
];
self.addEventListener('install',()=>{console.log('安装成功')});
self.addEventListener('active',()=>{console.log('active')});
self.addEventListener('fetch',(e)=>{console.log(e);e.respondWith(new Response("abc"))});
