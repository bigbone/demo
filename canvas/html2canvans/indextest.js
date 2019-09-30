//手势事件
(function() {
    if (!isAndroid()) return;

    var istouch = false;
    var start = [];
    var gesturestart = new CustomEvent('gesturestart');
    var gesturechange = new CustomEvent('gesturechange');
    var gestureend = new CustomEvent('gestureend');

    document.addEventListener("touchstart", function(e) {
        if (e.touches.length >= 2) { //判断是否有两个点在屏幕上
            istouch = true;
            start = e.touches; //得到第一组两个点
            e.target.dispatchEvent(gesturestart);
        };
    }, false);

    document.addEventListener("touchmove", function(e) {
        e.preventDefault();
        if (e.touches.length >= 2 && istouch) {
            var now = e.touches; //得到第二组两个点
            var scale = getDistance(now[0], now[1]) / getDistance(start[0], start[1]); //得到缩放比例
            var rotation = getAngle(now[0], now[1]) - getAngle(start[0], start[1]); //得到旋转角度差
            gesturechange.scale = scale.toFixed(2);
            gesturechange.rotation = rotation.toFixed(2);
            e.target.dispatchEvent(gesturechange);
        };
    }, false);

    document.addEventListener("touchend", function(e) {
        if (istouch) {
            istouch = false;
            e.target.dispatchEvent(gestureend);
        };
    }, false);

    function getDistance(p1, p2) {
        var x = p2.pageX - p1.pageX,
            y = p2.pageY - p1.pageY;
        return Math.sqrt((x * x) + (y * y));
    };

    function getAngle(p1, p2) {
        var x = p1.pageX - p2.pageX,
            y = p1.pageY - p2.pageY;
        return Math.atan2(y, x) * 180 / Math.PI;
    };

    function isAndroid(p1, p2) {
        var u = navigator.userAgent;
        return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端    
    };
})();


var route = 0;
var imageInput = document.querySelector('#image-input');
var upinfo = {
    imgUrl: '',
    initTouchX: 0,
    initTouchY: 0,
    changeTouchX: 0,
    changeTouchY: 0,
    reviewImgDom: '',
    lastTouchX: 0,
    lastTouchY: 0,
    previewImg: '',
    myImg: {
        position: {
            x: 0,
            y: 0
        },
        scale: 1,
        lastScale: 1,
        rotation: 0,
        lastrotation: 0
    }
};

upinfo.previewImg = document.querySelector('#preview-img');
var prwviewbg = document.querySelector('#preview-bg');

document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
});
var lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false)

imageInput.addEventListener('change', function(e) {
    lrz(this.files[0])
        .then(function(rst) {
            upinfo.previewImg.src = rst.base64;
            upinfo.imgUrl = rst.base64;
            upinfo.myImg.position.x = 0;
            upinfo.myImg.position.y = 0;
            upinfo.myImg.scale = 1;
            upinfo.myImg.rotation = 0;
        })
        .catch(function(err) {
            // 处理失败会执行
        })
        .always(function() {
            // 不管是成功失败，都会执行
        });
});

function getDistance(p1, p2) {
    var x = p2.pageX - p1.pageX,
        y = p2.pageY - p1.pageY;
    return Math.sqrt((x * x) + (y * y));
};

function getAngle(p1, p2) {
    var x = p1.pageX - p2.pageX,
        y = p1.pageY - p2.pageY;
    return Math.atan2(y, x) * 180 / Math.PI;
};

