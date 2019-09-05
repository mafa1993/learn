var sp_height = 32;
var sp_widht = 32;
//类似雪碧图, 就是资源吧，将其放入到scene中使用，相当于游戏中的角色
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;
        //加载资源
        var sprite = new cc.Sprite(res.bg_jpg); //实例化资源
        sprite.setPosition(size.width/2,size.height/2); //设置位置
        this.addChild(sprite); //载入资源

        //初始化物理引擎
        this.initPhysics();
        //开启游戏循环，开启以后才会动，不开启永远是静止的
        this.scheduleUpdate();


        return true;
    },
    initPhysics:function(){
    //物理引擎初始化设置， 物体从彩虹向下滑
        //1 在彩虹上设置摩擦力 2 在最底部设置一个反弹
        var size = cc.width;
        //创建物理空间
        this.space = new cp.Space();
        //开启调试
        this.setDebugNode();

        //设置重力 向下的10
        this.space.gravity = cp.v(0,-10);
        //得到空间内所有的物体，物体要和环境边缘关联
        var staticBody = this.space.staticBody;
        //设置空间边界
        var walls = [new cp.SegmentShape(staticBody, cp.v(0, 0), cp.v(cc.winSize.width, 0), 30)];
        for (var i = 0;i<walls.length;i++){
            var shape = walls[i];
            //设置弹力系数
            shape.setElasticity(1);
            //设置摩擦系数
            shape.setFriction(1); //f = umg //摩擦力

            //将性状放入空间
            this.space.addStaticShape(shape);
        }
        //碰撞检测回调
        this.space.addCollisionHandler(
            1, //碰撞检测类型 一样的才会发生碰撞
            1, //碰撞检测类型
            this.collisionBegin.bind(this),  //两个物体开始接触时触发, 只触发一次
            this.collisionContinue.bind(this), //持续接触时触发
            this.collisionPost.bind(this), //当continue返回true时触发
            this.collisionEnd.bind(this) //两个物体分离的时候
        );
    },
    showEffect:function (sprite_list) {
        this._particleSystem = new cc.ParticleSystem(res.list); //ParticleSystem为cocos的粒子系统
        this._particleSystem.setAutoRemoveOnFinish(true); //执行完自动删除
        var size = sprite_list.getPosition();
        this._particleSystem.setPositionX(size.x-10); //设置位置
        this._particleSystem.setPositionY(size.y);
        this.addChild(this._particleSystem); //把粒子系统加入
    },
    collisionBegin:function () { //粒子效果利用粒子效果编辑器编辑后下载

    },
    collisionContinue:function () {

    },
    collisionPost:function () {

    },
    collisionEnd:function (arbiter,space) {
        //arbiter仲裁者
        var shapes = arbiter.getShapes();
        var bodyA = shapes[0].getBody(), //通过shape获取两个body
            bodyB = shapes[1].getBody();
        //通过body获取可视的精灵
        var spriteA = bodyA.data,
            spriteB = bodyB.data;
        //z增加粒子效果
        if(spriteA !== null && spriteB !== null){
            this.showEffect(spriteA)
        }

    },
    onEnter:function () { //进入场景时的一个生命周期
        this._super();
        //增加点击事件，点击增加元素
        cc.eventManager.addListener({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,//事件类型
            onTouchBegan:this.onTouchBegan //回调
        },this);

    },
    onTouchBegan:function (touch,event) {
        cc.log('事件触发');
        var target = event.getCurrentTarget(),
            location = touch.getLocation();
        target.addNewNode(location); //target就为整个对象，调用另一个方法
        return false;
    },
    addNewNode:function(location){
        //在点击的坐标增加精灵（新的节点） 两个在同一个位置会重合
        var body1 = this.createBody(res.snowman_png,location);
        var body2 = this.createBody(res.stone_png,cc.pAdd(location,cc.p(80,-80)));
        //两个物体增加关节，将两个物体连接
        this.space.addConstraint(new cp.PinJoint(body1, body2, cp.v(0, 0), cp.v(0, sp_height / 2)));//第一个参数为给两个物体增加关节，二三个参数是设置关节连接位置，第二个参数代表物体一的中间，第三个参数代表物体2的上表面中间

    },
    createBody:function (filename,location) {
        //创建一个质量为1的物体
        //cp.momentForBox 创建空气阻力 质量 力臂 力矩
        var body = new cp.Body(1,cp.momentForBox(1,sp_height,sp_widht));//重力及空气阻力
        body.location = location;
        //把物体添加到物体空间
        this.space.addBody(body);

        //将物体和形状绑定
        var shape = new cp.BoxShape(body,sp_widht,sp_height);
        //形状上增加弹性系数和摩擦系数
        shape.setElasticity(0.5);
        shape.setFriction(0.5);
        //设置碰撞检测类型
        shape.setCollisionType(1);  //只有碰撞检测类型一致的时候才进行检测
        this.space.addShape(shape);
        //对shape进行贴图,贴图后才能展示,形成精灵
        var sprite = new cc.PhysicsSprite(filename);
        sprite.setBody(body); //先设置body再设置位置
        sprite.setPosition(cc.p(location.x,location.y));
        this.addChild(sprite);
        body.data = sprite;
        return body;
    },
    update:function(dt){
        //设置帧率，默认dt， 设置成一个固定的比较好
        var timeStep = 0.04;
        this.space.step(timeStep);

    },
    setDebugNode:function () {
        //给物理引擎的节点增加一个遮罩，让他可视
        this._debugNode = new cc.PhysicsDebugNode(this.space);
        this._debugNode.visible = true;
        this.addChild(this._debugNode);
    }
});

var HelloWorldScene = cc.Scene.extend({  //场景
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

