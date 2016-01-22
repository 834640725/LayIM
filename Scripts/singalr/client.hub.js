/*
    @author:fanyuepan
    @createtime:2015-05-15
    @description:chathub client js 
    @v1.0
*/
(function ($) {
    var csHub = {
        option: {
            serverUrl: '',//singalr服务器url
            receiveCallBack: function (result) {
                //返回消息总入口
                console.log(result);
                switch (result.msgtype) {
                    case csHub.messageType.system:
                        //处理系统消息
                        chat.handleSystemMsg(result);
                        break;
                    case csHub.messageType.custom:
                        chat.handleCustomMsg(result);
                        break;
                }
            }
        },
        proxy: {
            proxyCS: null,//singalr客户端代理类
        },
        messageType: {
            system:1,
            custom:2
        },
        //client
        client: {
            init: function () {
                //客户端 receiveMessage 方法
                _this.proxy.proxyCS.client.receiveMessage = function (result) {
                    _this.option.receiveCallBack(result);
                };
            }
        },
        init: function (option) {
            $.extend(_this.option, option);
            _this.server.init();//服务端代码初始化  
            _this.client.init();//客户端代码初始化

        },
        //server
        server: {
            //server初始化
            init: function () {
                this.connect();
                _this.proxy.proxyCS.client.clientOnConnectedCallBack = this.connectCallBack;
            },
            //连接服务器
            connect: function () {
                $.connection.hub.url = _this.option.serverUrl;
                _this.proxy.proxyCS = $.connection.csHub;
                $.connection.hub.start({ jsonp: true }).done(function () {
                    //连接服务器
                    //TODO处理聊天界面之前的逻辑
                    console.log('连接成功');
                }).fail(function () {
                    console.log("连接失败");
                });
            },
            //单人聊天
            ctoc: function (sid, rid) {
                //调用hub的clientToClient方法
                if (!chat.isConnected(rid)) {
                    //如果没有连接过，进行连接
                    console.log("用户 " + rid + "没有连接过...");
                    _this.proxy.proxyCS.server.clientToClient(sid, rid);
                } else {
                    console.log("用户 " + rid + "已经连接过了，不需要连接了...");
                }
            },
            ctocsend: function (msg, userid, username, userphoto,rid) {
                var sendObj = {
                    msg: msg,
                    fromuser: {
                        userid: userid,
                        username: username,
                        photo:userphoto
                    },
                    touser: {
                        userid:rid
                    }
                };
                _this.proxy.proxyCS.server.clientSendMsgToClient(sendObj);
            },
            //连接成功之后回调
            connectCallBack: function (result) {
                console.log(result);
            }
        }
    };
    var _this = csHub;
    //聊天信息处理
    var chat = {
        cache: {},
        handleSystemMsg: function (result) {
            var groupname = result.fromuser.groupname;//连接成功的组，如果已经连接成功，那么没有必要下次点击再次连接
            this.cache[result.other.receiveid] = "ok";//代表我已经和当前聊天人已经连接上了，下次点击没必要再次连接
        },
        handleCustomMsg: function (result) {
            var log = {};
            var keys = 'one' + result.touser.userid;//接收人
            var keys1 = 'one' + result.fromuser.userid;
            //拿到消息存储
            log.imarea = $('#layim_area' + keys);//layim_areaone0
            if (!log.imarea.length) {
                log.imarea = $('#layim_area' + keys1);//layim_areaone0
            }
            log.html = function (param, type) {
                return '<li class="' + (type === 'me' ? 'layim_chateme' : '') + '">'
                    + '<div class="layim_chatuser">'
                        + function () {
                            if (type === 'me') {
                                return '<span class="layim_chattime">' + param.time + '</span>'
                                       + '<span class="layim_chatname">' + param.name + '</span>'
                                       + '<img src="' + param.face + '" >';
                            } else {
                                return '<img src="' + param.face + '" >'
                                       + '<span class="layim_chatname">' + param.name + '</span>'
                                       + '<span class="layim_chattime">' + param.time + '</span>';
                            }
                        }()
                    + '</div>'
                    + '<div class="layim_chatsay">' + param.content + '<em class="layim_zero"></em></div>'
                + '</li>';
            };
            //上述代码还是layim里的代码，只不过拼接html的时候，参数采用signalR返回的参数
            var type = result.fromuser.userid == currentUser.id ? "me" : "";//如果发送人的id==当前用户的id，那么这条消息类型为me
            //拼接url
            log.imarea.append(log.html({
                time: result.addtime,
                name: result.fromuser.username,
                face: result.fromuser.photo,
                content: result.msg
            }, type));
            log.imarea.scrollTop(log.imarea[0].scrollHeight);
        },
        isConnected: function (rid) {
            return this.cache[rid] === "ok";
        }
    };
    _this.chat = chat;
    window.csClient = _this;
})($);

