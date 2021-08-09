package main

import (
	"fmt"
	"net"
	"net/http"
	"net/rpc"
)

type Goods struct {
	Id   int
	Name string
}

// 给结构体添加方法
// rpc 通信第一个值为传递的参数，第二个参数为返回的数据
func (g *Goods) FindById(args *Goods, reply *Goods) error {
	fmt.Println("接收到的为", *args)

	*reply = *g //reply 为地址 *reply为取值
	return nil
}

// 第一个参数为客户端请求参数的累心， 第二个参数类型为rpc调用番薯数据的参数
func (g *Goods) GetName(args *Goods, reply *string) error {
	*reply = g.Name
	return nil
}

func main() {
	goods := &Goods{
		Id:   1,
		Name: "abc",
	}

	//注册对外的服务，注册后Goods 对象中的方法就可以使使用了
	rpc.Register(goods)

	rpc.HandleHTTP()

	//监听rpc服务
	listen, _ := net.Listen("tcp", "127.0.0.1:8001")

	http.Serve(listen, nil)

	//time.Sleep(1e9)
}
