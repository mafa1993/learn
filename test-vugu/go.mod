module example.org/someone/testvugu

go 1.12

require (
	github.com/vugu/vugu v0.0.0-20190717003119-016db5b56564
	golang.org/x/crypto v0.0.0-20190308221718-c2843e01d9a2
	golang.org/x/net v0.0.0-20190328230028-74de082e2cca
	golang.org/x/sys v0.0.0-20190215142949-d0b11bdaac8a
	golang.org/x/text v0.3.0
	golang.org/x/tools v0.0.0-20190407030857-0fdf0c73855b
)

replace (
	golang.org/x/crypto => github.com/golang/crypto v0.0.0-20190308221718-c2843e01d9a2
	golang.org/x/net => github.com/golang/net v0.0.0-20190311183353-d8887717615a
	golang.org/x/sys => github.com/golang/sys v0.0.0-20190215142949-d0b11bdaac8a
	golang.org/x/text => github.com/golang/text v0.3.0
	golang.org/x/tools => github.com/golang/tools v0.0.0-20190407030857-0fdf0c73855b

)
