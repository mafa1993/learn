//子场景
import {Scene} from "phaser";
import {platform} from "os";

export default class SimpleGame extends Scene{
    private player:Physics.Arcade.Sprite;
    private cursors:Phaser.Types.Input.Keyboard.CursorKeys;  //键盘事件，this.input.keyboard.createCursorKeys();生成
    private score:number; //分数
    private scoreText: Phaser.GameObjects.Text;

    constructor(){
        super("SimpleGame");
        this.score = 0;
    }
    public preload(){
        //如果网站和资源不再同一网站，注意配置资源的跨域
        this.load.setBaseURL('http://127.0.0.1:8080');
        this.load.image('sky','assets/sky.png');
        this.load.image('ground','assets/platform.png');
        this.load.image('star','assets/star.png');

        //人物为雪碧图,需要设置每一个小图的宽高
        this.load.spritesheet('dude','assets/dude.png',{frameWidth:32,frameHeight:48});

    }
    //创建阶段
    public create(){
        this.add.image(400,300,'sky'); //坐标为中心点坐标
        //创建物理引擎组
        const platform = this.physics.add.staticGroup();

        //对地面增加物理引擎并且缩放，拉长1.5倍
        platform.create(400,568,'ground').setScale(1.5,1).refreshBody();
        platform.create(600,400,'ground'); //浮空的地面
        platform.create(50,200,'ground');
        platform.create(750,20,'ground');

        //添加小人 ,设置初始化位置
        const player = this.physics.add.sprite(100,450,'dude');

        //设置碰撞检测
        player.setCollideWorldBounds(true); //场景边界增加

        player.setBounce(0.2); //小人边界弹性洗漱
        this.physics.add.collider(player,platform);  //小人和platform创建碰撞检测

        const stars = this.physics.add.group({
            key:"star",
            repeat:5, //重复几个
            setXY:{x:12,y:0,stepX:70}  //stepX为间隔宽度
        });
        //遍历所有星星,设定星星的类型
        stars.children.iterate(function(child:Physics.Arcade.Image){
            child.setBounceY(Phaser.Math.FloatBetween(0.4,0.8)); //设置星星y轴坐标，0.4到0.8之间
        });
        this.physics.add.collider(player,platform);
        this.physics.add.collider(stars,platform);



        //创建动画
        this.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key:'left', //向左转
            frames:this.anims.generateFrameNumbers('dude',{start:1, end:3}),//从第一帧到第三帧
            frameRate:20,
            repeat:-1, //重复，永远重复，
        });

        this.anims.create({
            key:'right', //向右
            frames:this.anims.generateFrameNumbers('dude',{start:5, end:8}),//从第一帧到第三帧
            frameRate:20,
            repeat:-1, //重复，永远重复，
        });
    //定义事件
        this.cursors = this.input.keyboard.createCursorKeys(); //键盘响应时间

        //小人和星星碰撞
        this.physics.add.overlap(player,stars,this.collectStar,null,this); //小人经过星星 执行自定义方法collectStar

        //创建分数 坐标，显示，样式
        this.scoreText = this.add.text(16,16,'分数:0',{fontSize:'26px',fill:'black'});
        this.player = player;
    }

    public update(){
        const {cursors,player} = this;
        if(cursors.left.isDown){  //左键按下
            player.setVelocityX(-160); //设置x轴速度
            player.anims.play('left',true); //执行left动画，true忽略左键再次按下
        }else if(cursors.right.isDown){
            player.setVelocityX(160);
            player.anims.play('right',true);
        }else{
            //停止按时，速度归零
            player.setVelocityX(0);
            player.anims.play('turn');
        }

        //跳跃,当小人在地面上时，并且按住上键，小人向上
        if(cursors.up.isDown && player.body.touching.down){
            player.setVelocityY(-200);
        }

    }

    private collectStar(_player=null,stars:Physics.Arcade.Image){
        stars.disableBody(true,true); //清空星星
        this.score += 1;
        this.scoreText.setText('分数：'+this.score); //更新文本，计分
    }


}