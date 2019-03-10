- cocos2d-js简单场景构建
- 物理引擎使用
- 粒子效果

### 步骤
1. 下载cocos-x
2. 需要python环境，运行setup.py安装cocos环境
3. cocos new -l js project 利用cocos脚手架初始化一个项目，基于js语言，名字为project
4. 运行需要cocos run，[文档](https://docs.cocos.com/cocos2d-x/manual/zh/editors_and_tools/cocosCLTool.html) cocos run --help可以查看，如果是本机装的cocos，使用cocos run -p web 即可，虚拟机需要更改监听的端口Wie0.0.0.0， 默认监听127.0.0.1，外部无法访问 cocos run -p web --host 0.0.0.0
```
文件目录
frameworks cocos的框架
res 资源文件
    loading.js 初始化的loading的动画
src 
    resource.js 载入资源 加载场景
    app.js 主文件
```
5. cocos推荐使用chipmunk这个物理引擎
6. 游戏分角色、场景、导演，导演进行各种调度
7. 需要在project.json里自行增加chipmunk，物理引擎模块
8. frameworks里内容过多未上传，cocos的框架包