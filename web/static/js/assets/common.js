webpackJsonp([5,6],{182:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(195),o=(n.n(r),{appname:"云收银",url_host:window.location.host,background:"#FBF9FE"});t.default=o},195:function(e,t,n){var r=n(453),o=n(454),i=[n(451)];e.exports=r.createStore(o,i)},451:function(e,t,n){function r(){return n(452),{}}e.exports=r},452:function(module,exports){"object"!=typeof JSON&&(JSON={}),function(){"use strict";function f(e){return e<10?"0"+e:e}function this_value(){return this.valueOf()}function quote(e){return rx_escapable.lastIndex=0,rx_escapable.test(e)?'"'+e.replace(rx_escapable,function(e){var t=meta[e];return"string"==typeof t?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,r,o,i,a,u=gap,c=t[e];switch(c&&"object"==typeof c&&"function"==typeof c.toJSON&&(c=c.toJSON(e)),"function"==typeof rep&&(c=rep.call(t,e,c)),typeof c){case"string":return quote(c);case"number":return isFinite(c)?String(c):"null";case"boolean":case"null":return String(c);case"object":if(!c)return"null";if(gap+=indent,a=[],"[object Array]"===Object.prototype.toString.apply(c)){for(i=c.length,n=0;n<i;n+=1)a[n]=str(n,c)||"null";return o=0===a.length?"[]":gap?"[\n"+gap+a.join(",\n"+gap)+"\n"+u+"]":"["+a.join(",")+"]",gap=u,o}if(rep&&"object"==typeof rep)for(i=rep.length,n=0;n<i;n+=1)"string"==typeof rep[n]&&(r=rep[n],(o=str(r,c))&&a.push(quote(r)+(gap?": ":":")+o));else for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(o=str(r,c))&&a.push(quote(r)+(gap?": ":":")+o);return o=0===a.length?"{}":gap?"{\n"+gap+a.join(",\n"+gap)+"\n"+u+"}":"{"+a.join(",")+"}",gap=u,o}}var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value);var gap,indent,meta,rep;"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(e,t,n){var r;if(gap="",indent="","number"==typeof n)for(r=0;r<n;r+=1)indent+=" ";else"string"==typeof n&&(indent=n);if(rep=t,t&&"function"!=typeof t&&("object"!=typeof t||"number"!=typeof t.length))throw new Error("JSON.stringify");return str("",{"":e})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(e,t){var n,r,o=e[t];if(o&&"object"==typeof o)for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(r=walk(o,n),void 0!==r?o[n]=r:delete o[n]);return reviver.call(e,t,o)}var j;if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}()},453:function(e,t,n){function r(){var e="undefined"==typeof console?null:console;if(e){(e.warn?e.warn:e.log).apply(e,arguments)}}function o(e,t,n){n||(n=""),e&&!l(e)&&(e=[e]),t&&!l(t)&&(t=[t]);var o=n?"__storejs_"+n+"_":"",i=n?new RegExp("^"+o):null;if(!/^[a-zA-Z0-9_\-]*$/.test(n))throw new Error("store.js namespaces can only have alphanumerics + underscores and dashes");var d={_namespacePrefix:o,_namespaceRegexp:i,_testStorage:function(e){try{var t="__storejs__test__";e.write(t,t);var n=e.read(t)===t;return e.remove(t),n}catch(e){return!1}},_assignPluginFnProp:function(e,t){var n=this[t];this[t]=function(){function t(){if(n)return c(arguments,function(e,t){r[t]=e}),n.apply(o,r)}var r=a(arguments,0),o=this,i=[t].concat(r);return e.apply(o,i)}},_serialize:function(e){return JSON.stringify(e)},_deserialize:function(e,t){if(!e)return t;var n="";try{n=JSON.parse(e)}catch(t){n=e}return void 0!==n?n:t},_addStorage:function(e){this.enabled||this._testStorage(e)&&(this.storage=e,this.enabled=!0)},_addPlugin:function(e){var t=this;if(l(e))return void c(e,function(e){t._addPlugin(e)});if(!u(this.plugins,function(t){return e===t})){if(this.plugins.push(e),!p(e))throw new Error("Plugins must be function values that return objects");var n=e.call(this);if(!g(n))throw new Error("Plugins must return an object of function properties");c(n,function(n,r){if(!p(n))throw new Error("Bad plugin property: "+r+" from plugin "+e.name+". Plugins should only return functions.");t._assignPluginFnProp(n,r)})}},addStorage:function(e){r("store.addStorage(storage) is deprecated. Use createStore([storages])"),this._addStorage(e)}},v=f(d,h,{plugins:[]});return v.raw={},c(v,function(e,t){p(e)&&(v.raw[t]=s(v,e))}),c(e,function(e){v._addStorage(e)}),c(t,function(e){v._addPlugin(e)}),v}var i=n(55),a=i.slice,u=i.pluck,c=i.each,s=i.bind,f=i.create,l=i.isList,p=i.isFunction,g=i.isObject;e.exports={createStore:o};var h={version:"2.0.12",enabled:!1,get:function(e,t){var n=this.storage.read(this._namespacePrefix+e);return this._deserialize(n,t)},set:function(e,t){return void 0===t?this.remove(e):(this.storage.write(this._namespacePrefix+e,this._serialize(t)),t)},remove:function(e){this.storage.remove(this._namespacePrefix+e)},each:function(e){var t=this;this.storage.each(function(n,r){e.call(t,t._deserialize(n),(r||"").replace(t._namespaceRegexp,""))})},clearAll:function(){this.storage.clearAll()},hasNamespace:function(e){return this._namespacePrefix=="__storejs_"+e+"_"},createStore:function(){return o.apply(this,arguments)},addPlugin:function(e){this._addPlugin(e)},namespace:function(e){return o(this.storage,this.plugins,e)}}},454:function(e,t,n){e.exports=[n(456),n(458),n(459),n(455),n(460),n(457)]},455:function(e,t,n){function r(e){if(!e||!c(e))return null;var t="(?:^|.*;\\s*)"+escape(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*";return unescape(p.cookie.replace(new RegExp(t),"$1"))}function o(e){for(var t=p.cookie.split(/; ?/g),n=t.length-1;n>=0;n--)if(l(t[n])){var r=t[n].split("="),o=unescape(r[0]),i=unescape(r[1]);e(i,o)}}function i(e,t){e&&(p.cookie=escape(e)+"="+escape(t)+"; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/")}function a(e){e&&c(e)&&(p.cookie=escape(e)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/")}function u(){o(function(e,t){a(t)})}function c(e){return new RegExp("(?:^|;\\s*)"+escape(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(p.cookie)}var s=n(55),f=s.Global,l=s.trim;e.exports={name:"cookieStorage",read:r,write:i,each:o,remove:a,clearAll:u};var p=f.document},456:function(e,t,n){function r(){return f.localStorage}function o(e){return r().getItem(e)}function i(e,t){return r().setItem(e,t)}function a(e){for(var t=r().length-1;t>=0;t--){var n=r().key(t);e(o(n),n)}}function u(e){return r().removeItem(e)}function c(){return r().clear()}var s=n(55),f=s.Global;e.exports={name:"localStorage",read:o,write:i,each:a,remove:u,clearAll:c}},457:function(e,t){function n(e){return u[e]}function r(e,t){u[e]=t}function o(e){for(var t in u)u.hasOwnProperty(t)&&e(u[t],t)}function i(e){delete u[e]}function a(e){u={}}e.exports={name:"memoryStorage",read:n,write:r,each:o,remove:i,clearAll:a};var u={}},458:function(e,t,n){function r(e){return f[e]}function o(e,t){f[e]=t}function i(e){for(var t=f.length-1;t>=0;t--){var n=f.key(t);e(f[n],n)}}function a(e){return f.removeItem(e)}function u(){i(function(e,t){delete f[e]})}var c=n(55),s=c.Global;e.exports={name:"oldFF-globalStorage",read:r,write:o,each:i,remove:a,clearAll:u};var f=s.globalStorage},459:function(e,t,n){function r(e,t){if(!h){var n=c(e);g(function(e){e.setAttribute(n,t),e.save(l)})}}function o(e){if(!h){var t=c(e),n=null;return g(function(e){n=e.getAttribute(t)}),n}}function i(e){g(function(t){for(var n=t.XMLDocument.documentElement.attributes,r=n.length-1;r>=0;r--){var o=n[r];e(t.getAttribute(o.name),o.name)}})}function a(e){var t=c(e);g(function(e){e.removeAttribute(t),e.save(l)})}function u(){g(function(e){var t=e.XMLDocument.documentElement.attributes;e.load(l);for(var n=t.length-1;n>=0;n--)e.removeAttribute(t[n].name);e.save(l)})}function c(e){return e.replace(/^\d/,"___$&").replace(d,"___")}var s=n(55),f=s.Global;e.exports={name:"oldIE-userDataStorage",write:r,read:o,each:i,remove:a,clearAll:u};var l="storejs",p=f.document,g=function(){if(!p||!p.documentElement||!p.documentElement.addBehavior)return null;var e,t,n;try{t=new ActiveXObject("htmlfile"),t.open(),t.write('<script>document.w=window<\/script><iframe src="/favicon.ico"></iframe>'),t.close(),e=t.w.frames[0].document,n=e.createElement("div")}catch(t){n=p.createElement("div"),e=p.body}return function(t){var r=[].slice.call(arguments,0);r.unshift(n),e.appendChild(n),n.addBehavior("#default#userData"),n.load(l),t.apply(this,r),e.removeChild(n)}}(),h=(f.navigator?f.navigator.userAgent:"").match(/ (MSIE 8|MSIE 9|MSIE 10)\./),d=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g")},460:function(e,t,n){function r(){return f.sessionStorage}function o(e){return r().getItem(e)}function i(e,t){return r().setItem(e,t)}function a(e){for(var t=r().length-1;t>=0;t--){var n=r().key(t);e(o(n),n)}}function u(e){return r().removeItem(e)}function c(){return r().clear()}var s=n(55),f=s.Global;e.exports={name:"sessionStorage",read:o,write:i,each:a,remove:u,clearAll:c}},475:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=(n(182),n(87)),o=n.n(r),i=Object.prototype,a=i.toString,u={ajax:function(e){var t=e||{};if(!t.url)return alert("请填写接口地址"),!1;o()({method:t.type||"post",url:t.url,params:t.data||{},headers:t.headers||{"Content-Type":"application/x-www-form-urlencoded"},baseURL:"http://t.lanchenglv.com/tp5demo/index.php/",time:t.time||1e4,responseType:t.dataType||"json"}).then(function(e){200==e.status?t.success&&t.success(e.data,e):data.error?t.error(error):alert("好多人在访问呀，请重新试试[timeout]")}).catch(function(e){console.log(e),t.error?t.error(e):alert("好多人在访问呀，请重新试试[timeout]")})},isArrayLike:function(e){if(!e)return!1;var t=e.length;if(t===t>>>0){var n=a.call(e).slice(8,-1);if(/(?:regexp|string|function|window|global)$/i.test(n))return!1;if("Array"===n)return!0;try{return!1!=={}.propertyIsEnumerable.call(e,"length")||/^\s?function/.test(e.item||e.callee)}catch(t){return!e.window}}return!1},each:function(e,t){var n=this;if(e){var r=0;if(n.isArrayLike(e))for(var o=e.length;r<o&&!1!==t(r,e[r]);r++);else for(r in e)if(e.hasOwnProperty(r)&&!1===t(r,e[r]))break}},getUrlQuery:function(e,t){var n=new RegExp("(^|\\?|&)"+e+"=([^&]*)(\\s|&|$)","i"),r=t||location.href;return n.test(r)?unescape(RegExp.$2.replace(/\+/g," ")):""}};t.default=u},55:function(e,t,n){(function(t){function n(e,t){return function(){return t.apply(e,Array.prototype.slice.call(arguments,0))}}function r(e,t){return Array.prototype.slice.call(e,t||0)}function o(e,t){a(e,function(e,n){return t(e,n),!1})}function i(e,t){var n=u(e)?[]:{};return a(e,function(e,r){return n[r]=t(e,r),!1}),n}function a(e,t){if(u(e)){for(var n=0;n<e.length;n++)if(t(e[n],n))return e[n]}else for(var r in e)if(e.hasOwnProperty(r)&&t(e[r],r))return e[r]}function u(e){return null!=e&&"function"!=typeof e&&"number"==typeof e.length}function c(e){return e&&"[object Function]"==={}.toString.call(e)}function s(e){return e&&"[object Object]"==={}.toString.call(e)}var f=function(){return Object.assign?Object.assign:function(e,t,n,r){for(var i=1;i<arguments.length;i++)o(Object(arguments[i]),function(t,n){e[n]=t});return e}}(),l=function(){function e(){}return Object.create?function(e,t,n,o){var i=r(arguments,1);return f.apply(this,[Object.create(e)].concat(i))}:function(t,n,o,i){var a=r(arguments,1);return e.prototype=t,f.apply(this,[new e].concat(a))}}(),p=function(){return String.prototype.trim?function(e){return String.prototype.trim.call(e)}:function(e){return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}}(),g="undefined"!=typeof window?window:t;e.exports={assign:f,create:l,trim:p,bind:n,slice:r,each:o,map:i,pluck:a,isList:u,isFunction:c,isObject:s,Global:g}}).call(t,n(56))}},[475]);