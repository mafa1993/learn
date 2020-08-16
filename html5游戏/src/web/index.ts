//引入phaser的Game和场景
import {AUTO, Game} from "phaser";

//引入场景
import SimpleGaem from "./scenes/SimpleGame";

const scenes = [SimpleGaem];

const config:Phaser.Types.Core.GaemConfiig = {
    type:AUTO, //webGL,canvas 自动
    width:800,
    height:600,
    parent:'main', //页面中的元素
    physics:{ //定义物理引擎
        default:'arcade', //将个体都当做一个正方形
        arcade:{  //物理引擎的一些配置
            gravity:{ //重力加速度
                y:200
            }
        }
    },
    scene:scenes //配置多个场景
};
const game =  new Game(config);

//切换到子场景
game.scene.start("SimpleGame");