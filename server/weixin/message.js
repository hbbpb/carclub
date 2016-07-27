/**
 * Copyright carclub.lipengbo.com
 * Author: hbbpbb@gmail.com
 */
define([
    'q',
    'hbb-weixin-api',
    '../logger',
    '../api/common',
    '../model/Car',
    '../model/MoveLog'
], function (Q, weixin, logger, common, Car, MoveLog) {
    'use strict';

    var helpMessage = '＝＝GC车友会帮助菜单＝＝\n' +
        '1.常用服务：回复车牌号码最后3位，获取车主信息。（字母不区分大小写，如车牌“陕A12T45“，回复“t45”即可）\n' +
        '---------------------\n' +
        '2.高级服务：发送车牌照片，获取车主信息。\n' +
        '---------------------\n' +
        '3.银牌服务：扫一扫［GC车友会定制二维码］，车主自动来挪车。\n' +
        '---------------------\n' +
        '4.金牌服务：预约挪车，定时定点专人挪车；预约车位，定时定点预约车位。\n' +
        '---------------------\n' +
        '5.钻石服务：没有做不到，只有想不到，绕车走三圈，手机摇一摇，障碍车就地消失，心诚则灵。\n' +
        '---------------------\n';

    function getBindMessage(openID) {
        var deferred = Q.defer();
        var message = '';
        //检查是否为绑定用户，如果不是，输出提示信息
        Car.findOne({'WX.openID': openID}, function (err, doc) {
            if (err) {
                logger.error(JSON.stringify(err));
            } else {
                if (doc && doc._id) {
                    //是绑定用户
                } else {
                    //非绑定用户
                    message = '对不起，您还不是绑定用户，系统无法为您提供服务，请先完成绑定。\n\n' +
                        '<a href="http://carclub.lipengbo.com/#/addcar/bind/' + openID + '">点此绑定>>></a>';
                }
            }
            deferred.resolve(message);
        });
        return deferred.promise;
    }

    function getUserName(carNumber) {
        var deferred = Q.defer();
        var name = carNumber;
        Car.findOne({'Car.number': carNumber}, function (err, doc) {
            if (err) {
                logger.error(JSON.stringify(err));
            } else {
                if (doc && doc._id) {
                    name = doc.User.name;
                }
            }
            deferred.resolve(name);
        });
        return deferred.promise;
    }

    function getUpgradeMessage(openID) {
        var deferred = Q.defer();
        Q.fcall(getBindMessage, openID)
            .then(function (message) {
                if (message == null || message === '') {
                    message = '对不起，您还不是金牌用户，不能为您提供金牌服务。\n\n' +
                        '<a href="http://carclub.lipengbo.com/#/upgrade/' + openID + '">我任性，我升级>>></a>\n';
                }
                deferred.resolve(message);
            });
        return deferred.promise;
    }

//    function getRankingMessage(openID) {
//        var deferred = Q.defer();
//        Q.fcall(getBindMessage, openID)
//            .then(function (message) {
//                if (message == null || message === '') {
//                    message = '风云榜数据采集中。。。即将推出，敬请期待！我们的口号是：挡的就是你，就要上头条！！！\n';
//                }
//                deferred.resolve(message);
//            });
//        return deferred.promise;
//    }

    function insertMoveLog(userID, createTime, carNumber) {
        //先根据WX服务器传过来的createTime查询数据是否已经存在。
        MoveLog.findOne({
            moveCarNumber: carNumber,
            userID: userID,
            createTime: createTime
        }, function (err, doc) {
            if (err) {
                logger.error(JSON.stringify(err));
                return;
            }
            if (doc && doc._id) {
                //防止WX服务器5S未收到响应发送三次请求导致数据重复。
                return;
            }
            var moveLog = new MoveLog();
            moveLog.userID = userID;
            moveLog.createTime = createTime;
            moveLog.moveCarNumber = carNumber;
            moveLog.moveTime = Date.now();
            moveLog.save(function (err) {
                if (err) {
                    logger.error(JSON.stringify(err));
                }
            });
        });
    }

    function sendCarInfo(query, msg, resMsg) {
        logger.info(JSON.stringify(query));
        Car.findOne(query, function (err, doc) {
            if (err) {
                logger.error(JSON.stringify(err));
            } else if (doc && doc._id) {
                resMsg.content = '这是［' + doc.User.name + '］的爱车\n' +
                    '用户级别：' + common.getUserGradeText(doc.User.grade) + '\n' +
                    '车牌号码：' + common.getCarNumber(doc.Car.number) + '\n' +
                    '挪车电话：' + doc.Phone.mobile + '\n' +
                    'GC分机：' + common.getTextOrEmpty(doc.Phone.gcPhone) + '\n' +
                    '挪车心情：' + common.getTextOrEmpty(doc.User.mood) + '\n';

                logger.debug('判断email');
                if (doc.User.email) {
                    logger.debug('有email');
                    resMsg.content += '\n' + '<a href="http://carclub.lipengbo.com/#/appointment/' + doc.Car.number + '/' + msg.fromUserName + '">预约挪车>>></a>';
                } else {
                    logger.debug('没有email');
                }

                if (doc.WX && msg.fromUserName === doc.WX.openID) {
                    //自己查询自己，不产生挪车log
                } else {
                    insertMoveLog(msg.fromUserName, msg.createTime, doc.Car.number);
                }
            }
            //检查是否为绑定用户，如果不是，输出提示信息
            Q.fcall(getBindMessage, msg.fromUserName)
                .then(function (message) {
                    if (message && message.length) {
                        resMsg.content = message;
                    }
                    weixin.sendMsg(resMsg);
                });
        });
    }

    function sendMyCarInfo(openID, resMsg) {
        Car.findOne({'WX.openID': openID}, function (err, doc) {
            if (err) {
                logger.error(JSON.stringify(err));
            } else if (doc && doc._id) {
                resMsg.content = '车牌号码：' + doc.Car.number + '\n' +
                    '车辆品牌：' + common.getTextOrEmpty(doc.Car.brand) + '\n' +
                    '车主姓名：' + doc.User.name + '\n' +
                    '用户级别：' + common.getUserGradeText(doc.User.grade) + '\n' +
                    '挪车电话：' + doc.Phone.mobile + '\n' +
                    'GC分机：' + common.getTextOrEmpty(doc.Phone.gcPhone) + '\n' +
                    '电子邮件：' + doc.User.email + '\n' +
                    '挪车心情：' + common.getTextOrEmpty(doc.User.mood) + '\n\n' +
                    '<a href="http://carclub.lipengbo.com/#/addcar/edit/' + openID + '">点此编辑>>></a>\t' +
                    '<a href="http://carclub.lipengbo.com/#/qrcode/' + openID + '">查二维码>>></a>';
            } else {
                //非绑定用户
                resMsg.content = '您还不是绑定用户，无法使用高级功能。\n' +
                    '<a href="http://carclub.lipengbo.com/#/addcar/bind/' + openID + '">点此绑定>>></a>\n';
            }
            weixin.sendMsg(resMsg);
        });
    }

    function bind() {
        //监听文本消息
        weixin.textMsg(function (msg) {
            logger.info('textMsg received');
            logger.info(JSON.stringify(msg));

            var resMsg = {
                fromUserName: msg.toUserName,
                toUserName: msg.fromUserName,
                msgType: 'text',
                content: helpMessage,
                funcFlag: 0
            };

            var query = {_id: new RegExp(common.getSafeText(msg.content) + '$', 'i')};
            sendCarInfo(query, msg, resMsg);
        });

        //监听语音消息
        weixin.voiceMsg(function (msg) {
            logger.info('voiceMsg received');
            logger.info(JSON.stringify(msg));

            var resMsg = {
                fromUserName: msg.toUserName,
                toUserName: msg.fromUserName,
                msgType: 'text',
                content: '亲，口音不对吧？没有查到您需要的信息，要不您纠正纠正？\n',
                funcFlag: 0
            };

            var text = common.getSafeText(msg.recognition);
            var textArray = ['.*'];
            for (var i = 0; i < text.length; i++) {
                var char = text[i];
                textArray.push(char);
                textArray.push('[A-Z]{0,2}');
            }
            var regText = textArray.join('');
            var query = {_id: new RegExp(regText, 'i')};
            sendCarInfo(query, msg, resMsg);
        });

        //监听事件消息
        weixin.eventMsg(function (msg) {
            logger.info('eventMsg received');
            logger.info(JSON.stringify(msg));

            var resMsg = {
                fromUserName: msg.toUserName,
                toUserName: msg.fromUserName,
                msgType: 'text',
                content: '＝＝GC车友会帮助菜单＝＝\n' +
                'GC旗下专业车友服务，专注挪车30年！\n' +
                '回复车牌号码最后3位，获取车主信息。\n',
                funcFlag: 0
            };

            //新用户订阅
            if (msg.event === 'subscribe') {
                //检查是否为绑定用户，如果不是，输出提示信息
                Q.fcall(getBindMessage, msg.fromUserName)
                    .then(function (message) {
                        if (message && message.length) {
                            resMsg.content += '\n' + message;
                        }
                        weixin.sendMsg(resMsg);
                    });
                return;
            }

            //求挪车 发送文字
            if (msg.event === 'CLICK' && msg.eventKey === 'menuText_0_0') {
                resMsg.content = '回复车牌号码最后3位，获取车主信息，字母不区分大小写，如车牌“陕A12T45“，回复“t45”即可。\n';
                weixin.sendMsg(resMsg);
                return;
            }

            //求挪车 发送语音
            if (msg.event === 'CLICK' && msg.eventKey === 'menuVoice_0_1') {
                resMsg.content = '按住小喇叭，大声朗读车牌号码中的数字，字母不用发音，如车牌“陕A12T45“，朗读“1245”即可。\n';
                weixin.sendMsg(resMsg);
                return;
            }

            //求挪车 发车牌照
            if (msg.event === 'pic_photo_or_album' && msg.eventKey === 'menuImage_0_2') {
                Q.fcall(getUpgradeMessage, msg.fromUserName)
                    .then(function (message) {
                        resMsg.content = message;
                        weixin.sendMsg(resMsg);
                    });
                return;
            }

            //求挪车 扫二维码
            if (msg.event === 'scancode_waitmsg' && msg.eventKey === 'menuCode_0_3') {
                Q.fcall(getBindMessage, msg.fromUserName)
                    .then(function (message) {
                        if (message == null || message === '') {
                            var scanResult;
                            if (msg.data.ScanCodeInfo && msg.data.ScanCodeInfo[0] && msg.data.ScanCodeInfo[0].ScanResult) {
                                scanResult = msg.data.ScanCodeInfo[0].ScanResult[0];
                            }
                            if (scanResult) {
                                var query = {'WX.uuid': scanResult};
                                sendCarInfo(query, msg, resMsg);
                            } else {
                                weixin.sendMsg(resMsg);
                            }
                        } else {
                            resMsg.content = message;
                            weixin.sendMsg(resMsg);
                        }
                    });
                return;
            }

            //风云榜
            if (msg.event === 'CLICK' && (msg.eventKey === 'menuWeekRank_1_0' || msg.eventKey === 'menuMonthRank_1_1' || msg.eventKey === 'menuYearRank_1_2')) {
                Q.fcall(getBindMessage, msg.fromUserName)
                    .then(function (message) {
                        if (message === null || message === '') {
                            var now = Date.now();
                            var beginTime = new Date(now);
                            var nowTime = new Date(now);
                            var title = '';
                            var ben = '';
                            if (msg.eventKey === 'menuWeekRank_1_0') {
                                beginTime = beginTime.setDate(nowTime.getDate() - 7);
                                title = '一周风云榜';
                                ben = '本周';
                            } else if (msg.eventKey === 'menuMonthRank_1_1') {
                                beginTime = beginTime.setMonth(nowTime.getMonth() - 1);
                                title = '月度风云榜';
                                ben = '本月';
                            } else if (msg.eventKey === 'menuYearRank_1_2') {
                                beginTime = beginTime.setFullYear(nowTime.getFullYear() - 1);
                                title = '年度风云榜';
                                ben = '本年';
                            }
                            beginTime = new Date(beginTime);
                            logger.info('beginTime：' + beginTime);
                            MoveLog.aggregate()
                                .match({moveTime: {$gte: beginTime}})
                                .group({_id: '$moveCarNumber', count: {$sum: 1}})
                                .exec(function (err, docs) {
                                    if (err) {
                                        logger.error(JSON.stringify(err));
                                        weixin.sendMsg(resMsg);
                                    } else {
                                        docs.sort(function (car1, car2) {
                                            if (car1.count > car2.count) {
                                                return -1;
                                            } else if (car1.count < car2.count) {
                                                return 1;
                                            } else {
                                                return 0;
                                            }
                                        });
                                        if (docs && docs.length >= 3) {
                                            docs = docs.slice(0, 3); //只保留前三甲
                                        } else {
                                            //数据不足，返回提示信息
                                            resMsg.content = '此时间段交通状况良好，没有上榜用户，请选择其他时间段。';
                                            weixin.sendMsg(resMsg);
                                            return;
                                        }


                                        Q.all(docs.map(function (doc) {
                                            return getUserName(doc._id);
                                        }))
                                            .then(function (names) {
                                                var articles = [];
                                                articles[0] = {
                                                    title: title + ' 之 霸道青年前三甲',
                                                    description: title,
                                                    picUrl: 'https://mmbiz.qlogo.cn/mmbiz/6BvF0PjKRiapujGgOWs2oLk67Q4wKiacRlPJQz5tZz0HlsUaM6G3GUsK7Vr2aLYpyaVdAVWn9DGa38RKcbAjukHg/0',
                                                    url: 'http://carclub.lipengbo.com/#/rank'
                                                };
                                                articles[1] = {
                                                    title: '状元：' + names[0] + '\n' + ben + '挪车' + docs[0].count + '次',
                                                    description: '挪车状元',
                                                    picUrl: 'https://mmbiz.qlogo.cn/mmbiz/6BvF0PjKRiapujGgOWs2oLk67Q4wKiacRljKdEwxPQiccGciaZw4kiaYeEQmIfFuPJXMYSld904Yrpsza6EoiaoabXNA/0',
                                                    url: 'http://carclub.lipengbo.com/#/rank'
                                                };
                                                articles[2] = {
                                                    title: '榜眼：' + names[1] + '\n' + ben + '挪车' + docs[1].count + '次',
                                                    description: '挪车榜眼',
                                                    picUrl: 'https://mmbiz.qlogo.cn/mmbiz/6BvF0PjKRiapujGgOWs2oLk67Q4wKiacRlL5Xtr6ABHC154ibqXqH0CgJzRLwGDnFtuAyUqkO2YLfECic6XBXrDFrg/0',
                                                    url: 'http://carclub.lipengbo.com/#/rank'
                                                };
                                                articles[3] = {
                                                    title: '探花：' + names[2] + '\n' + ben + '挪车' + docs[2].count + '次',
                                                    description: '挪车探花',
                                                    picUrl: 'https://mmbiz.qlogo.cn/mmbiz/6BvF0PjKRiapujGgOWs2oLk67Q4wKiacRlPa4Hbf4x1c05Np6FQicbrBAe5cU7ohtOF5o7qwDPeVda8dFhW7GzibKA/0',
                                                    url: 'http://carclub.lipengbo.com/#/rank'
                                                };

                                                //返回图文消息
                                                resMsg = {
                                                    fromUserName: msg.toUserName,
                                                    toUserName: msg.fromUserName,
                                                    msgType: 'news',
                                                    articles: articles,
                                                    funcFlag: 0
                                                };
                                                weixin.sendMsg(resMsg);
                                            });
                                    }
                                });
                        } else {
                            //非绑定用户
                            resMsg.content = message;
                            weixin.sendMsg(resMsg);
                        }
                    });
                return;
            }

            //高级服务 我的爱车
            if (msg.event === 'CLICK' && msg.eventKey === 'menuMyCar_2_0') {
                Q.fcall(sendMyCarInfo, msg.fromUserName, resMsg);
                return;
            }

            //高级服务 预约挪车
            if (msg.event === 'CLICK' && msg.eventKey === 'menuAppointment_2_1') {
                Q.fcall(getBindMessage, msg.fromUserName)
                    .then(function (message) {
                        if (message == null || message === '') {
                            message = '首先［求挪车］，如果对方也是绑定用户，将会看到［预约挪车］链接，点击链接进行预约挪车。';
                        }
                        resMsg.content = message;
                        weixin.sendMsg(resMsg);
                    });
                return;
            }

            //高级服务 预约车位
            if (msg.event === 'CLICK' && msg.eventKey === 'menuCarport_2_2') {
                Q.fcall(getUpgradeMessage, msg.fromUserName)
                    .then(function (message) {
                        resMsg.content = message;
                        weixin.sendMsg(resMsg);
                    });
                return;
            }

            //高级服务 更多帮助
            if (msg.event === 'CLICK' && msg.eventKey === 'menuHelp_2_3') {
                resMsg.content = helpMessage;
                //检查是否为绑定用户，如果不是，输出提示信息
                Q.fcall(getBindMessage, msg.fromUserName)
                    .then(function (message) {
                        if (message && message.length) {
                            resMsg.content += '\n' + message;
                        }
                        weixin.sendMsg(resMsg);
                    });
                return;
            }
        });

        //监听图片消息
        weixin.imageMsg(function (msg) {
            logger.info('imageMsg received');
            logger.info(JSON.stringify(msg));

            var resMsg = {
                fromUserName: msg.toUserName,
                toUserName: msg.fromUserName,
                msgType: 'text',
                content: '',
                funcFlag: 0
            };

            Q.fcall(getUpgradeMessage, msg.fromUserName)
                .then(function (message) {
                    resMsg.content = message;
                    weixin.sendMsg(resMsg);
                });
            return;
        });

        //监听位置消息
        weixin.locationMsg(function (msg) {
            logger.info('locationMsg received');
            logger.info(JSON.stringify(msg));
        });

        //监听链接消息
        weixin.urlMsg(function (msg) {
            logger.info('urlMsg received');
            logger.info(JSON.stringify(msg));
        });
    }

    return {
        bind: bind
    };
});