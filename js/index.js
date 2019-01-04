
window.onload = function () {
    var headerLisNodes = document.querySelectorAll('.nav li');
    var arrow = document.querySelector('.arrow');
    var headerDownsNodes = document.querySelectorAll('.nav li .down')
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