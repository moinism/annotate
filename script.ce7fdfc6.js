parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"mpVp":[function(require,module,exports) {
function e(e){return new Promise(function(t,n){var r=new FileReader;r.onload=function(e){t(e.target.result)},r.onerror=function(e){return n(e)},r.readAsDataURL(e)})}function t(t){for(var n=(t.dataTransfer||t.target).files,r=function(t){var r=n[t];e(r).then(function(e){p.images.push({src:e,name:r.name})}).catch(console.error)},a=0;a<n.length;a++)r(a)}function n(e,t,n){n.style.transform="translate3d("+e+"px, "+t+"px, 0)"}function r(e,t,n){n.style.width=e+"px",n.style.height=t+"px"}function a(e){v&&(e.preventDefault(),"touchmove"===e.type?(l=e.touches[0].clientX-h,s=e.touches[0].clientY-m):(l=e.clientX-h,s=e.clientY-m),g=l,f=s,n(l,s,u))}function o(e){"touchstart"===e.type?(h=e.touches[0].clientX-g,m=e.touches[0].clientY-f):(h=e.clientX-g,m=e.clientY-f)}function c(e){h=l,m=s,v=!1,p.onDragEnd(u)}var u,i,d,l,s,h,m,g=0,f=0,v=!1,L=40,b={x:10,y:10,width:L,height:L},p=new Vue({el:"#app",created:function(){},data:{current:0,label:"",images:[],completed:[],fromCenter:!1,currentLabelX:0,currentLabelY:0,currentLabelW:L,currentLabelH:L,currentImageW:900,currentImageH:600,activeTool:"rect",activeColor:"ann-blue"},methods:{onFilesSelected:function(e){t(e)},onImageLoad:function(e,t){var n=e.target,r=p.images[t];r.width=n.width,r.height=n.height},onImageChange:function(){var e=p.images[p.current];p.currentImageW=e.width,p.currentImageH=e.height;var t=e.coordinates||b;p.currentLabelW=t.width,p.currentLabelH=t.height,g=t.x,f=t.y,n(t.x,t.y,u),r(t.width,t.height,u),p.label=e.label||""},onLabelChange:function(){var e=p.images[p.current];e.label=p.label;var t={x:p.currentLabelX,y:p.currentLabelY,width:p.currentLabelW,height:p.currentLabelH};e.coordinates=t;var n=p.completed;n[p.current]={image:e.name,annotations:[{label:e.label,coordinates:t}]},p.completed=[],n.forEach(function(e){p.completed.push(e)})},nextImage:function(){var e=p.current+1;e>p.images.length-1&&(e=0),p.current=e,p.onImageChange()},prevImage:function(){var e=p.current-1;e<0&&(e=p.images.length-1),p.current=e,p.onImageChange()},onDragEnd:function(e){p.currentLabelW=parseInt(e.style.width)||L,p.currentLabelH=parseInt(e.style.height)||L,p.currentLabelX=p.fromCenter?g+Math.round(p.currentLabelW/2):g,p.currentLabelY=p.fromCenter?f+Math.round(p.currentLabelH/2):f},onDragOver:function(e){e.dataTransfer.dropEffect="copy"},onDrop:function(e){t(e)}}});document.addEventListener("DOMContentLoaded",function(){document.getElementById("browser-request").classList.add("hidden"),u=document.getElementById("moveitem"),i=document.getElementById("dragitem"),(d=document.getElementById("draglayer")).addEventListener("touchstart",o,!1),d.addEventListener("touchend",c,!1),d.addEventListener("touchmove",a,!1),i.addEventListener("mousedown",function(){v=!0},!1),i.addEventListener("mouseup",function(){v=!1},!1),d.addEventListener("mousedown",o,!1),d.addEventListener("mouseup",c,!1),d.addEventListener("mousemove",a,!1)});
},{}]},{},["mpVp"], null)
//# sourceMappingURL=/script.ce7fdfc6.js.map