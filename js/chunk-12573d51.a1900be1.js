(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-12573d51"],{"57da":function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"home"},[a("v-header",{staticClass:"header",attrs:{num:t.num||0},on:{"change-tag":t.onChangeTag}}),a("div",{staticClass:"main"},[a("div",{staticClass:"manipulation"},[a("span",{staticClass:"checkBox",on:{click:t.toggleAll}},[a("i",{class:{"cubeic-square-border":!t.allCheck,"cubeic-square-right":t.allCheck}}),t._v("\n        "+t._s(t.allCheck?"反选":"全选")+"\n      ")]),a("div",{staticClass:"mainBtn"},[a("cube-button",{staticClass:"button",attrs:{inline:!0,primary:!0,icon:"cubeic-ok",disabled:!this.tasks.length},on:{click:t.completeAll}},[t._v("批量完成")]),a("cube-button",{staticClass:"button",attrs:{inline:!0,primary:!0,icon:"cubeic-delete",disabled:!this.tasks.length},on:{click:t.deleteAll}},[t._v("批量删除")])],1)]),a("div",{staticClass:"scroll-list-wrap"},[a("cube-scroll",{ref:"scroll",attrs:{data:t.tasks,options:t.options}},t._l(t.tasks,(function(s,e){return a("li",{directives:[{name:"show",rawName:"v-show",value:t.tag===s.tag,expression:"tag === task.tag"}],key:e,staticClass:"task",class:{current:s.detail,done:s.done,fail:s.fail},on:{click:function(a){return t.tapTask(s)}}},[a("div",{staticClass:"dot",on:{click:function(a){return a.stopPropagation(),t.toggle(s)}}},[a("i",{class:{"cubeic-square-border":!s.current,"cubeic-square-right":s.current}})]),a("div",{staticClass:"content"},[a("div",{staticClass:"title"},[t._v("\n            "+t._s(s.title)+"\n            "),a("div",{staticClass:"flag"},[a("div",{directives:[{name:"show",rawName:"v-show",value:!s.done&&!s.fail,expression:"!task.done && !task.fail"}],class:s.start?"pause":"start",on:{click:function(a){return a.stopPropagation(),t.manipulateTask(s)}}}),a("div",{directives:[{name:"show",rawName:"v-show",value:!s.done&&!s.fail,expression:"!task.done && !task.fail"}],staticClass:"sperate"}),a("div",{directives:[{name:"show",rawName:"v-show",value:!s.done&&!s.fail,expression:"!task.done && !task.fail"}],staticClass:"stop",on:{click:function(a){return a.stopPropagation(),t.stopTask(s)}}}),a("div",{directives:[{name:"show",rawName:"v-show",value:s.fail||s.done,expression:"task.fail || task.done"}],class:{done:s.done,fail:s.fail}},[a("i",{class:"cubeic-"+(s.fail?"close":"ok")})])])]),a("transition",{attrs:{name:"time"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:s.detail,expression:"task.detail"}],staticClass:"detail"},[a("span",{staticClass:"startTime"},[t._v("开始时间: "+t._s(s.start||s.startTime?s.startTime:"未开始"))]),a("br"),a("span",{staticClass:"leftTime"},[t._v("剩余时间: "+t._s(s.timing||"00: 00")+" / "+t._s(t._f("toMinute")(s.lastTime)))]),a("div",{staticClass:"buttons"},[a("cube-button",{staticClass:"button",attrs:{inline:!0,primary:!0,icon:"cubeic-ok"},on:{click:function(a){return a.stopPropagation(),t.completeTask(s)}}},[t._v(t._s(s.fail||s.done?"重置":"完成"))]),a("cube-button",{staticClass:"button",attrs:{inline:!0,primary:!0,icon:"cubeic-edit"},on:{click:function(a){return a.stopPropagation(),t.editTask(s)}}},[t._v("编辑\n                    ")]),a("cube-button",{staticClass:"button",attrs:{inline:!0,primary:!0,icon:"cubeic-delete"},on:{click:function(a){return a.stopPropagation(),t.deleteTask(s)}}},[t._v("删除")])],1)])])],1)])})),0)],1)]),a("footer",{staticClass:"footer"},[a("router-link",{attrs:{to:"/detail"}},[a("i",{staticClass:"cubeic-add"})])],1)],1)},i=[],n=(a("c5f6"),a("ac6a"),a("d7ae")),o=a("c1df"),c={name:"Home",data:function(){return{options:{click:!0,directionLockThreshold:0},tasks:JSON.parse(localStorage.getItem("tasks"))||[],tag:"all"}},computed:{allCheck:{get:function(){return 0!==this.tasks.length&&this.tasks.every((function(t){return t.current}))},set:function(t){this.tasks.forEach((function(s){s.current=t}))}},num:function(){return"all"===this.tag?this.tasks.length:"todo"===this.tag?this.tasks.filter((function(t){return!t.done})).length:this.tasks.filter((function(t){return t.done})).length}},beforeDestroy:function(){this.tasks.forEach((function(t){t.start=!0,manipulateTask(t)})),localStorage.setItem("tasks",JSON.stringify(this.tasks))},methods:{onChangeTag:function(t){switch(t){case"todo":this.tasks.forEach((function(s){s.done||(s.tag=t)}));break;case"all":this.tasks.forEach((function(s){s.tag=t}));break;case"complete":this.tasks.forEach((function(s){s.done&&(s.tag=t)}));break}this.tag=t},tapTask:function(t){for(var s=0;s<this.tasks.length;s++)this.tasks[s]===t?t.detail=!t.detail:this.tasks[s].detail=!1},toggle:function(t){t.current=!t.current},toggleAll:function(){this.allCheck=!this.allCheck},completeAll:function(){this.tasks.forEach((function(t){t.current&&(t.done=!0,t.startTime+="(完成)",t.fail&&(t.done=!1))})),localStorage.setItem("tasks",JSON.stringify(this.tasks))},deleteAll:function(){for(var t=this.tasks.length-1;t>=0;t--)this.tasks[t].current&&this.tasks.splice(t,1);localStorage.setItem("tasks",JSON.stringify(this.tasks)),this.allCheck=!1},completeTask:function(t){clearInterval(t.timer),t.done?t.done&&this.reset(t):(t.startTime+="(完成)",t.done=!0),t.fail&&this.reset(t),localStorage.setItem("tasks",JSON.stringify(this.tasks))},editTask:function(t){t.start=!1,clearInterval(t.timer),this.$router.push({name:"Detail",params:{taskId:t.id}})},deleteTask:function(t){for(var s=0;s<this.tasks.length;s++)t===this.tasks[s]&&this.tasks.splice(s,1);localStorage.setItem("tasks",JSON.stringify(this.tasks))},manipulateTask:function(t){var s=this,a=o().format("MM-DD HH:mm:ss");t.start?(t.startTime=a+"(暂停中)",clearInterval(t.timer),t.start=!1):(t.start=!0,t.startTime=a,t.timer=setInterval((function(){t.minute=Math.floor(t.counter/60),t.second=t.counter%60,t.timing="".concat(t.minute>=10?t.minute:"0"+t.minute,": ").concat(t.second>=10?t.second:"0"+t.second),t.counter++,s.setFail(t)}),1e3)),localStorage.setItem("tasks",JSON.stringify(this.tasks))},stopTask:function(t){clearInterval(t.timer),this.reset(t),localStorage.setItem("tasks",JSON.stringify(this.tasks))},reset:function(t){t.done=!1,t.fail=!1,t.start=!1,t.startTime="",t.timing="",t.counter=t.minute=t.second=0},setFail:function(t){var s=(60*t.minute+t.second)/60;""!==t.lastTime&&s>t.lastTime&&(t.fail=!0,t.startTime="(失败)")}},filters:{toMinute:function(t){var s=Number(t),a=60*s,e=0,i=0;return a%60!==0?(e=a%60,i=Math.floor(s)):i=a/60,"".concat(i>=10?i:"0"+i,": ").concat(e>=10?e:"0"+e)}},components:{VHeader:n["a"]}},r=c,l=(a("acef"),a("2877")),u=Object(l["a"])(r,e,i,!1,null,"6cfa0490",null);s["default"]=u.exports},acef:function(t,s,a){"use strict";var e=a("d3da"),i=a.n(e);i.a},d3da:function(t,s,a){}}]);
//# sourceMappingURL=chunk-12573d51.a1900be1.js.map