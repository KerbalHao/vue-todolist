(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e8359502"],{"08aa":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"detail"},[a("v-header",{attrs:{page:"detail"},on:{deleteIt:t.deleteThis,save:t.saveEditing}}),a("div",{staticClass:"main"},[a("ul",{staticClass:"listDetail"},[a("li",{staticClass:"title"},[a("label",{attrs:{for:"t"}},[t._v("标题:")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.task.title,expression:"task.title"}],attrs:{id:"t",placeholder:"请输入标题"},domProps:{value:t.task.title},on:{input:function(e){e.target.composing||t.$set(t.task,"title",e.target.value)}}})]),a("li",{staticClass:"lastTime"},[t._m(0),a("input",{directives:[{name:"model",rawName:"v-model",value:t.task.lastTime,expression:"task.lastTime"}],attrs:{id:"lastTime",type:"text"},domProps:{value:t.task.lastTime},on:{input:function(e){e.target.composing||t.$set(t.task,"lastTime",e.target.value)}}})]),a("li",{staticClass:"note"},[a("label",{attrs:{for:"note"}},[t._v("备注:")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.task.note,expression:"task.note"}],attrs:{id:"note",type:"text"},domProps:{value:t.task.note},on:{input:function(e){e.target.composing||t.$set(t.task,"note",e.target.value)}}})])])])],1)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ruby",[a("label",{attrs:{for:"lastTime"}},[t._v("预计用时(分):")]),a("rt",[t._v("默认不限制用时")])])}],n=(a("20d6"),a("7514"),a("d7ae")),r=(a("c1df"),{name:"detail",data:function(){return{task:{id:-1,title:"",startTime:"",lastTime:"",timing:"",note:"",detail:!1,start:!1,current:!1,done:!1,fail:!1,tag:"all",counter:0,timer:null},newTask:!0,tasks:JSON.parse(localStorage.getItem("tasks"))||[]}},created:function(){var t=this.$route.params.taskId;void 0!==t&&(this.newTask=!1),this.task=this.tasks.find((function(e){return e.id===t}))||this.task},methods:{deleteThis:function(){if(this.tasks.length>0){var t=this.$route.params.taskId,e=this.tasks.findIndex((function(e){return e.id===t}));this.tasks.splice(e,1)}this.saveTasks()},saveEditing:function(){this.task.title?(this.newTask&&(this.task.id=this.tasks.length,this.tasks.push(this.task)),this.saveTasks()):alert("请输入标题")},saveTasks:function(){localStorage.setItem("tasks",JSON.stringify(this.tasks)),this.$router.back()}},components:{VHeader:n["a"]}}),l=r,o=(a("57cc"),a("2877")),c=Object(o["a"])(l,s,i,!1,null,"f5d4f372",null);e["default"]=c.exports},"57cc":function(t,e,a){"use strict";var s=a("a3ca"),i=a.n(s);i.a},7514:function(t,e,a){"use strict";var s=a("5ca1"),i=a("0a49")(5),n="find",r=!0;n in[]&&Array(1)[n]((function(){r=!1})),s(s.P+s.F*r,"Array",{find:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),a("9c6c")(n)},a3ca:function(t,e,a){}}]);
//# sourceMappingURL=chunk-e8359502.6a6dabc5.js.map