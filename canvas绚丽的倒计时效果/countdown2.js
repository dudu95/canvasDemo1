var winHeight = 500,
	winWidth = 1024;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
var currentShowTimeSeconds = 0;
var endTime = new Date();
endTime.setTime(endTime.getTime()+3600*1000);

var balls = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]
// const colors = 
window.onload = function(){
	//屏幕自适应
	winWidth = document.body.clientWidth-20;
	winHeight = document.body.clientHeight-20;
	MARGIN_TOP = Math.round(winHeight/3);
	MARGIN_LEFT = Math.round(winWidth/4) ;
	RADIUS = Math.round(winWidth*3/5/107)-1;
	
	var canvas = document.getElementById("canvas");
	canvas.width=winWidth;
	canvas.height=winHeight;
	var context = canvas.getContext('2d');
	currentShowTimeSeconds=getSeconds();
	setInterval(function(){
		Draw(context);
		update();
		// console.log(balls.length);
	},50)
	
}

	function update(){
		var nextSeconds = getSeconds();
		var nexhours = parseInt(nextSeconds/3600);
    	var nexminutes = parseInt((nextSeconds-nexhours*3600)/60);
    	var nexseconds = parseInt(nextSeconds%60);

    	var curhours = parseInt(currentShowTimeSeconds/3600);
    	var curminutes = parseInt((currentShowTimeSeconds-curhours*3600)/60);
		var curseconds = parseInt(currentShowTimeSeconds%60);
		if(nexseconds!=curseconds){

			//在跳动的数字上添加小球
			if(parseInt(nexhours/10)!=parseInt(curhours/10)){
				addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(curhours/10));
			}
			if(parseInt(nexhours%10)!=parseInt(curhours%10)){
				addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curhours%10));
			}
			if(parseInt(nexminutes/10)!=parseInt(curminutes/10)){
				addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curminutes/10));
			}
			if(parseInt(nexminutes%10)!=parseInt(curminutes%10)){
				addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curminutes%10));
			}
			if(parseInt(nexseconds/10)!=parseInt(curseconds/10)){
				addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curseconds/10));
			}
			if(parseInt(nexseconds%10)!=parseInt(curseconds%10)){
				addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(curseconds%10));
			}
			//时间的跳动
			currentShowTimeSeconds = nextSeconds;
		}
		updateBalls();
	}

	function updateBalls(){
		for(var i=0;i<balls.length;i++){
			balls[i].x += balls[i].vx;
			balls[i].y += balls[i].vy;
			balls[i].vy += balls[i].g;
			if(balls[i].y>=winHeight-RADIUS){
				// balls[i].y=winHeight-RADIUS
				// balls[i].vy = -balls[i].vy*0.75;
			}
			// if(balls[i].vx==0){
			// 	balls[i].vx = -5;
			// }
		}

		var count=0;
		for(var j=0;j<balls.length;j++){
			if(balls[j].x+RADIUS>0&&balls[j].x-RADIUS<winWidth){
				balls[count++] = balls[j];
			}
		}
		while(balls.length>Math.min(300,count)){
			balls.pop();
		}
	}

	//添加小球
	function addBalls(x,y,num){
		for(var i=0;i<digit[num].length;i++){
			for(var j=0;j<digit[num][i].length;j++){
				var ball = {
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*Math.floor(Math.random()*30),
					vy:Math.pow(-1,Math.ceil(Math.random()*1000))*Math.floor(Math.random()*30),
					g:0.5+Math.random(),
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(ball);
			}
		}
	}
	
	//获得倒计时的秒数
	function getSeconds(){
		var now = new Date();
		var ret = endTime.getTime()-now.getTime();
		ret = Math.round( ret/1000 );
		return ret>=0?ret:0;
	}

	function Draw(cxt){
		//清除画布，显示动画效果

		//效果一样
		// cxt.clearRect(0,0,winWidth,winHeight);
		cxt.clearRect(0,0,cxt.canvas.width,cxt.canvas.height);

		var hours = parseInt(currentShowTimeSeconds/3600);
    	var minutes = parseInt((currentShowTimeSeconds-hours*3600)/60);
    	var seconds = parseInt(currentShowTimeSeconds%60);
		DrawDetail( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10) , cxt );
		DrawDetail( MARGIN_LEFT+15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt );
		DrawDetail( MARGIN_LEFT+30*(RADIUS+1) , MARGIN_TOP , 10 , cxt );
		DrawDetail( MARGIN_LEFT+39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt );
		DrawDetail( MARGIN_LEFT+54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt );
		DrawDetail( MARGIN_LEFT+69*(RADIUS+1) , MARGIN_TOP , 10 , cxt );
		DrawDetail( MARGIN_LEFT+78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt );
		DrawDetail( MARGIN_LEFT+93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt );

		//画小球
		for(var i=0;i<balls.length;i++){
			cxt.fillStyle = balls[i].color;
			cxt.beginPath();
			cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI);
			cxt.fill();
		}
	}

	function DrawDetail(x,y,num,cxt){
		 cxt.fillStyle = "rgb(0,102,153)";

    for( var i = 0 ; i < digit[num].length ; i ++ ){
        for(var j = 0 ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j]==1 ){
                cxt.beginPath();
                cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI );
                // cxt.closePath()

                cxt.fill();
            }
    	}
	}

