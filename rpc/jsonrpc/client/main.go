package main

import (
	"fmt"
	"net/rpc/jsonrpc"
)

type Goods struct {
	Id   int
	Name string
}

func main() {
	conn, _ := jsonrpc.Dial("tcp", "127.0.0.1:8002")

	defer conn.Close()

	var res *Goods = &Goods{}
	err := conn.Call("goods.FindById", &Goods{Id: 1}, res)

	if err != nil {
		fmt.Println("s")
	}

	fmt.Println("res", res)

}
