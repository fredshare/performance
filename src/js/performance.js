/**
 * performance.js
 * author: fredshare
 * email: 644832017@qq.dom
 * Date: 2014-10-24
 */

;+function(host){
    'use strict';
    var performance = host.performance
    ,timing
    ,readyStart
    ,redirectTime
    ,appcacheTime
    ,unloadEventTime
    ,lookupDomainTime
    ,connectTime
    ,requestTime
    ,initDomTreeTime
    ,domReadyTime
    ,loadEventTime
    ,loadTime
    ,getEl
    ,setPercent
    ,initDom
    ,domStr = ''
    ,panel;
    getEl = function(str){
        return document.getElementById(str);
    };
    setPercent = function (id, minSec) {
        var el = getEl('performanceTracer-'+id);
        var per = Math.round(minSec/loadTime * 100);
        if(per){
            per = per * .8;
        }
        el.querySelector('.performanceTracer-color').style.width = per + '%';
        el.querySelector('.performanceTracer-bar-value').innerHTML = minSec + 'ms';
    };
    initDom = function (){
        var c;
        panel = getEl('performanceTracer');
        if(!panel){
            c = document.createElement('div');
            c.innerHTML = domStr;
            document.body.appendChild(c);
            panel = getEl('performanceTracer');
        }
    };
    setTimeout(function(){
        if(performance){
            timing = performance.timing;
            console.log(performance.timing);
            readyStart = timing.fetchStart - timing.navigationStart;
            redirectTime = timing.redirectEnd  - timing.redirectStart;
            appcacheTime = timing.domainLookupStart  - timing.fetchStart;
            unloadEventTime = timing.unloadEventEnd - timing.unloadEventStart;
            lookupDomainTime = timing.domainLookupEnd - timing.domainLookupStart;
            connectTime = timing.connectEnd - timing.connectStart;
            requestTime = timing.responseEnd - timing.requestStart;
            initDomTreeTime = timing.domInteractive - timing.responseEnd;
            domReadyTime = timing.domComplete - timing.domInteractive; //过早获取时 domComplete有时会是0
            loadEventTime = timing.loadEventEnd - timing.loadEventStart;
            loadTime = timing.loadEventEnd - timing.navigationStart;//过早获取时 loadEventEnd有时会是0

            initDom();

            getEl('performanceTracer-loadTime').innerHTML = '('+ loadTime +')ms';

            console.log('准备新页面时间耗时: ' + readyStart);
            console.log('redirect 重定向耗时: ' + redirectTime);
            console.log('Appcache 耗时: ' + appcacheTime);
            console.log('unload 前文档耗时: ' + unloadEventTime);
            console.log('DNS 查询耗时: ' + lookupDomainTime);
            console.log('TCP连接耗时: ' + connectTime);
            console.log('request请求耗时: ' + requestTime);
            console.log('请求完毕至DOM加载: ' + initDomTreeTime);
            console.log('解释dom树耗时: ' + domReadyTime);
            console.log('load事件耗时: ' + loadEventTime);
            console.log('从开始至load总耗时: ' + loadTime);

            setTimeout(function () {
                document.querySelector('.performanceTracer').classList.add('anim');
                setPercent('readyStart', readyStart);
                setPercent('redirectTime', redirectTime);
                setPercent('appcacheTime', appcacheTime);
                setPercent('unloadEventTime', unloadEventTime);
                setPercent('lookupDomainTime', lookupDomainTime);
                setPercent('connectTime', connectTime);
                setPercent('requestTime', requestTime);
                setPercent('initDomTreeTime', initDomTreeTime);
                setPercent('domReadyTime', domReadyTime);
                setPercent('loadEventTime', loadEventTime);
                getEl('performanceTracer-close').addEventListener('click', function(){
                    panel.parentNode.parentNode.removeChild(panel.parentNode);
                });
            }, 20);
        }else{
            console.log('no performance api');
        }
    }, 500);
<<<<<<< HEAD
}(this);
=======
}(this);
>>>>>>> ccbafffb8bf507e674f2d8da84f2abc4a706b58f
