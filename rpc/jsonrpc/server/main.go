package main

import (
	"fmt"
	"net"
	"net/rpc"
	"net/rpc/jsonrpc"
)

type Goods struct {
	Id   int
	Name string
}

func main() {
	listen, _ := net.Listen("tcp", ":8002")
	defer listen.Close()
	conn, _ := listen.Accept()

	// 注册服务，底层是维护了一个hash表，名字，对应的方法
	rpc.RegisterName("goods", new(Goods))
	jsonrpc.ServeConn(conn)
}

// 给结构体添加方法
// rpc 通信第一个值为传递的参数，第二个参数为返回的数据
func (g *Goods) FindById(args *Goods, reply *Goods) error {
	fmt.Println("接收到的为", *args)

	*reply = Goods{Id: 2, Name: "xxx"} //reply 为地址 *reply为取值
	return nil
}

// 第一个参数为客户端请求参数的累心， 第二个参数类型为rpc调用番薯数据的参数
func (g *Goods) GetName(args *Goods, reply *string) error {
	*reply = g.Name
	return nil
}
