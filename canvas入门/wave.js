class Wave{
	constructor({
		canvasWitdh,
		canvasHeight,
		waveWidth=0.05,//y=Asin（Bx+c）+d波浪宽度，数越小越宽，周期B
		waveHeight = 6,//A值
		speed,
		xOffset,// c 左右移动
		colors=['#ddd','pink'], //两个波浪的颜色
	}={}){
		this.canvasHeight=canvasHeight;
		this.canvasWitdh = canvasWitdh;
		this.waveWidth = waveWidth;
		this.waveHeight = waveHeight;
		this.speed = speed;
		this.xOffset = xOffset;
		this.startX = 0; //x轴开始的位置
		this.points = [];
		this.colors = colors;
	}
	update({ //绘制波浪
		nowRange //d
	}={}){
		this.points = [];
		const {
			canvasWitdh,
			canvasHeight,
			waveWidth,//y=Asin（Bx+c）+d波浪宽度，数越小越宽，周期B
			waveHeight,//A值
			speed,
			xOffset,// c 左右移动
		} = this
		let startX = 0;
		for (let i = startX; i < canvasWitdh; i+=10) {

			//绘制波浪，波浪从0点开始，总宽不超过canvas，每10个像素点画一份，比如画心分成了50段
			//y=Asin（Bx+c）+d
			const y = waveHeight*Math.sin(waveWidth*(startX+i)+xOffset)+(canvasHeight-nowRange);
			//由于画布开始时进行了旋转180，所以效果成了从上向下的动画效果，变回来需要减去canvasHeight
			this.points.push([startX+i,y]);
		}
		this.xOffset += speed; //波动效果
	}
	draw(ctx){
		//波浪内绘制
		ctx.save();
		const points = this.points;

		ctx.beginPath();
		
		for(let point of points){
			//console.log(point[0],point[1])
			ctx.lineTo(point[0],point[1]);
		}
		ctx.lineTo(this.canvasWitdh,this.canvasHeight);//画完波浪只是一条线，要形成闭合图形，波浪最后画到了x终点，然后x不动，移动到y轴最大，会形成一个三角，由于心形点的阻挡，填充心形，右半侧心绘制完毕
		ctx.lineTo(this.startX,this.canvasHeight);//同上，填充左半侧心颜色
		ctx.fillStyle=this.getColor(ctx);

		//ctx.lineWidth=2;
		//ctx.closePath();
		ctx.fill();
		ctx.restore();
	}
	getColor(ctx){
		//渐变色 线性
		const radius = this.canvasWitdh / 2;
		console.log(radius);
        const grd = ctx.createLinearGradient(radius, radius, this.canvasWitdh, this.canvasHeight);
        grd.addColorStop(0, this.colors[0]);
        grd.addColorStop(1, this.colors[1]);
        return grd;
	}
}