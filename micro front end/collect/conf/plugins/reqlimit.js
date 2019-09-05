/**
 * @file YOG2 RAL配置
 * @author fis@baidu.com
 *
 * 负载限制模块
 *
 * reqlimit中间件建议在responseTime或favicon中间件之前加载
 */

/* global yog */

module.exports.reqlimit = {
    /**
     **************************************************************************
     * EventLoop监控间隔，单位为毫秒，值越小检查间隔越小
     * 这个值不建议设置过大，因为一旦延迟超限，eventLoop.interval时间内的请求均会被拒绝
     **************************************************************************/

    // eventLoop: {
    //     interval: 300
    // },

    /**
     * *************************************************************************
     * EventLoop最高延迟，单位为毫秒，超过这个值的请求默认会被拒绝，默认为1000
     * 这个值取决于业务经验值，建议这个值设置在300左右
     **************************************************************************/

    maxDelay: 1000

    /**
     **************************************************************************
     * 是否拒绝的自定义函数
     **************************************************************************/

    // shouldLimit: function (info, conf, cb) {
    //     if (info.delay > conf.maxDelay) {
    //         return cb && cb(null, true);
    //     }
    //     return cb && cb(null, false);
    // },

    /**
     **************************************************************************
     * 每次EventLoop检查时的回调函数，默认用于记录当前的延迟值
     *************************************************************************/

    // onEventLoopTick: function (tick) {
    //     if (tick > 15) {
    //         yog.log.notice('Current eventLoop delay is ' + tick);
    //     }
    // },

    /**
     **************************************************************************
     * 拒绝行为的具体策略，默认为503响应
     **************************************************************************/

    // onLimit: function (req, res, next) {
    //     yog.log.fatal('Request ' + req.url + ' was refused since eventloop delay is too high.');
    //     res.status(503);
    //     res.end('Service Not Avaliable');
    // }
};
