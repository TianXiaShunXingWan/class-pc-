
if (window.addEventListener) {
  //DOMContentLoaded时间内：等待dom元素加载完成，就立即触发，触发时机比onload早的多
  window.addEventListener('DOMContentLoaded', main)
} else {
  //onload事件等待所有资源加载完成才会调用
  window.onload = main;
}
function main() {
  var headerLisNodes = document.querySelectorAll('.nav li');
  var arrow = document.querySelector('.arrow');
  var headerDownsNodes = document.querySelectorAll('.nav li .down');
  var contentUlNode = document.querySelector('.content-mian');
  var content = document.querySelector('.content');
  var sectionKey = document.querySelectorAll('.section-key li');
  var dots = document.querySelectorAll('.dots li');
  var section = document.querySelector('.section');
  var sideLisNodes = document.querySelectorAll('.side-smallDots li');

  var lastIndexs = 0;
  var timer = 0;
  var num = 0;
  //头部js
  headerH();
  function headerH() {

    arrow.style.left = headerLisNodes[0].getBoundingClientRect().left + headerLisNodes[0].offsetWidth
       - arrow.offsetWidth + 'px';
    headerDownsNodes[0].style.width = '100%'
    for (var i = 0; i < headerLisNodes.length; i++) {
      headerLisNodes[i].index = i;
      headerLisNodes[i].onclick = function () {
        num = this.index;
        move(num);
      }

    }
  }

  //开机动画
  bootAnimation();
  function bootAnimation() {
    var bootCentralNode = document.querySelector('.boot-central');
    var bootBottomNode = document.querySelector('.boot-bottom');
    var bootTopNode = document.querySelector('.boot-top');
    var bootAnimationNode = document.querySelector('.boot-animation');
    var num = 0;
    var bootArr = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','about1.jpg','about2.jpg','about3.jpg','about4.jpg','worksimg1.jpg','worksimg2.jpg','worksimg3.jpg','worksimg4.jpg','team.png','greenLine.png'];
    for (var i = 0; i < bootArr.length; i++) {
      var item = bootArr[i];
      var img = new Image();
      img.onload = function () {
        num++;
        var proportion = num/bootArr.length;
        bootCentralNode.style.width = proportion*100 + '%';
        if(proportion === 1){
          bootBottomNode.style.height = '0px';
          bootTopNode.style.height = '0px';
          bootCentralNode.style.display = 'none';
          if (document.addEventListener) {
            bootTopNode.addEventListener('transitionend', function () {
              //移除遮罩层
              bootAnimationNode.remove();
              //让第一屏做入场动画
              animationArr[0].exit();
            })
          } else {
            setTimeout(function () {
              //移除遮罩层
              bootAnimationNode.remove();
              //让第一屏做入场动画
              animationArr[0].exit();
            }, 1000)
          }
        }
      }
      img.src = './img/' + item;
    }


  }




  var sectionUlKey = document.querySelector('.section-key');
  var commonLisPlane1 = document.querySelectorAll('.common-plane1,.common-plane2,.common-plane3');
  var worksLisPencel1 = document.querySelectorAll('.works-pencel1,.works-pencel2,.works-pencel3');
  var aboutPhoto = document.querySelectorAll('.about-photo');
  var teamTitle = document.querySelector('.team-title');
  var teamText = document.querySelector('.team-text')

  /*出入场动画*/
  var animationArr =[{
    exit: function () {//入场动画
      sectionUlKey.style.transform = 'translateY(0)' ;
      sectionUlKey.style.opacity = '1'
    },
    entry:function () {//出场动画
      sectionUlKey.style.transform = 'translateY(-200px)' ;
      sectionUlKey.style.opacity = '0'
    }

  },{
    exit:function () {
      commonLisPlane1[0].style.transform ='translate(0,0)';
      commonLisPlane1[1].style.transform ='translate(0,0)';
      commonLisPlane1[2].style.transform ='translate(0,0)'
    },
    entry:function () {
      commonLisPlane1[0].style.transform ='translate(-100px,-100px)';
      commonLisPlane1[1].style.transform ='translate(-100px,100px)';
      commonLisPlane1[2].style.transform ='translate(100px,-100px)'
    }
  },{
    exit:function () {
      worksLisPencel1[0].style.transform = 'translateY(0)';
      worksLisPencel1[1].style.transform = 'translateY(0)';
      worksLisPencel1[2].style.transform = 'translateY(0)'
    },
    entry:function () {
      worksLisPencel1[0].style.transform = 'translateY(-100px)';
      worksLisPencel1[1].style.transform = 'translateY(100px)';
      worksLisPencel1[2].style.transform = 'translateY(100px)'
    }
  },{

    exit:function () {
      aboutPhoto[0].style.transform = 'rotate(0deg)';
      aboutPhoto[1].style.transform = 'rotate(0deg)';
    },
    entry:function () {
      aboutPhoto[0].style.transform = 'rotate(60deg)';
      aboutPhoto[1].style.transform = 'rotate(-60deg)';
    }
  },{

    exit:function () {
      teamTitle.style.transform = 'translateX(0)';
      teamText.style.transform = 'translateX(0)';
    },
    entry:function () {
      teamTitle.style.transform = 'translateX(-100px)';
      teamText.style.transform = 'translateX(100px)';
    }
  }];
  for (var i = 0; i < animationArr.length; i++) {
    animationArr[i].entry();

  }

  function move(indexNode) {
    arrow.style.left = headerLisNodes[indexNode].getBoundingClientRect().left + headerLisNodes[indexNode].offsetWidth/2
       - arrow.offsetWidth/2 + 'px';
    headerDownsNodes[lastIndexs].style.width = '';
    sideLisNodes[lastIndexs].className = '';
    animationArr[lastIndexs].entry();
    headerDownsNodes[indexNode].style.width = '100%';
    sideLisNodes[indexNode].className = 'active';
    animationArr[indexNode].exit();
    contentUlNode.style.top = -content.offsetHeight*indexNode + 'px';
    lastIndexs = indexNode;
  }

  // content  js
  document.onmousewheel = wheel;
  document.addEventListener('DOMMouseScroll ',wheel);
  function wheel(event) {
    event = event || window.event;
    clearTimeout(timer)
    timer = setTimeout(function () {
      var flag = '';
      if (event.wheelDelta) {
        //ie/chrome
        if (event.wheelDelta > 0) {
          flag = 'up';
        } else {
          flag = 'down'
        }
      } else if (event.detail) {
        //firefox
        if (event.detail < 0) {
          flag = 'up';
        } else {
          flag = 'down'
        }
      }

      switch (flag) {
        case 'up' :
          if(num>0){
            num--;
            // contentUlNode.style.top = -content.offsetHeight*num + 'px';
            move(num);
          }

          break;
        case 'down' :
          if(num<4){
            num++;
            // contentUlNode.style.top = -content.offsetHeight*num + 'px';
            move(num)
          }

          break;
      }

    },200)
    //禁止默认行为
    event.preventDefault && event.preventDefault();
    return false;
  }
  window.onresize = function () {
    arrow.style.left = headerLisNodes[num].getBoundingClientRect().left + headerLisNodes[num].offsetWidth
       - arrow.offsetWidth + 'px';
    contentUlNode.style.top = -content.offsetHeight*num + 'px';
  }

  var lastIndex = 0;
  var nowIndex = 0;
  /*第一屏*/
  keyframes();
  function keyframes() {
    var lastTime = 0;
    var nowTime = 0;
    for (var i = 0; i < dots.length; i++) {
      dots[i].index = i;
      dots[i].onclick = function () {
        nowTime = new Date();
        if(nowTime - lastTime < 2000) return;
        nowIndex = this.index;
        if(nowIndex === lastIndex) return;
        if(nowIndex > lastIndex){
          sectionKey[nowIndex].className = 'animation right-show';
          sectionKey[lastIndex].className = 'animation left-hide';
        }else{
          sectionKey[nowIndex].className = 'animation left-show';
          sectionKey[lastIndex].className = 'animation right-hide';
        }
        dots[lastIndex].className = '';
        this.className = 'active';
        lastIndex = nowIndex;
        lastTime = nowTime;
      }

    }
  }
  section.onmouseenter = function () {
    clearInterval(timer);
  }
  section.onmouseleave = function () {
    autoPlay();
  }
  autoPlay();

  function autoPlay() {
    clearInterval(timer);

    timer = setInterval(function () {

      nowIndex++;
      if (nowIndex === 4) nowIndex = 0;
      sectionKey[nowIndex].className = 'animation right-show';
      sectionKey[lastIndex].className = 'animation left-hide';

      for (var i = 0; i < dots.length; i++) {
        dots[i].className = '';

      }
      dots[nowIndex].className = 'active';
      lastIndex = nowIndex;
    },2500);
  }

  /*第五屏*/
  var canvas = null;
  var timer1 = null;
  var timer2 = null;
  lastScreen();
  function lastScreen() {
    var teamLists = document.querySelector('.team-lists');
    var teamLiLists = document.querySelectorAll('.team-lists li');

    for (var i = 0; i < teamLiLists.length; i++) {
      teamLiLists[i].index = i;
      teamLiLists[i].onmouseenter = function () {
        for (var j = 0; j < teamLiLists.length; j++) {
          teamLiLists[j].style.opacity = '0.5';
        }
        this.style.opacity = '1';

        this.index;
        if(!canvas){
          canvas = document.createElement('canvas');
          canvas.width = 236;
          canvas.height = 448;
          canvas.style.position = 'absolute';
          canvas.style.top = '0';
          canvas.style.left = this.index * canvas.width + 'px';
          maskLayer();
          teamLists.appendChild(canvas);
        }else {
          canvas.style.left = this.index * canvas.width + 'px';
        }
      }
    }
    teamLists.onmouseleave = function () {
      for (var j = 0; j < teamLiLists.length; j++) {
        teamLiLists[j].style.opacity = 1;
      }
      canvas.remove();
      clearInterval(timer1);
      clearInterval(timer2);
      canvas = null;
    }
    function maskLayer() {

      var ctx = canvas.getContext('2d');
      var circleArr = [];
      timer1 = setInterval(function () {

        var r=Math.round(Math.random()*255);
        var g=Math.round(Math.random()*255);
        var b=Math.round(Math.random()*255);
        var c_r=Math.round(Math.random()*8+2);
        var y=canvas.height + c_r;
        var x=Math.round(Math.random()*canvas.width);
        var s=Math.round(Math.random()*30+20);


        circleArr.push({
          r:r,
          g:g,
          b:b,
          c_r:c_r,
          y:y,
          x:x,
          deg:0,
          s:s
        })

      },50);
      timer2 = setInterval(function () {
        //清除上一次画布
        ctx.clearRect(0,0,canvas.width,canvas.height);

        for (var i = 0; i <circleArr.length; i++) {
          var item=circleArr[i];
          item.deg += 4;
          //得到弧度的值
          var rad=item.deg * Math.PI / 180;
          //求x和Y轴的坐标
          var x=Math.round(item.x + Math.sin(rad) * item.s);
          var y=Math.round(item.y - rad * item.s);
          ctx.fillStyle='rgba('+item.r+','+item.g+','+item.b+')';
          ctx.beginPath();
          ctx.arc(x,y,item.c_r,0,2*Math.PI,true);
          ctx.fill();

        }
      },1000/60)
    }
  }

  /*侧边导航*/

  sideNavigation();
  function sideNavigation() {
    for (var i = 0; i < sideLisNodes.length; i++) {
      sideLisNodes[i].index = i;
      sideLisNodes[i].onclick = function () {

        for (var j = 0; j < sideLisNodes.length; j++) {
          sideLisNodes[j].className = '';

        }
        num = this.index;
        move(num);
        // this.className = 'active';
        // move(this.index);
        // lastIndex = this.index;
      }

    }
  }
}



    
