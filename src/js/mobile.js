// (function(doc, win,designWidth,minWidth,maxWidth) {
//     var dpr, rem, scale;
//     var docEl = document.documentElement;
//     var fontEl = document.createElement('style');
//     var metaEl = document.querySelector('meta[name="viewport"]');
//     var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    
//     function resizeWindow() {

//         var width = docEl.clientWidth;
//         var dpr = window.devicePixelRatio || 1;

//         if (width > maxWidth) {
//             width = maxWidth;
//         }
//         if (width < minWidth ) {
//             width = minWidth;
//         }
        
//         rem = ( 100 * width  / designWidth ) * dpr;
//         scale = 1 / dpr;


//         // 设置viewport，进行缩放，达到高清效果
//         metaEl.setAttribute('content', 'width=' + dpr * width + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');

//         // 设置data-dpr属性，留作的css hack之用
//         //docEl.setAttribute('data-dpr', dpr);
//         // 动态写入样式
//         //docEl.firstElementChild.appendChild(fontEl);
//         //fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';

//         window.dpr = dpr;
//         window.rem = rem;

//         docEl.dataset.dpr = dpr;
//         docEl.dataset.width = width;
//         docEl.dataset.rem = rem;
//         docEl.style.fontSize = rem + 'px';
//     }

//     // 给js调用的，某一dpr下rem和px之间的转换函数
//     window.rem2px = function(v) {
//         v = parseFloat(v);
//         return v * rem;
//     };
//     window.px2rem = function(v) {
//         v = parseFloat(v);
//         return v / rem;
//     };

//     resizeWindow();

//     // if (!doc.addEventListener) return;
//     // win.addEventListener(resizeEvt, function(){
//     //     width = docEl.clientWidth;
//     // }, false);

// })(document, window,750,320,750);


(function(doc, win,designWidth,minWidth,maxWidth) {
    var browser = {
        versions: function () {
          var u = navigator.userAgent;
          return {   //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
          };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };

    var docEl = doc.documentElement,
    docElWidth = docEl.clientWidth,
    isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    dpr = win.devicePixelRatio,
    dpr = browser.versions.android ? 1 : window.top === window.self ? dpr : 1, 
    scale = 1 / dpr,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var recalc = function() {
      docElWidth = docEl.clientWidth;
      var width = docElWidth;
      if (width > maxWidth) {
        width = maxWidth;
      }
      if (width < minWidth ) {
        width = minWidth;
      }
      docEl.dataset.dpr = dpr;
      docEl.dataset.width = width;
      docEl.dataset.rem = 100 * ( width / (designWidth) );
      docEl.style.fontSize = 100 * ( width / (designWidth) ) + 'px';
    };
    recalc();
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
})(document, window,750,320,414);

//修正页面高度100%的渲染错误
//document.documentElement.style.height = window.innerHeight + 'px'; 