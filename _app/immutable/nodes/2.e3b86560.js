import{_ as F}from"../chunks/preload-helper.41c905a7.js";import{N as G,S as H,i as L,s as Q,e as N,b as A,g as P,d as O,f as z,h as d,k as h,q as J,a as R,l as v,m as k,r as S,c as U,n as p,D as f,O as V,F as I,P as K,Q as j,G as M,v as W}from"../chunks/index.227810b5.js";import{j as X,e as q}from"../chunks/singletons.6184ce21.js";function w(i,{delay:a=0,duration:l=400,easing:t=G}={}){const e=+getComputedStyle(i).opacity;return{delay:a,duration:l,easing:t,css:s=>`opacity: ${s*e}`}}const B=X("goto");function C(i){let a,l,t,e,s,o,m,n,g,b,c,_,E,T;return{c(){a=h("div"),l=h("button"),t=J("Play"),e=R(),s=h("div"),o=h("input"),m=R(),n=h("button"),g=J("Join"),this.h()},l(r){a=v(r,"DIV",{class:!0});var u=k(a);l=v(u,"BUTTON",{class:!0});var $=k(l);t=S($,"Play"),$.forEach(d),e=U(u),s=v(u,"DIV",{class:!0});var y=k(s);o=v(y,"INPUT",{class:!0,type:!0,placeholder:!0}),m=U(y),n=v(y,"BUTTON",{class:!0});var D=k(n);g=S(D,"Join"),D.forEach(d),y.forEach(d),u.forEach(d),this.h()},h(){p(l,"class","button is-primary mb-2"),p(o,"class","input svelte-156pfck"),p(o,"type","text"),p(o,"placeholder","Room ID"),p(n,"class","button is-primary"),n.disabled=b=!i[1].length,p(s,"class","multiplayer-input svelte-156pfck"),p(a,"class","container")},m(r,u){A(r,a,u),f(a,l),f(l,t),f(a,e),f(a,s),f(s,o),V(o,i[1]),f(s,m),f(s,n),f(n,g),_=!0,E||(T=[I(l,"click",i[3]),I(o,"input",i[4]),I(n,"click",i[2])],E=!0)},p(r,u){u&2&&o.value!==r[1]&&V(o,r[1]),(!_||u&2&&b!==(b=!r[1].length))&&(n.disabled=b)},i(r){_||(K(()=>{_&&(c||(c=j(a,w,{},!0)),c.run(1))}),_=!0)},o(r){c||(c=j(a,w,{},!1)),c.run(0),_=!1},d(r){r&&d(a),r&&c&&c.end(),E=!1,M(T)}}}function Y(i){let a,l,t=i[0]&&C(i);return{c(){t&&t.c(),a=N()},l(e){t&&t.l(e),a=N()},m(e,s){t&&t.m(e,s),A(e,a,s),l=!0},p(e,[s]){e[0]?t?(t.p(e,s),s&1&&P(t,1)):(t=C(e),t.c(),P(t,1),t.m(a.parentNode,a)):t&&(W(),O(t,1,1,()=>{t=null}),z())},i(e){l||(P(t),l=!0)},o(e){O(t),l=!1},d(e){t&&t.d(e),e&&d(a)}}}function Z(i,a,l){let t;typeof window<"u"&&F(()=>import("../chunks/peer.f2d91d78.js").then(n=>n.p),["../chunks/peer.f2d91d78.js","../chunks/index.60de578f.js","../chunks/index.227810b5.js"],import.meta.url).then(n=>{l(0,t=n.default)});let e="";function s(){t.join(e),B(`${q}/play/${e}`)}function o(){B(`${q}/play`)}function m(){e=this.value,l(1,e)}return[t,e,s,o,m]}class at extends H{constructor(a){super(),L(this,a,Z,Y,Q,{})}}export{at as component};
