
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
                arrow.style.left = this.getBoundingClientRect().left + this.offsetWidth/2
                    - arrow.offsetWidth/2 + 'px';
                for (var j = 0; j < headerDownsNodes.length; j++) {
                    headerDownsNodes[j].style.width = '0'
                }
                headerDownsNodes[this.index].style.width = '100%'
            }

        }
    }

    //content  js

    var num = 0;
    wheel();
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
                num--;
                contentUlNode.style.top = -content.offsetHeight*num + 'px';
                break;
            case 'down' :
                num++;
                contentUlNode.style.top = -content.offsetHeight*num + 'px';
                break;
        }

        //禁止默认行为
        event.preventDefault && event.preventDefault();
        return false;
    }


}