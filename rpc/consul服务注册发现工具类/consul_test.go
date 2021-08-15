package consul

import (
	"fmt"
	"testing"
)

func TestRegisterServer(t *testing.T) {
	servers := map[string]interface{}{"ID": "consul", "Name": "test", "Address": "127.0.0.1", "Port": 8300}

	fmt.Println("servers", servers)

	agent := NewAgent("127.0.0.1",9500)
	res, _ := agent.RegisterService(servers)

	fmt.Println("res", res)
}

func TestServices(t *testing.T) {
	agent := NewAgent("127.0.0.1",9500)

	res,_ := agent.Services()

	fmt.Println(string(res.Body))
}