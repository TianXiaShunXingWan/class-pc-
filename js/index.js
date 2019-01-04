
window.onload = function () {
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
    //content  js

    document.onmousewheel = wheel;
    document.addEventListener('DOMMouseScroll ',wheel);
    function wheel(event) {
        event = event || window.event;

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
                    move(num)
                }

                break;
            case 'down' :
                if(num<4){
                    num++;
                    move(num)
                }

                break;
        }

        //禁止默认行为
        event.preventDefault && event.preventDefault();
        return false;
    }


}