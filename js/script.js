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
        XNow += UNow;
        UNow *= 2;
        
        if ((xc > 200) && (UNow>1)) {
            xc = 200;
        }
        if ((xc < 800) && (UNow<1)) {
            xc = 800;
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
    step = MaxX / (10 * MN);
    ctx.strokeStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(0, MaxY / 2);
    ctx.lineTo(MaxX, MaxY / 2);
    ctx.lineWidth = 4 / MN;
    ctx.stroke();
    
        if (UNow > 0){
            while (Math.abs(MaxX - xc) <= (Math.abs(UNow)*step)){
                MN++;
                if (MN < 4) {xc = xc / MN;}
                step = MaxX / (10 * MN);
            }
        }
        if (UNow < 0){
            while (xc <= (Math.abs(UNow)*step)){
                MN++;
                xc = 800 + 200-200/(MN - 1);
                step = MaxX / (10 * MN);
            }
        }
    if (MN<=3) {FontSize = 30/ MN;}
    ctx.font = FontSize.toString() + "px Arial";
    ctx.fillStyle = '#fff';
    ctx.fillText(XNow,xc,yc + RoverHeight/1.5/MN);
    ctx.beginPath();
    ctx.moveTo(xc, yc + 20/MN);
    ctx.lineTo(xc, yc - 20/MN);
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
}
requestAnimationFrame(draw);
  