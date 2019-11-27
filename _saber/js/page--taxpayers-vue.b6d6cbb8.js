(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{467:function(t,e,a){var n=a(477);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,a(179).default)("246029ce",n,!0,{sourceMap:!1})},475:function(t){t.exports=JSON.parse('[{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"airdrop","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"address","name":"source","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"}]')},476:function(t,e,a){"use strict";var n=a(467);a.n(n).a},477:function(t,e,a){(t.exports=a(178)(!1)).push([t.i,".columns[data-v-dd32418c]{flex-grow:1}.columns.is-gapless[data-v-dd32418c]{margin-bottom:0}.column>*[data-v-dd32418c]{padding:30px}",""])},480:function(t,e,a){"use strict";a.r(e);var n=a(55),s=a.n(n),i=a(468),r=a(475),o={components:{RippleLoader:i.RippleLoader},data:function(){return{hardForkAddress:null,optOutFee:0,isOptedOut:!1,loading:!1}},computed:{disabled:function(){return!this.$parent.contractAddress},currentAccount:function(){return this.$parent.currentAccount},contract:function(){return this.$parent.contract},hardForkContract:function(){return!!this.hardForkAddress&&this.$parent.web3&&new this.$parent.web3.eth.Contract(r,this.hardForkAddress)},optOutFeeDisplay:function(){return Number(this.optOutFee)/1e18}},watch:{contract:function(){this.setOptOutFee(),this.setIsOptedOut()},currentAccount:function(){this.setIsOptedOut()}},methods:{takeLiquidity:function(){var t;return s.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return this.loading=!0,e.prev=1,e.next=4,s.a.awrap(this.hardForkContract.methods.balanceOf(this.currentAccount).call());case 4:return t=e.sent,e.next=7,s.a.awrap(this.hardForkContract.methods.increaseAllowance(this.contract.options.address,t).send({from:this.currentAccount}));case 7:return e.next=9,s.a.awrap(this.contract.methods.takeLiquidity(this.hardForkAddress).send({from:this.currentAccount}));case 9:e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),console.log(e.t0.message);case 14:return e.prev=14,this.loading=!1,e.finish(14);case 17:case"end":return e.stop()}}),null,this,[[1,11,14,17]])},optOut:function(){return s.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return this.loading=!0,t.prev=1,t.next=4,s.a.awrap(this.contract.methods.optOut().send({from:this.currentAccount,value:this.optOutFee}));case 4:this.setIsOptedOut(),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(1),console.log(t.t0.message);case 10:return t.prev=10,this.loading=!1,t.finish(10);case 13:case"end":return t.stop()}}),null,this,[[1,7,10,13]])},setOptOutFee:function(){return s.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.a.awrap(this.contract.methods.getOptOutFee().call());case 2:this.optOutFee=t.sent;case 3:case"end":return t.stop()}}),null,this)},setIsOptedOut:function(){return s.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.a.awrap(this.contract.methods.isOptedOut(this.currentAccount).call());case 2:this.isOptedOut=t.sent;case 3:case"end":return t.stop()}}),null,this)}}},p=(a(476),a(9)),l=Object(p.a)(o,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"columns is-gapless taxpayers"},[a("div",{staticClass:"column"},[a("div",{staticClass:"container"},[a("div",{staticClass:"content"},[a("h1",{staticClass:"title is-1 has-text-dark"},[t._v("\n          Dominion & Control\n        ")]),t._v(" "),a("p",[t._v("The Internal Revenue Service of the United States government has released guidance for U.S. taxpayers who gain "),a("i",[t._v("dominion & control")]),t._v(" of virtual currencies (tokens) via an "),a("i",[t._v("airdrop")]),t._v(" following a "),a("i",[t._v("hard fork")]),t._v(" of a preexisting token.  That guidance has been published online and may be reviewed "),a("saber-link",{attrs:{to:"https://www.irs.gov/pub/irs-drop/rr-19-24.pdf"}},[t._v("here")]),t._v(".")],1),t._v(" "),a("p",[t._v("The use of the EthereumTaxDodgeball system may have tax implication for U.S. taxpayers.")]),t._v(" "),a("p",[t._v("Taxpayers may use this page to accept offers made to purchase their hard-forked-and-airdropped tokens.  They may also elect to opt out participation in the EthereumTaxDodgeball system.")]),t._v(" "),a("article",{directives:[{name:"show",rawName:"v-show",value:t.disabled,expression:"disabled"}],staticClass:"message is-warning"},[a("div",{staticClass:"message-header"},[t._v("\n            Warning: Contract Not Found\n          ")]),t._v(" "),t._m(0)])]),t._v(" "),a("div",{staticClass:"content"},[a("h2",{staticClass:"subtitle is-3"},[t._v("\n          Redeem Tokens\n        ")]),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),a("form",{attrs:{action:"javascript:void(0);"},on:{submit:t.takeLiquidity}},[a("fieldset",{attrs:{disabled:t.disabled}},[a("div",{staticClass:"field"},[a("label",{staticClass:"label"},[t._v("Hard Fork Contract Address")]),t._v(" "),a("div",{staticClass:"control"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.hardForkAddress,expression:"hardForkAddress"}],attrs:{type:"text",required:""},domProps:{value:t.hardForkAddress},on:{input:function(e){e.target.composing||(t.hardForkAddress=e.target.value)}}})])]),t._v(" "),t._m(3)])])]),t._v(" "),a("div",{staticClass:"content"},[a("h2",{staticClass:"subtitle is-3"},[t._v("\n          Opt Out\n        ")]),t._v(" "),a("p",[t._v("Taxpayers who maintain a healthy fear of their government may elect to opt out of participation.  One must simply pay the opt-out fee in order to be excluded from all future token gifts made through the EthereumTaxDodgeball contract.")]),t._v(" "),a("p",[t._v("The fee at this time is "+t._s(t.optOutFeeDisplay)+" ether.")]),t._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:t.isOptedOut,expression:"isOptedOut"}]},[t._v("\n          The current address has already opted out of the contract deployed on the current network.\n        ")]),t._v(" "),a("form",{attrs:{action:"javascript:void(0);"},on:{submit:t.optOut}},[a("fieldset",{attrs:{disabled:t.disabled||t.isOptedOut}},[a("div",{staticClass:"field"},[a("label",{staticClass:"label"},[t._v("Opt-Out Fee (ether)")]),t._v(" "),a("div",{staticClass:"control"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.optOutFeeDisplay,expression:"optOutFeeDisplay"}],attrs:{type:"number",disabled:"",required:""},domProps:{value:t.optOutFeeDisplay},on:{input:function(e){e.target.composing||(t.optOutFeeDisplay=e.target.value)}}})])]),t._v(" "),t._m(4)])])]),t._v(" "),a("div",{staticClass:"modal",class:{"is-active":t.loading}},[a("div",{staticClass:"modal-background"}),t._v(" "),a("div",{staticClass:"modal-content"},[a("RippleLoader",{attrs:{size:360}})],1)])])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"message-body"},[e("p",[this._v("The EthereumTaxDodgeball contract is not known to have been deployed on the current network.")]),this._v(" "),e("p",[this._v("Please connect to the Ethereum Main Network or the Ropsten Test Network.")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Taxpayers who have gained "),e("i",[this._v("dominion & control")]),this._v(" of tokens through an airdrop following a hard fork through the EthereumTaxDodgeball system may be able to exchange their tokens for ether.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("\n          This action requires two blockchain transactions:\n          "),e("ol",[e("li",[this._v("Authorization of the EthereumTaxDodgeball contract to manage the taxpayer's airdropped tokens")]),this._v(" "),e("li",[this._v("Acceptance of an existing offer to purchase the taxpayer's airdropped tokens")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"control"},[e("button",{staticClass:"button is-info"},[this._v("\n                Proceed\n              ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"control"},[e("button",{staticClass:"button is-info"},[this._v("\n                Proceed\n              ")])])}],!1,null,"dd32418c",null).exports,u={render:function(t){return t("layout-manager",{scopedSlots:{component:function(e){return t(l,{props:e})}}})}},c=function(t){var e,a,n,s=(n=void 0,(e={}).type=a="page",e.internal=n,e.contentType="vue",e.slug="taxpayers",e.content=n,e.createdAt=new Date(1574738473872),e.updatedAt=new Date(1574738473872),e.layout=a,e.permalink="/taxpayers.html",e.assets={},e.attributes=e,e),i=t.options.beforeCreate||[];t.options.beforeCreate=[function(){this.$page=s}].concat(i);["layout","transition"].forEach((function(e){var a=t.options.PageComponent;a&&(t.options[e]=a[e]),void 0===t.options[e]&&(t.options[e]=s[e])})),s.slug&&(t.options.name="page-wrapper-"+s.slug.replace(/[^0-9a-z\-]/i,"-"))},d=Object(p.a)(u,void 0,void 0,!1,null,null,null);"function"==typeof c&&c(d);e.default=d.exports}}]);