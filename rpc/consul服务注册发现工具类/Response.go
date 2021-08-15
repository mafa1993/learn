package consul

import (
	"io/ioutil"
	"net/http"
)

type Response struct {
	Status     string
	StatusCode int
	Body       []byte
}

func NewResponse(res *http.Response) *Response {
	// 请求后返回的值是切面类型
	body, _ := ioutil.ReadAll(res.Body)

	// 关闭连接，不然会内存溢出
	defer res.Body.Close()

	return &Response{
		Status:     res.Status,
		StatusCode: res.StatusCode,
		Body:       body,
	}
}
