package consul

type Agent struct {
	consul *Consul
	params map[string]interface{}
}

func NewAgent(host string, port int) *Agent {
	return &Agent{
		consul: NewConsul(host, port),
	}
}

func (a *Agent) Services() (*Response, error) {
	return a.consul.Get("/v1/agent/services", a.params)
}

//注册服务
func (a *Agent) RegisterService(servers map[string]interface{}) (*Response, error) {
	return a.consul.Put("/v1/agent/service/register", servers)
}
