
window.addEventListener('DOMContentLoaded',function () {
    var headerLisNodes = document.querySelectorAll('.nav li');
    var arrow = document.querySelector('.arrow');
    var headerDownsNodes = document.querySelectorAll('.nav li .down');
    var contentUlNode = document.querySelector('.content-mian');
    var content = document.querySelector('.content');

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
                move(this.index);
            }

        }
    }

    var timer = 0;
    var num = 0;
    function move(indexNode) {
        arrow.style.left = headerLisNodes[indexNode].getBoundingClientRect().left + headerLisNodes[indexNode].offsetWidth/2
            - arrow.offsetWidth/2 + 'px';
        for (var j = 0; j < headerDownsNodes.length; j++) {
            headerDownsNodes[j].style.width = '';
        }
        headerDownsNodes[indexNode].style.width = '100%';
        contentUlNode.style.top = -content.offsetHeight*indexNode + 'px';
    }
    move(2);
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

    var sectionKey = document.querySelectorAll('.section-key li');
    var dots = document.querySelectorAll('.dots li');
    var section = document.querySelector('.section');
    var lastIndex = 0;
    var nowIndex = 0;
    var lastTime = 0;
    var nowTime = 0;
    var timer = 0;
    keyframes();
    function keyframes() {
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
            dots[lastIndex].className = '';
            dots[nowIndex].className = 'active';
            lastIndex = nowIndex;
        },2500);
    }

    
    
})