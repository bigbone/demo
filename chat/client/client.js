(function() {
    var d = document,
        w = window,
        p = parseInt,
        dd = d.documentElement,
        db = d.body,
        dc = d.compatMode == 'CSS1Compat',
        dx = dc ? dd : db,
        ec = encodeURIComponent;
    var allusers = {};

    var chatstr = '<span class="nick">%s</span>' +
        '<div class="chatItemContent">' +
        '<img class="avatar" src="%s"/>' +
        '<div class="cloud cloudText">' +
        '<div class="cloudPannel">' +
        '<div class="sendState"></div>' +
        '<div class="cloudBody">' +
        '<div class="cloudContent">' +
        '<pre class="">%s</pre>' +
        '</div>' +
        '</div>' +
        '<div class="cloudArrow"></div>' +
        '</div>' +
        '</div>' +
        '</div>';
    w.CHAT = {
        msgObj: d.getElementById("message"),
        screenheight: w.innerHeight ? w.innerHeight : dx.clientHeight,
        username: null,
        userid: null,
        socket: null,
        //让浏览器滚动条保持在最低部
        scrollToBottom: function() {
            w.scrollTo(0, this.msgObj.clientHeight);
        },
        //退出，本例只是一个简单的刷新
        logout: function() {
            //this.socket.disconnect();
            location.reload();
        },
        //提交聊天消息内容
        submit: function() {
            var content = d.getElementById("content").value;
            if (content != '') {
                var obj = {
                    userid: this.userid,
                    username: this.username,
                    content: content,
                    img: this.img
                };
                this.socket.emit('message', obj);
                d.getElementById("content").value = '';
            }
            return false;
        },
        genUid: function() {
            return new Date().getTime() + "" + Math.floor(Math.random() * 899 + 100);
        },
        //更新系统消息，本例中在用户加入、退出的时候调用
        updateSysMsg: function(o, action) {
            //当前在线用户列表
            var onlineUsers = o.onlineUsers;
            //当前在线人数
            var onlineCount = o.onlineCount;
            //新加入用户的信息
            var user = o.user;
            if (!user) {
                return;
            }
            //更新在线人数
            var userhtml = '';
            var separator = '';
            for (key in onlineUsers) {
                if (onlineUsers.hasOwnProperty(key)) {
                    userhtml += separator + onlineUsers[key];
                    separator = '、';
                }
            }
            d.getElementById("onlinecount").innerHTML = '当前共有 ' + onlineCount + ' 人在线，在线列表：' + userhtml;

            //添加系统消息
            var html = '';
            html += '<div class="msg-system">';
            html += user.username;
            html += (action == 'login') ? ' 加入了聊天室' : ' 退出了聊天室';
            html += '</div>';
            var section = d.createElement('section');
            section.className = 'system J-mjrlinkWrap J-cutMsg';
            section.innerHTML = html;
            this.msgObj.appendChild(section);
            this.scrollToBottom();
        },
        //第一个界面用户提交用户名
        usernameSubmit: function() {
            var username = d.getElementById("username").value;
            if (username != "") {

                var isright = true;
                for (var o in allusers) {
                    if (allusers.hasOwnProperty(o) && allusers[o] == username) {
                        alert('用户已经存在');
                        isright = false;
                        break;
                    }
                }
                if (isright) {
                    d.getElementById("username").value = '';
                    d.getElementById("loginbox").style.display = 'none';
                    d.getElementById("chatbox").style.display = 'block';
                    var img = document.querySelector('.cur>img');
                    var userInfo = { 'username': username, 'img': img.src }
                    this.init(userInfo);
                }

            } else {
                alert('请输入nick')
            }
            return false;
        },
        initsoc: function() {
            //连接websocket后端服务器
            this.socket = io.connect('ws://10.222.76.13:3000');
            this.socket.emit('getalluser');
            this.socket.on('getusersucc', function(o) {
                if (o.onlineUsers) {
                    allusers = o.onlineUsers;
                }
            });
            //监听新用户登录
            this.socket.on('login', function(o) {
                allusers = o.onlineUsers;
                CHAT.updateSysMsg(o, 'login');
            });

            //监听用户退出
            this.socket.on('logout', function(o) {
                CHAT.updateSysMsg(o, 'logout');
            });
        },
        init: function(userInfo) {
            /*
            客户端根据时间和随机数生成uid,这样使得聊天室用户名称可以重复。
            实际项目中，如果是需要用户登录，那么直接采用用户的uid来做标识就可以
            */
            var username = userInfo.username;
            var img = userInfo.img;
            this.userid = this.genUid();
            this.img = userInfo.img;
            this.username = username;

            d.getElementById("showusername").innerHTML = this.username;
            this.msgObj.style.minHeight = (this.screenheight - d.getElementById("onlinecount").clientHeight - 90) + "px";
            this.msgObj.style.height = (this.screenheight - d.getElementById("onlinecount").clientHeight - 90) + "px";
            this.scrollToBottom();

            //告诉服务器端有用户登录
            this.socket.emit('login', { userid: this.userid, username: this.username, 'img': userInfo.img });

            //监听消息发送
            this.socket.on('message', function(obj) {
                var isme = (obj.userid == CHAT.userid) ? true : false;

                //var contentDiv = '<div>'+obj.content+'</div>';
                //var usernameDiv = '<span>'+obj.username+'</span>';
                var section = d.createElement('div');
                if (isme) {
                    section.className = 'chatItem me';
                    section.innerHTML = chatstr.replace('%s', obj.username).replace('%s', obj.img).replace('%s', obj.content); //contentDiv + usernameDiv;
                } else {
                    section.className = 'chatItem you';
                    section.innerHTML = chatstr.replace('%s', obj.username).replace('%s', obj.img).replace('%s', obj.content); //usernameDiv + contentDiv;
                }
                CHAT.msgObj.appendChild(section);
                CHAT.scrollToBottom();
            });

        }
    };
    CHAT.initsoc();
    //通过“回车”提交用户名
    d.getElementById("username").onkeydown = function(e) {
        e = e || event;
        if (e.keyCode === 13) {
            CHAT.usernameSubmit();
        }
    };
    //通过“回车”提交信息
    d.getElementById("content").onkeydown = function(e) {
        e = e || event;
        if (e.keyCode === 13) {
            CHAT.submit();
        }
    };
    var allitem = document.querySelectorAll('.item');
    var length = allitem.length;
    for (var i = 0; i < length; i++) {
        allitem[i].addEventListener('click', function() {
            document.querySelector('.cur').classList.remove('cur');
            this.classList.add('cur');
        });
    }
})();