package main

import (
	"fmt"
	"net/rpc"
)

type Goods struct {
	Id   int
	Name string
}

func main() {
	client, err := rpc.DialHTTP("tcp", "127.0.0.1:8001")
	if err != nil {
		fmt.Println("error", err)
		panic(2)
	}

	response := &Goods{} // 接收服务端返回的数据包

	// 发送的参数
	data := &Goods{Id: 1}
	// 访问服务端 调用服务端Goods结构体的FindById方法
	err = client.Call("Goods.FindById", data, response)

	if err != nil {
		fmt.Println("err：", err)
	}

	fmt.Println("response", response)
}
