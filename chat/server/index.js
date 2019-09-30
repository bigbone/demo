var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.send('<h1>Welcome Realtime Server</h1>');
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});

var onlineUsers = {};
var onlineCount = 0;

io.on('connection',function(socket){
		console.log('a user connected');
		socket.on('getalluser',function(){
			console.log(2323)
			io.emit('getusersucc',{onlineUsers:onlineUsers,onlineCount:onlineCount});
		});

		socket.on('login',function(obj){
				var userid = obj.userid;
				socket.name = userid;
				if(!onlineUsers.hasOwnProperty(userid)){
					onlineUsers[userid] = obj.username;
					onlineCount ++;
				}

				io.emit('login',{onlineUsers:onlineUsers,onlineCount:onlineCount,user:obj});
				console.log(userid+"加入");
		});

		socket.on('disconnect',function(){
			var userid = socket.name;
			if(onlineCount.hasOwnProperty(userid)){
				var obj = {userid:userid,username:onlineUsers[userid]};
				delete onlineUsers[userid];
				onlineCount --;
			}
			io.emit('login',{onlineUsers:onlineUsers,onlineCount:onlineCount,user:obj});
			console.log(userid+"退出");
		});

		socket.on('message', function(obj){
		//向所有客户端广播发布的消息
		io.emit('message', obj);
		console.log(obj.username+'说：'+obj.content);
	});
});

