class Wheel{
    constructor(wNum){
        console.log("making wheel");
        this.wheelImage = new Image(900,900);
        this.wheelImage.src = "media/prizeWheel.png";
        ctx.drawImage(this.wheelImage,0,0);
        
        this.wedgeNum = wNum;
        this.wedgeSize = 360/wNum;
        
        this.degree = 0;//what degree spun is it
        this.maxDegree = 360;//max degrees it can spin before reseting
        this.slowTimer = 0;
        
        this.speed = 0;//velocity of the wheel
        this.maxSpeed = -5;
        
        this.spinning = false;
        this.stopping = false;
        
        this.cheating = false;
        this.cheat = 0;
        this.cheatDist = false;
        this.cheatVel = 0;//cheat velocity
        
        this.result = 0;
    }
    
    getSpinning(){ return this.spinning; }
    setSpinning(spin){ this.spinning = spin; }
    getStopping(){ return this.stopping; }
    setStopping(spin){ this.stopping = spin; }
    
    setCheating(cheat){
        this.cheating = true;
        this.cheat = Math.round(((cheat-1) * -38));
    }
    endCheating(){
        this.cheating = false;
        this.cheat = 0;
    }
    
    start(){
        if(this.speed >= this.maxSpeed) this.speed-=0.2;
        this.degree+=this.speed;
        this.spin();
    }
    stop(){
        this.slowTimer+=5;
        if(this.slowTimer >= 100) this.slowTimer = 0;
        //this.degree = easeOutQuart(this.slowTimer, this.degree, 140 - this.degree,100);
         //console.log("time remaining: " + this.slowTimer);
        if(!this.cheating){
            //console.log("current speed" + this.speed);
            this.speed += 0.2;
            this.degree+=this.speed;
            if(this.speed >= -0.01){
                this.spinning = false;
                this.stopping = false;
                this.calcResult();
            }
        }
        else{
            console.log("cheat" + this.cheat);
            if(!this.cheatDist) this.cheatVel = getDistance(this);
            console.log("distance to cheat" + this.cheatVel);
            if((this.cheatVel + 5) >= -180 && (this.cheatVel - 5) <= -180){
            this.cheatDist = true;
            //if(this.cheat <= this.degree) this.cheat += 360; //makes sure the wheel doesnt go backwards
            var easeout = easeOut(this);
            this.speed = easeout;
            console.log(easeout);
            
            if(this.speed >= -0.15){
                console.log("end");
                this.spinning = false;
                this.stopping = false;
                this.cheatDist = false;
                this.calcResult();
            }
            }
            this.degree += this.speed;
        }
        this.spin();
    }
    
    spin(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.save();
        ctx.translate(canvas.width/2,canvas.height/2);//make sure its rotating around the center point
        
        ctx.rotate(this.degree*Math.PI/180);//rotate image
        ctx.drawImage(this.wheelImage,-this.wheelImage.width/2,-this.wheelImage.width/2);
        ctx.restore();
        
        if(this.degree <= -360){
           this.degree = 0;
        }
    }
    
    calcResult(){
        this.result = Math.round((-this.degree/36)+1);
        console.log("result: " + this.result);
        if(this.result % 2 == 0) loadClue(2);
        else{ loadClue(1); }
        
        if(clueNum >= 4 || murdNum >= 3) loadClue(3);
    }
}

function animate(){
    ctx.clearRect(0,0,900,900);
    if(wheel.spinning){
        wheel.start();
    }
    else if(wheel.stopping){
        wheel.stop();
    }
    else{ wheel.spin(); }
    ctx.drawImage(magnifyingGlass,400,10);
}

function easeOut(wheel){
    var speed = wheel.speed;
    //if(!wheel.cheatDist) wheel.cheatVel = getDistance(wheel);
    
    speed -= wheel.speed/(36);
    console.log("speed: " + speed);
    return speed;
}

function getDistance(wheel){
    var cur = wheel.degree;
    var dest = wheel.cheat;
    var speed = wheel.speed;
    var dist = 0;
    if(dest >= cur)dist = (dest - 360) - cur;
    else{ dist = dest - cur; }
    console.log("get distance");
    /*console.log("dist"+dist);
    wheel.degree += dist;
    wheel.spin();
    wheel.setStopping(false);*/
    
    /*if(dist <= -30) dist -= 360;
    speed = speed / dist;
    speed *= 5;*/
    //wheel.cheatDist = true;
    return dist;
}

function easeOutQuart(t, b, c, d) {
	t /= d;
	t--;
    //console.log("time remaining: " + (-c * (t*t*t*t - 1) + b));
	return -c * (t*t*t*t - 1) + b;
}
