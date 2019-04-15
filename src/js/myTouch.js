var myTouch = (function() {
    //手机点击事件  1.手指触碰到手机，到手机离开屏幕时间小于300ms  2.不能滑动 
    var isMove = false, //判断手指是否移动  默认没有滑动
        startTime = 0; //初始时间
    function tap(el, callback) {
        if (typeof el === 'object') {
            el.addEventListener('touchstart', function() {
                //获取当前时间戳
                startTime = new Date() * 1
            })
            el.addEventListener('touchmove', function() {
                //如果触发了时间，说明啊屏幕上滑动
                isMove = true; //说明手指有滑动S
            })
            el.addEventListener('touchend', function() {
                //获取当前时间戳
                if (new Date() * 1 - startTime < 150 && !isMove) {
                    callback && callback()
                }
                isMove = false; //恢复手指默认不滑动的状态
            })
        }

    }

    function swiper(el, direction, callback) {
        var startPoint = null,
            endPoint = null,
            distance = 30;
        if (typeof el === 'object') {
            el.addEventListener('touchstart', function(e) {
                var ev = e.touches[0];
                //手指触摸屏幕的时候 记录开始的坐标信息
                startPoint = {
                    x: ev.clientX,
                    y: ev.clientY
                }
            })
            el.addEventListener('touchmove', function(e) {
                var ev = e.touches[0];
                if (startPoint) {
                    //手指触摸屏幕的时候 记录结束的坐标信息
                    endPoint = {
                        x: ev.clientX,
                        y: ev.clientY
                    }
                }
            })
            el.addEventListener('touchend', function() {
                    //dire函数执行的结果 方向 和 我们传递进来的额参数 进行判断
                    if (dire(startPoint, endPoint) === direction) {
                        // 如果方向相等 则执行接下来的指令
                        callback && callback()
                    }
                })
                //判断方向
            function dire(start, end) {
                var diffX = start.x - end.x,
                    diffY = start.y - end.y,
                    absX = Math.abs(diffX),
                    absY = Math.abs(diffY),
                    dire = '';
                if (absX > distance || absY > distance) {
                    if (absX > absY) {
                        dire = diffX > 0 ? 'swiperLeft' : 'swiperRight';
                    } else {
                        dire = diffY > 0 ? 'swiperUp' : 'swiperDown';
                    }
                }
                return dire;
            }
        }
    }
    return {
        tap, //tap:tap
        swiper
    }
})()