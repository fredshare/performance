/**
 * performance.js
 * author: fredshare
 * email: 644832017@qq.dom
 * Date: 2014-10-24
 */

;+function(host){
    'use strict';
    var performance = host.performance,timing,dnsDuration,tcpDuration,requestDuration,domDuration,whiteTime,domreadyTime,onloadTime,panel,
    container = '<style type="text/css">.performance{position:absolute;z-index:20000;top:50%;left:50%;margin-left:-400px;margin-top:-200px;height:400px;width:800px;background:rgba(0,0,0,.8);font-size:14px;color:#fff;font-weight:700;text-shadow:2px 2px 2px black,-2px -2px 2px #000}#performance-close{position:absolute;top:0;right:0;border:3px solid #fff;width:20px;height:20px;border-radius:20px;line-height:20px;text-align:center;font-family:"Open Sans",arial,sans-serif;font-size:16px;background:#fff;color:#000;text-shadow:none;cursor:pointer}.performance h1{text-align:center}.performance h2{position:absolute;top:30px;right:20px;margin:0;opacity:.3;text-shadow:none;font-style:italic}.performance-wrap{position:absolute;top:50%;left:50%;width:96%;height:96%;color:#fff}.performance-content{position:absolute;top:-50%;left:-50%;width:100%;height:100%}.performance ul{list-style:none;margin:30px;padding:0}.performance li{clear:both;line-height:20px;height:20px}.performance-lab,.performance-bar{display:inline-block;height:16px;float:left}.performance-lab{width:20%;text-align:right;margin-right:20px}.performance-bar{width:70%}.performance-color{display:inline-block;height:16px;width:0;background:#666;box-shadow:2px 2px 2px #000;border-radius:0 2px 2px 0;-webkit-transition:width .5s .6s;-moz-transition:width .5s .6s;-ms-transition:width .5s .6s;transition:width .5s .6s;float:left}.performance-bar-value{float:right;margin-left:10px}.performance-color-b{background:#2D8ED0}.performance-color-r{background:#F40F03}.performance-color-r1{background:#F66603}.performance-color-o{background:#F89F05}.performance-color-o1{background:#FAD304}.performance-color-y{background:#FAD304}.performance-color-g1{background:#F8FE03}.performance-color-g2{background:#B1DF06}.performance-color-g{background:#44D10F}.performance-color-p{background:#AB76E0}</style><div class="performance" id="performance"><div class="performance-wrap"><div class="performance-content"><ul><li id="performance-dnsDuration"><span class="performance-lab">DNS查询耗时:</span> <span class="performance-bar"><em class="performance-color performance-color-p"></em> <span class="performance-bar-value">0ms</span></span></li><li id="performance-tcpDuration"><span class="performance-lab">TCP链接耗时:</span> <span class="performance-bar"><em class="performance-color performance-color-p"></em> <span class="performance-bar-value">0ms</span></span></li><li id="performance-requestDuration"><span class="performance-lab">request请求耗时:</span> <span class="performance-bar"><em class="performance-color performance-color-p"></em> <span class="performance-bar-value">0ms</span></span></li><li id="performance-domDuration"><span class="performance-lab">dom树解析耗时:</span> <span class="performance-bar"><em class="performance-color performance-color-p"></em> <span class="performance-bar-value">0ms</span></span></li><li id="performance-whiteTime"><span class="performance-lab">白屏时间:</span> <span class="performance-bar"><em class="performance-color performance-color-p"></em> <span class="performance-bar-value">0ms</span></span></li><li id="performance-domreadyTime"><span class="performance-lab">domready时间:</span> <span class="performance-bar"><em class="performance-color performance-color-p"></em> <span class="performance-bar-value">0ms</span></span></li><li id="performance-onloadTime"><span class="performance-lab">onload时间:</span> <span class="performance-bar"><em class="performance-color performance-color-p"></em> <span class="performance-bar-value">0ms</span></span></li><li id="performance-js"><span class="performance-lab">js请求个数:</span> <span class="performance-bar"><em class="performance-color performance-color-p"></em> <span class="performance-bar-value">0ms</span></span></li><li id="performance-css"><span class="performance-lab">css请求个数:</span> <span class="performance-bar"><em class="performance-color performance-color-p"></em> <span class="performance-bar-value">0ms</span></span></li><li id="performance-img"><span class="performance-lab">img请求个数:</span> <span class="performance-bar"><em class="performance-color performance-color-p"></em> <span class="performance-bar-value">0ms</span></span></li></ul><h2>performance</h2><div id="performance-close">x</div></div></div></div>',
    getDom = function(str){
        return document.getElementById(str);
    },
    getWidth = function(){
        return window.innerWidth||document.documentElement.clientWidth;
    },
    setPercent = function (id, minSec) {
        var el = getDom('performance-'+id);
        var per = Math.round(minSec/onloadTime * 100);
        if(per){
            per = per * .7;
        }
        el.querySelector('.performance-color').style.width = per + '%';
        el.querySelector('.performance-bar-value').innerHTML = minSec + 'ms';
    },
    initDom = function (){
        var c;
        panel = getDom('performance');
        if(!panel){
            c = document.createElement('div');
            c.innerHTML = container;
            document.body.appendChild(c);
            //document.querySelector('#performance').style.left = '-'+(getWidth()/2)+'px';
            panel = getDom('performance');
        }
    },
    resourceHandler = function(){
        if(performance){
            var resource = performance.getEntries(),js={
                num:0,
                duration:0
            },css={
                num:0,
                duration:0
            },img={
                num:0,
                duration:0
            };
            for (var i = 0; i < resource.length; i++) {
                if(resource[i].initiatorType == 'img'){
                    img.num++;
                    img.duration += resource[i].duration; 
                }else if(resource[i].initiatorType == 'script'){
                    js.num++;
                    js.duration += resource[i].duration; 
                }else if(resource[i].initiatorType == 'css' || resource[i].initiatorType == 'link'){
                    css.num++;
                    css.duration += resource[i].duration;
                }
            };
            return {js:js,css:css,img:img};
        }
    };
    setTimeout(function(){
        if(performance){
            timing = performance.timing;
            dnsDuration = timing.domainLookupEnd - timing.domainLookupStart;
            tcpDuration = timing.connectEnd - timing.connectStart;
            requestDuration = timing.responseEnd - timing.responseStart;
            domDuration = timing.domComplete - timing.domInteractive;
            whiteTime = timing.responseStart - timing.navigationStart;
            domreadyTime = timing.domContentLoadedEventEnd - timing.navigationStart;
            onloadTime = timing.loadEventEnd - timing.navigationStart;
            initDom();
            var resource = resourceHandler();
            document.querySelector('#performance-js').querySelector('.performance-color').innerHTML = resource.js.num;
            document.querySelector('#performance-js').querySelector('.performance-bar-value').innerHTML = (resource.js.duration/1000).toFixed(2) +'s';
            document.querySelector('#performance-css').querySelector('.performance-color').innerHTML = resource.css.num;
            document.querySelector('#performance-css').querySelector('.performance-bar-value').innerHTML = (resource.css.duration/1000).toFixed(2) +'s';
            document.querySelector('#performance-img').querySelector('.performance-color').innerHTML = resource.img.num;
            document.querySelector('#performance-img').querySelector('.performance-bar-value').innerHTML = (resource.img.duration/1000).toFixed(2) +'s';
            setTimeout(function () {
                document.querySelector('.performance').classList.add('anim');
                setPercent('dnsDuration', dnsDuration);
                setPercent('tcpDuration', tcpDuration);
                setPercent('requestDuration', requestDuration);
                setPercent('domDuration', domDuration);
                setPercent('whiteTime', whiteTime);
                setPercent('domreadyTime', domreadyTime);
                setPercent('onloadTime', onloadTime);
                getDom('performance-close').addEventListener('click', function(){
                    panel.parentNode.parentNode.removeChild(panel.parentNode);
                });
            }, 20);
        }else{
            console.log('no performance api');
        }
    }, 500);
}(this);
