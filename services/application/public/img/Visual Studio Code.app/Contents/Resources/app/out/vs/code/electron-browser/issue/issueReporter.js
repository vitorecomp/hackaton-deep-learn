/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
"use strict";function assign(e,n){return Object.keys(n).reduce(function(e,r){return e[r]=n[r],e},e)}function parseURLQueryArgs(){return(window.location.search||"").split(/[?&]/).filter(function(e){return!!e}).map(function(e){return e.split("=")}).filter(function(e){return 2===e.length}).reduce(function(e,n){return e[n[0]]=decodeURIComponent(n[1]),e},{})}function uriFromPath(e){var n=path.resolve(e).replace(/\\/g,"/");return n.length>0&&"/"!==n.charAt(0)&&(n="/"+n),encodeURI("file://"+n).replace(/#/g,"%23")}function readFile(e){return new Promise(function(n,r){fs.readFile(e,"utf8",function(e,t){e?r(e):n(t)})})}function main(){const e=parseURLQueryArgs(),n=JSON.parse(e.config||"{}")||{};assign(process.env,n.userEnv),function(){const e=require("path"),r=require("module");let t=e.join(n.appRoot,"node_modules");/[a-z]\:/.test(t)&&(t=t.charAt(0).toUpperCase()+t.substr(1));const o=t+".asar",i=r._resolveLookupPaths;r._resolveLookupPaths=function(e,n,r){const a=i(e,n,r),s=r?a:a[1]
;for(let e=0,n=s.length;e<n;e++)if(s[e]===t){s.splice(e,0,o);break}return a}}();const r="darwin"===process.platform?"meta-alt-73":"ctrl-shift-73",t="darwin"===process.platform?"meta-82":"ctrl-82";window.addEventListener("keydown",function(e){const n=function(e){return[e.ctrlKey?"ctrl-":"",e.metaKey?"meta-":"",e.altKey?"alt-":"",e.shiftKey?"shift-":"",e.keyCode].join("")}(e);n===r?ipc.send("vscode:toggleDevTools"):n===t&&ipc.send("vscode:reloadWindow")});const o=uriFromPath(n.appRoot)+"/out";var i={availableLanguages:{}};const a=process.env.VSCODE_NLS_CONFIG;if(a){process.env.VSCODE_NLS_CONFIG=a;try{i=JSON.parse(a)}catch(e){}}if(i._resolvedLanguagePackCoreLocation){let e=Object.create(null);i.loadBundle=function(n,r,t){let o=e[n];if(o)return void t(void 0,o);readFile(path.join(i._resolvedLanguagePackCoreLocation,n.replace(/\//g,"!")+".nls.json")).then(function(r){let o=JSON.parse(r);e[n]=o,t(void 0,o)}).catch(e=>{try{i._corruptedFile&&writeFile(i._corruptedFile,"corrupted").catch(function(e){console.error(e)})
}finally{t(e,void 0)}})}}var s=i.availableLanguages["*"]||"en";"zh-tw"===s?s="zh-Hant":"zh-cn"===s&&(s="zh-Hans"),window.document.documentElement.setAttribute("lang",s);const c=n.appRoot+"/out/vs/loader.js",u=fs.readFileSync(c);require("vm").runInThisContext(u,{filename:c});var l=global.define;global.define=void 0,window.nodeRequire=require.__$__nodeRequire,l("fs",["original-fs"],function(e){return e}),window.MonacoEnvironment={},require.config({baseUrl:o,"vs/nls":i,nodeCachedDataDir:n.nodeCachedDataDir,nodeModules:[]}),i.pseudo&&require(["vs/nls"],function(e){e.setPseudoTranslation(i.pseudo)}),require(["vs/code/electron-browser/issue/issueReporterMain"],e=>{e.startup(n)})}const path=require("path"),fs=require("fs"),ipc=require("electron").ipcRenderer,writeFile=(e,n)=>new Promise((r,t)=>fs.writeFile(e,n,"utf8",e=>e?t(e):r()));main();
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/f46c4c469d6e6d8c46f268d1553c5dc4b475840f/core/vs/code/electron-browser/issue/issueReporter.js.map
