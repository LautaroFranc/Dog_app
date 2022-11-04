var x=0;
var y=0;
let c=0
let timeId;
 const start= function start() {
    if (!timeId) {
      timeId= setInterval(drawImage,200)
    }
  }

  function drawImage(){
  var body = document.querySelector('body');
  var canva= document.querySelector("canvas");
  var img= document.getElementById("img");
  let ctx=canva.getContext('2d');

  body.addEventListener("mousemove",(e)=>{        
       x=e.screenX
       y=e.screenY-100
    })
    if (c==20) {
      c=0
      ctx.clearRect(0, 0,10000,10000);
    }
    if (x!==0&&y!==0) {
      ctx.drawImage(img,x,y,50,50);
    }
    c++
}

const stop= function stop() {
  clearInterval(timeId)
  timeId=null
}

export default {start,stop}