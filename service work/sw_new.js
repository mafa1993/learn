var queryParam = [
	"a=System&m=status"
];
var pre = 'index.php?';
self.addEventListener('install',(e)=>{console.log('安装成功');var title = 'Yay a message.';
  var body = 'We have received a push message.';
  var icon = '/images/icon-192x192.png';
  var tag = 'simple-push-demo-notification-tag';

 /* e.waitUntil(
		      self.registration.showNotification(title, {
			        body: body,
			        icon: icon,
			        tag: tag
			      })
			    )*/});
self.addEventListener('active',()=>{console.log('active')});
self.addEventListener('fetch',(e)=>{if(e.request.url.split('?')[1]=='a=System&m=status'){console.log('fetch');console.log(e.isReload,e.request.url,e.clientId);e.respondWith(new Response("abc"))}});
