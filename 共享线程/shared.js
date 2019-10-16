onconnect = function (e) {
console.log(e.ports[0].data)
    //var port = e.ports[0];
    onmessage=function () {

        console.log('sharde',arguments);
        console.log('abc');
    }

    e.ports[0].postMessage(2)

}