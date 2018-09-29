var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var MaxX = 1000;
var MaxY = 300;
var RoverWidht = 200;
var RoverHeight = 150;
var xc = 500;
var yc = 150;
var MN = 1;
var XNow = 0;
var UNow = 1;
var FontSize = 30;
var YText;
var step = MaxX / (10 * MN);
var InfoX = document.getElementById('X');

function draw() {
    var rover = document.getElementById("rover");
    document.getElementById('A').onclick = function(){ 
        if (Math.abs(XNow + UNow)>100000){
            alert("Вы достигли границы");
            XNow=0;
            UNow=1;
            MN=1;
            rover.src = "img/roverRight.png";
            xc=500;
        } else{
            if (((xc + step*UNow)>RoverWidht/2/MN)&&((xc + step*UNow)< (1000-RoverWidht/2/MN))){
                xc += step*UNow;
            } else{
                if (UNow>0){
                    if (MN <3){
                        MN++;
                    }
                    xc = 200/MN;
                }
                if (UNow<0){
                    if (MN <3){
                        MN++;
                    }
                    xc = 1000 - (2 * RoverWidht/2/MN);
                }

            }
            XNow += UNow;
            UNow *= 2;
        }
        requestAnimationFrame(draw);
    } 
    
    document.getElementById('R').onclick = function(){
        if (rover.src.indexOf("Left") != -1){
            rover.src = "img/roverRight.png";
            MN = 1;
        } else{
            rover.src = "img/roverLeft.png";
            MN = 1;
        }
        UNow = UNow / Math.abs(UNow) * (-1);
    }
    ctx.fillStyle = '#000';
    ctx.fillRect(0,0,MaxX,MaxY);
    if (MN < 3) {
        step = MaxX / (10*MN);
        FontSize =30 / MN;
    }
    ctx.strokeStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(0, MaxY / 2);
    ctx.lineTo(MaxX, MaxY / 2);
    ctx.lineWidth = 4 ;
    ctx.stroke();
    
    ctx.font = FontSize.toString() + "px Arial";
    ctx.fillStyle = '#fff';
    ctx.fillText(XNow,xc,yc + RoverHeight/1.5/MN);
    ctx.beginPath();
    ctx.moveTo(xc, yc + 20);
    ctx.lineTo(xc, yc - 20);
    ctx.stroke();
    for (var i=1; i<=(MaxX / step); i ++){
        ctx.beginPath();
        ctx.moveTo(xc+(step *i), yc + 20/MN);
        ctx.lineTo(xc+(step *i), yc - 20/MN);
        ctx.stroke();
        ctx.fillText(i + XNow,xc+(step *i),yc + RoverHeight/1.5/MN);     
        ctx.beginPath();
        ctx.moveTo(xc-(step *i), yc + 20/MN);
        ctx.lineTo(xc-(step *i), yc - 20/MN);
        ctx.stroke();
        ctx.fillText(-i + XNow,xc-(step *i),yc + RoverHeight/1.5/MN);
    }
    rover.style.left = xc - RoverWidht/2/MN + 'px';
    rover.style.top = yc - RoverHeight/MN/2 + 'px';
    rover.style.height = 150/MN + 'px';
    rover.style.width = 200/MN + 'px';
    document.getElementById('U').innerHTML = 'U='+UNow;
    document.getElementById('X').innerHTML = 'X='+XNow;
    //requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
  