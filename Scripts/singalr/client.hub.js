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
                console.log("你收到了新消息：" + result);//用户自定义回调
            }
        },
        proxy: {
            proxyCS: null,//singalr客户端代理类
        },
        messageType: {
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
                    _this.proxy.proxyCS.server.join();
                    console.log('连接成功');
                }).fail(function () {
                    console.log("连接失败");
                });
            },
            //连接成功之后回调
            connectCallBack: function (result) {
                console.log(result);
            }
        }
    };
    var _this = csHub;
    window.csClient = _this;
})($);
