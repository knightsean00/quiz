(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{18:function(e,t,s){},19:function(e,t,s){},26:function(e,t,s){},46:function(e,t,s){"use strict";s.r(t);var n=s(2),c=s.n(n),a=s(20),i=s.n(a),r=(s(26),s(21)),o=s(4),l=s(5),u=s(3),h=s(7),j=s(6),d=s(9),b=s.n(d),m=(s(18),s(19),s(0)),p=function(e){Object(h.a)(s,e);var t=Object(j.a)(s);function s(e){var n;Object(o.a)(this,s),n=t.call(this,e);var c=0,a=[];return console.log(n.props.answers),n.props.questions.forEach((function(e,t){n.props.answers[t][0]&&(c++,a.push(t))})),n.state={score:(c/n.props.questions.length*100).toFixed(),incorrect_questions:a},n}return Object(l.a)(s,[{key:"render",value:function(){var e=this;return Object(m.jsx)("div",{className:"full",children:Object(m.jsxs)("div",{className:"container py-5",children:[Object(m.jsx)("div",{className:"row",children:Object(m.jsxs)("h1",{className:"text-center",children:["You got ",this.state.score,"% correct!"]})}),this.props.questions.map((function(t,s){return console.log(t),e.state.incorrect_questions.includes(s)?Object(m.jsxs)("div",{className:"pt-3",children:[Object(m.jsx)("h5",{children:t.question}),Object(m.jsxs)("p",{className:"text-success",children:["You answered ",e.props.guesses[s]]})]}):Object(m.jsxs)("div",{className:"pt-3",children:[Object(m.jsx)("h5",{children:t.question}),Object(m.jsxs)("p",{className:"text-danger",children:["You incorrectly answered ",e.props.guesses[s]]}),Object(m.jsxs)("p",{className:"text-success",children:["The correct answer was ",e.props.answers[s][1]]})]})})),Object(m.jsx)("div",{className:"center",children:Object(m.jsx)("button",{className:"btn btn-outline-primary text-center",onClick:function(){return window.location.reload()},children:"Try Again"})})]})})}}]),s}(c.a.Component),O=function(e){Object(h.a)(s,e);var t=Object(j.a)(s);function s(){var e;return Object(o.a)(this,s),(e=t.call(this)).state={questions:[],answers:{},answerAlert:!1,submitting:!1},e.questionChange=e.questionChange.bind(Object(u.a)(e)),e.submitAnswers=e.submitAnswers.bind(Object(u.a)(e)),e}return Object(l.a)(s,[{key:"questionChange",value:function(e){var t=e.target.getAttribute("name"),s=e.target.value,n=Object(r.a)({},this.state.answers);n[t]=s,this.setState({answerAlert:!1,answers:n})}},{key:"submitAnswers",value:function(e){var t=this;e.preventDefault(),Object.keys(this.state.answers).length!==this.state.questions.length?this.setState({answerAlert:!0}):(this.setState({submitting:!0}),b.a.post("/api/check/",{guesses:this.state.answers}).then((function(e){console.log(e.data),t.setState({answerReceived:e.data})})))}},{key:"componentDidMount",value:function(){var e=this;b.a.get("/api/questions/").then((function(t){e.setState({questions:t.data})}))}},{key:"render",value:function(){var e=this;return this.state.answerReceived?Object(m.jsx)(p,{answers:this.state.answerReceived,guesses:this.state.answers,questions:this.state.questions}):this.state.submitting?Object(m.jsx)("div",{className:"full",children:Object(m.jsx)("div",{class:"spinner-border text-primary",role:"status",children:Object(m.jsx)("span",{class:"visually-hidden",children:"Loading..."})})}):Object(m.jsx)("div",{className:"full",children:Object(m.jsxs)("div",{className:"container py-5",children:[Object(m.jsx)("div",{className:"row justify-content-md-center",children:Object(m.jsx)("div",{className:"col-md-6",children:this.state.answerAlert?Object(m.jsx)("div",{className:"mb-5 alert alert-danger",role:"alert",children:"You have not answered all the questions!"}):Object(m.jsx)("div",{})})}),Object(m.jsxs)("form",{onSubmit:this.submitAnswers,children:[this.state.questions.map((function(t,s){var n=t.question,c=t.choices;return Object(m.jsxs)("div",{className:"pb-5",onChange:e.questionChange,children:[Object(m.jsxs)("h5",{children:[s+1,") ",n]}),c.map((function(e,t){return Object(m.jsxs)("div",{className:"ms-3 form-check",children:[Object(m.jsx)("input",{className:"form-check-input",name:s,id:s+"-"+t,type:"radio",value:e}),Object(m.jsx)("label",{className:"form-check-label",htmlFor:s+"-"+t,children:e})]})}))]})})),Object(m.jsx)("div",{className:"center",children:Object(m.jsx)("button",{type:"submit",className:"btn btn-outline-primary text-center",children:"Submit"})})]})]})})}}]),s}(c.a.Component);i.a.render(Object(m.jsx)(c.a.StrictMode,{children:Object(m.jsx)(O,{})}),document.getElementById("root"))}},[[46,1,2]]]);
//# sourceMappingURL=main.90b9d4fb.chunk.js.map