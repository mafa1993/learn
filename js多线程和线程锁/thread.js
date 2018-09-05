onmessage = function (e) {
    //e.data是传过来的数据
    console.log('e:',e);

   // Atomics.wait(e.data,1,104);
    if(e.data[0]==104){
        //string.fromCharCode() 可接受一个指定的 Unicode 值，然后返回一个字符串。 应该也可以将arraybuffer装换为string, 未测试
        var reader = new FileReader();
        reader.readAsText(new Blob([e.data]),'utf-8');
        reader.onload=function () {
            console.log(reader.result)
        }
    }

}