var start = [];
var move = {
    getInitPosition(e) {
        e.preventDefault()
        if (upinfo.imgUrl) {
            var length = e.touches.length
            if (length > 1) {
                let pointOne = e.touches[0]
                let pointTwo = e.touches[1]
                upinfo.initTouchX = pointOne.clientX - pointTwo.clientX
                upinfo.initTouchY = pointOne.clientY - pointTwo.clientY
                start = e.touches;
            } else {
                var touches = e.touches[0]
                upinfo.initTouchX = touches.clientX
                upinfo.initTouchY = touches.clientY
            }
            //upinfo.myImg.lastrotation = 

        }
    },
    getMovePosition(e) {
        e.preventDefault()
        if (upinfo.imgUrl) {
            var length = e.touches.length
            if (length > 1) {
                let pointOne = e.touches[0]
                let pointTwo = e.touches[1]
                upinfo.changeTouchX = pointOne.clientX - pointTwo.clientX
                upinfo.changeTouchY = pointOne.clientY - pointTwo.clientY
                var scale = (upinfo.changeTouchX - upinfo.initTouchX) > (upinfo.changeTouchY - upinfo.initTouchY) ? (upinfo.changeTouchX / upinfo.initTouchX) : (upinfo.changeTouchY / upinfo.initTouchY)
                scale *= upinfo.myImg.lastScale
                upinfo.myImg.scale = scale > 3 ? 3 : scale < 0.5 ? 0.5 : scale;
                //var rotation = getAngle(pointOne, pointTwo) - getAngle(start[0], start[1]); //得到旋转角度差
                //document.title = (rotation);
                //upinfo.myImg.rotation = rotation.toFixed(2);

            } else {
                var touches = e.touches[0]
                upinfo.changeTouchX = touches.clientX - upinfo.initTouchX
                upinfo.changeTouchY = touches.clientY - upinfo.initTouchY
                upinfo.myImg.position.x = upinfo.lastTouchX + (upinfo.changeTouchX / upinfo.myImg.scale)
                upinfo.myImg.position.y = upinfo.lastTouchY + (upinfo.changeTouchY / upinfo.myImg.scale)
            }
            upinfo.previewImg.style.transform = "rotate(" + route + "deg) scale(" + upinfo.myImg.scale + ") translate(" + upinfo.myImg.position.x + "px," + upinfo.myImg.position.y + "px)";
            //document.title = (parseFloat(upinfo.myImg.lastrotation) + parseFloat(upinfo.myImg.rotation));
            /*document.title = (upinfo.myImg.position.y + '-' + upinfo.myImg.position.x + '-' + upinfo.myImg.scale);*/
            //document.title = upinfo.myImg.rotation;

        }
    },
    getLeavePosition(e) {
        upinfo.myImg.lastScale = upinfo.myImg.scale;
        //upinfo.myImg.lastrotation = parseFloat(upinfo.myImg.lastrotation) + parseFloat(upinfo.myImg.rotation);
        if (e.touches.length > 0) {
            var touches = e.touches[0]
            upinfo.initTouchX = touches.clientX
            upinfo.initTouchY = touches.clientY
        }
        upinfo.lastTouchX = upinfo.myImg.position.x
        upinfo.lastTouchY = upinfo.myImg.position.y
    },
    createPhoto() {
        if (upinfo.imgUrl) {
            let photoBox = document.querySelector('.photo-box')
            let newImgWidth = photoBox.offsetWidth
            let newImgHeight = photoBox.offsetHeight
                //console.log(photoBox, newImgHeight, newImgWidth);
            let scale = window.devicePixelRatio
            html2canvas(photoBox, {
                width: newImgWidth,
                height: newImgHeight,
                scale: scale,
                useCORS: true
            }).then(function(canvas) {
                var dataUrl = canvas.toDataURL('image/jpg')
                document.getElementById('test').src = dataUrl;
                //localStorage.imgData = dataUrl
            })
        } else {
            alert('请上传图片')
        }
    },
    gesturechange: function(event) {
        //document.title = event.rotation;
        var rot = event.rotation.toFixed(2);
        //upinfo.previewImg.style.transform;
        route = parseFloat(upinfo.myImg.lastrotation) + parseFloat(rot);
        //console.log(upinfo.previewImg.style.transform, lastrotation + rot);
        //upinfo.myImg.lastrotation =

    },
    gesturestart: function() {
        var css = upinfo.previewImg.style.transform;
        var reg = /(rotate\([\-\+]?(([\d|.]+)(deg))\))/i;

        //document.getElementById('test1').innerHTML = css + "-" + reg.exec(css);
        if (reg.exec(css)) {
            upinfo.myImg.lastrotation = reg.exec(css)[3] || 0;
        }
    },
    gestureend: function() {}
}
document.querySelector('.composite-btn').addEventListener('click', move.createPhoto);
prwviewbg.addEventListener('touchstart', move.getInitPosition);
prwviewbg.addEventListener('touchmove', move.getMovePosition);
prwviewbg.addEventListener('touchend', move.getLeavePosition);
prwviewbg.addEventListener('gesturechange', move.gesturechange);
prwviewbg.addEventListener('gesturestart', move.gesturestart);
prwviewbg.addEventListener('gestureend', move.gestureend);



//prwviewbg.addEventListener('gesturestart', move.getInitPosition, false);
//prwviewbg.addEventListener('gesturechange', move.getMovePosition, false);
//prwviewbg.addEventListener('gestureend', move.getLeavePosition, false);
//prwviewbg.addEventListener('touchstart', move.getInitPosition, false);