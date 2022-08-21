var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var dino = {
    x:10,
    y:200,
    width:50,
    height:50,
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height); 
    }
}

var img1 = new Image();
img1.scr = 'img/cactus.png';

class Cactus{
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = "red",
        ctx.fillRect(this.x, this.y, this.width, this.height); 
        //ctx.drawImage(img1, this.x, this.y); //chk
    }
}

var cactus = new Cactus();
cactus.draw();

var timer = 0;
var arrCactus = [];
var jumpTimer = 0;
var animation;

//코드를 1초에 60번 실행하면 애니메이션 생성 가능 
function frameLoad(){
    animation = requestAnimationFrame(frameLoad);
    timer++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //120프레임마다 장애물도 소환해서 arrCactus에 담음 
    if(timer%120===0){
        var cactus = new Cactus();
        arrCactus.push(cactus); //장애물 여러개 관리하기
    }
    arrCactus.forEach((a,i,o)=>{    
        //x좌표가 0미만이면 제거 
        if(a.x<0){
            o.splice(i,1);
        }
        a.x--;

        //충돌체크(주인공,장애물 충돌체크 실시간 체크)
        crushChk(dino,a);
        
        a.draw();
    })
    //점프하기 
    if(jumpSwitch==true){
        dino.y--;
        jumpTimer++;
    }
    if(jumpSwitch==false){
        if(dino.y<200){
            dino.y++;
        }
    }
    if(jumpTimer>100){
        jumpSwitch = false;
        jumpTimer = 0; 
    }
    dino.draw();
}

//장애물 충돌 확인하기
function crushChk(dino, cactus){
    var diffX = cactus.x - (dino.x + dino.width);
    var diffY = cactus.y - (dino.y + dino.height);
    if(diffX<0 && diffY<0){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation); // 게임정지됨
        alert("GAME OVER");
    }
}

frameLoad();

var jumpSwitch = false; //점프여부 체크 
document.addEventListener('keydown',function(e){
    if(e.code=='Space'){
        jumpSwitch = true;
    }
})