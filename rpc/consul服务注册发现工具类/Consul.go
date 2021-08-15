package consul

import (
	"bytes"
	"encoding/json"
	"errors"
	"net/http"
	"strconv"
)

type Consul struct {
	host string
	port int
}

//
func NewConsul(host string, port int) *Consul {
	return &Consul{
		host: host,
		port: port,
	}
}

func (c *Consul) Get(url string, options map[string]interface{}) (*Response, error) {
	return c.request("GET", url, options)
}

func (c *Consul) Put(url string, options map[string]interface{}) (*Response, error) {
	return c.request("PUT", url, options)
}

func (c *Consul) request(method, url string, options map[string]interface{}) (*Response, error) {
	url = "https://" + c.host + ":" + strconv.Itoa(c.port) + url
	var req *http.Request

	if options != nil {
		s, _ := json.Marshal(options)

		req, _ = http.NewRequest(method, url, bytes.NewReader(s))
	} else {
		req, _ = http.NewRequest(method, url, nil)
	}

	//发送请求
	res, _ := http.DefaultClient.Do(req)
	if res == nil {
		return nil, errors.New("consul请求失败，请检查ip和端口")
	}

	// 返回请求返回的信息
	return NewResponse(res), nil
}
