/**
 * Created by Administrator on 2017/4/14.
 */
window.onload= function () {
    //顶部通栏颜色渐变
    headerScroll();
    //事件倒计时
    downTime();
    //轮播图
    banner();
    function headerScroll() {
        var nav = document.querySelector(".jd_nav");
        //得到导航到顶的高度
        var danceNav = nav.offsetHeight + nav.offsetTop;
        var header = document.querySelector(".jd_header");
        //初始化透明度
        header.style.backgroundColor = 'rgba(201,21,35,0)';

        //当滚轮触发
        window.onscroll = function () {
            //得到被卷去的高度
            var danceScroll = window.document.body.scrollTop;
            //得到导航和被卷去高度的百分比
            var percent = danceScroll / danceNav;
            //判断如果百分大于比等于1，就不管了
            if (percent > 1) {
                percent = 1;
            }
            header.style.backgroundColor = "rgba(201,21,35," + percent + ")";

        }

    }

    function downTime() {
        var li = document.querySelectorAll(".main_content:nth-child(1) .content_top li");
        var time = 3 * 60 * 60 + 1;
        var timer = setInterval(function () {
            if (time <= 0) {
                alert("时间到");
                return
            }
            time--;
            var hours = Math.floor(time / 3600);
            var min = Math.floor(time % 3600 / 60);
            var sec = time % 60;
            li[0].innerHTML = Math.floor(hours / 10);
            li[1].innerHTML = Math.floor(hours % 10);
            li[3].innerHTML = Math.floor(min / 10);
            li[4].innerHTML = Math.floor(min % 10);
            li[6].innerHTML = Math.floor(sec / 10);
            li[7].innerHTML = Math.floor(sec % 10);
        }, 1000)

    }

    function banner() {
        //首先获取必要元素
        //1 获取变量
        // 屏幕的宽度
        var width = document.body.offsetWidth;
        // console.log(width);\

        //  获取 轮播图的ul
        var moveUl = document.querySelector('.banner_images');

        // 添加过度效果 由于后面已经设置了 所以 这里 已经没有意义了
        // moveUl.style.transition = 'all .3s';

        // 索引的li标签
        var indexLiArr = document.querySelectorAll('.banner_index li');

        // 定义 index 记录 当前的 索引值
        // 默认 我们的ul 已经 往左边 移动了 一倍的宽度
        //不希望用户看到 所以 index =1
        var index = 1;


        // 开启定时器
        var timeId = setInterval(function () {
            // 累加
            index++;

            // 将过渡开启 保证 过渡效果一直存在
            moveUl.style.transition = 'all .3s';

            // 修改 ul的位置
            moveUl.style.transform = 'translateX(' + index * width * -1 + 'px)';

        }, 2000);


        // 过渡 结束事件 用来 修正 index的值 并修改索引
        moveUl.addEventListener('webkitTransitionEnd', function () {
            console.log('过渡结束');

            //  如果 index 太大了
            if (index > 8) {
                index = 1;

                // 关闭过渡
                moveUl.style.transition = '';

                // 瞬间 修改一下 ul 的位置
                moveUl.style.transform = 'translateX(' + index * width * -1 + 'px)';
            } else if (index < 1) {
                // 跳到倒数第二张
                index = 8;

                // 关闭过渡
                moveUl.style.transition = '';

                // 瞬间 修改一下 ul 的位置
                moveUl.style.transform = 'translateX(' + index * width * -1 + 'px)';
            }

            // 修改 索引li标签的 class
            for (var i = 0; i < indexLiArr.length; i++) {
                indexLiArr[i].className = '';
            }

            // 有一个 1的 差值
            indexLiArr[index - 1].className = 'current';

        });
        var starX=0;
        var dance=0;
        moveUl.addEventListener("touchstart", function (event) {
            moveUl.style.transition="";
            clearInterval(timeId);
             starX=event.touches[0].clientX;

        });
        moveUl.addEventListener("touchmove", function (e) {
             dance= e.touches[0].clientX-starX;
            moveUl.style.transform="translateX("+(dance+index * width * -1) +"px)";

        });
        moveUl.addEventListener("touchend", function () {
     var maxDisdance=width/3;
            if(Math.abs(dance)>maxDisdance){
                if(dance>0){
                    index--;
                }else {
                    index++;
                }
                moveUl.style.transition="all .3s";
                moveUl.style.transform="translateX("+(index * width * -1) +"px)";
            }else{
                moveUl.style.transition="all .3s";
                moveUl.style.transform="translateX("+(index * width * -1) +"px)";
            }
            timeId = setInterval(function () {
                // 累加
                index++;

                // 将 过渡开启 保证 过渡效果一直存在
                moveUl.style.transition = 'all .3s';

                // 修改 ul的位置
                moveUl.style.transform = 'translateX('+index*width*-1+'px)';
            },1000)
        });
    }
}