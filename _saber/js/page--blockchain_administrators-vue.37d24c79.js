(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{465:function(e,t,a){var s=a(472);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);(0,a(179).default)("26220b76",s,!0,{sourceMap:!1})},471:function(e,t,a){"use strict";var s=a(465);a.n(s).a},472:function(e,t,a){(e.exports=a(178)(!1)).push([e.i,".columns[data-v-0fc0ddf2]{flex-grow:1}.columns.is-gapless[data-v-0fc0ddf2]{margin-bottom:0}.column>*[data-v-0fc0ddf2]{padding:30px}",""])},478:function(e,t,a){"use strict";a.r(t);var s=a(55),r=a.n(s),o={components:{RippleLoader:a(468).RippleLoader},data:function(){return{sourceName:null,sourceSymbol:null,taxpayersRaw:"",supplyPerTaxpayer:1e4,sourceToken:null,hardForkName:null,hardForkSymbol:null,hardForkToken:null,volumeEther:1,loading:!1}},computed:{disabled:function(){return!this.$parent.contractAddress},currentAccount:function(){return this.$parent.currentAccount},contract:function(){return this.$parent.contract},taxpayers:function(){return this.taxpayersRaw.split("\n").filter((function(e){return e.length}))}},methods:{deployToken:function(){var e;return r.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return this.loading=!0,t.prev=1,t.next=4,r.a.awrap(this.contract.methods.deployToken(this.sourceName,this.sourceSymbol,this.supplyPerTaxpayer,this.taxpayers).send({from:this.currentAccount}));case 4:e=t.sent,this.sourceToken=e.events.Deployment.returnValues.token,t.next=11;break;case 8:t.prev=8,t.t0=t.catch(1),console.log(t.t0.message);case 11:return t.prev=11,this.loading=!1,t.finish(11);case 14:case"end":return t.stop()}}),null,this,[[1,8,11,14]])},hardFork:function(){var e;return r.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return this.loading=!0,t.prev=1,t.next=4,r.a.awrap(this.contract.methods.hardFork(this.hardForkName,this.hardForkSymbol,this.sourceToken).send({from:this.currentAccount}));case 4:e=t.sent,this.hardForkToken=e.events.HardFork.returnValues.token,t.next=11;break;case 8:t.prev=8,t.t0=t.catch(1),console.log(t.t0.message);case 11:return t.prev=11,this.loading=!1,t.finish(11);case 14:case"end":return t.stop()}}),null,this,[[1,8,11,14]])},addLiquidity:function(){return r.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return this.loading=!0,e.prev=1,e.next=4,r.a.awrap(this.contract.methods.addLiquidity(this.hardForkToken,this.supplyPerTaxpayer).send({from:this.currentAccount,value:String(Number(this.volumeEther)*Number("1".concat("0".repeat(18))))}));case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(1),console.log(e.t0.message);case 9:return e.prev=9,this.loading=!1,e.finish(9);case 12:case"end":return e.stop()}}),null,this,[[1,6,9,12]])},airdrop:function(){return r.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return this.loading=!0,e.prev=1,e.next=4,r.a.awrap(this.contract.methods.airdrop(this.hardForkToken).send({from:this.currentAccount}));case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(1),console.log(e.t0.message);case 9:return e.prev=9,this.loading=!1,e.finish(9);case 12:case"end":return e.stop()}}),null,this,[[1,6,9,12]])},removeLiquidity:function(){return r.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return this.loading=!0,e.prev=1,e.next=4,r.a.awrap(this.contract.methods.removeLiquidity(this.hardForkToken).send({from:this.currentAccount}));case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(1),console.log(e.t0.message);case 9:return e.prev=9,this.loading=!1,e.finish(9);case 12:case"end":return e.stop()}}),null,this,[[1,6,9,12]])}}},n=(a(471),a(9)),i=Object(n.a)(o,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"columns is-gapless blockchain-administrators"},[a("div",{staticClass:"column"},[a("div",{staticClass:"container"},[a("div",{staticClass:"content"},[a("h1",{staticClass:"title is-1 has-text-dark"},[e._v("\n          Hard Fork & Airdrop\n        ")]),e._v(" "),a("p",[e._v("The Internal Revenue Service of the United States government has released guidance for U.S. taxpayers who gain "),a("i",[e._v("dominion & control")]),e._v(" of virtual currencies (tokens) via an "),a("i",[e._v("airdrop")]),e._v(" following a "),a("i",[e._v("hard fork")]),e._v(" of a preexisting token.  That guidance has been published online and may be reviewed "),a("saber-link",{attrs:{to:"https://www.irs.gov/pub/irs-drop/rr-19-24.pdf"}},[e._v("here")]),e._v(".")],1),e._v(" "),a("p",[e._v("The use of the EthereumTaxDodgeball system may have tax implication for U.S. taxpayers.")]),e._v(" "),a("p",[e._v("The following actions are intended to be run in order.")]),e._v(" "),a("article",{directives:[{name:"show",rawName:"v-show",value:e.disabled,expression:"disabled"}],staticClass:"message is-warning"},[a("div",{staticClass:"message-header"},[e._v("\n            Warning: Contract Not Found\n          ")]),e._v(" "),e._m(0)])]),e._v(" "),a("div",{staticClass:"content"},[a("h2",{staticClass:"subtitle is-3"},[e._v("\n          Step One: Deploy and Distribute an ERC20 Token\n        ")]),e._v(" "),a("p",[e._v("A prospective blockchain administrator may use the EthereumTaxDodgeball system for the purpose of deploying an ERC20 token contract.  This contract should be initialized with a list of two or more beneficiary U.S. taxpayer addresses.")]),e._v(" "),a("form",{attrs:{action:"javascript:void(0);"},on:{submit:e.deployToken}},[a("fieldset",{attrs:{disabled:e.disabled}},[a("div",{staticClass:"field"},[a("label",{staticClass:"label"},[e._v("New Token Name")]),e._v(" "),a("div",{staticClass:"control"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.sourceName,expression:"sourceName"}],attrs:{type:"text",required:""},domProps:{value:e.sourceName},on:{input:function(t){t.target.composing||(e.sourceName=t.target.value)}}})])]),e._v(" "),a("div",{staticClass:"field"},[a("label",{staticClass:"label"},[e._v("New Token Symbol")]),e._v(" "),a("div",{staticClass:"control"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.sourceSymbol,expression:"sourceSymbol"}],attrs:{type:"text",required:""},domProps:{value:e.sourceSymbol},on:{input:function(t){t.target.composing||(e.sourceSymbol=t.target.value)}}})])]),e._v(" "),a("div",{staticClass:"field"},[a("label",{staticClass:"label"},[e._v("Quantity of Tokens to Mint for Each Beneficiary")]),e._v(" "),a("div",{staticClass:"control"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.supplyPerTaxpayer,expression:"supplyPerTaxpayer"}],attrs:{type:"number",min:"1",step:"1",required:""},domProps:{value:e.supplyPerTaxpayer},on:{input:function(t){t.target.composing||(e.supplyPerTaxpayer=t.target.value)}}})])]),e._v(" "),a("div",{staticClass:"field"},[a("label",{staticClass:"label"},[e._v("Addresses of Beneficiaries (Newline Delimited)")]),e._v(" "),a("div",{staticClass:"control"},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.taxpayersRaw,expression:"taxpayersRaw"}],staticClass:"textarea",attrs:{required:""},domProps:{value:e.taxpayersRaw},on:{input:function(t){t.target.composing||(e.taxpayersRaw=t.target.value)}}})])]),e._v(" "),e._m(1)])])]),e._v(" "),a("div",{staticClass:"content"},[a("h2",{staticClass:"subtitle is-3"},[e._v("\n          Step Two: Hard Fork\n        ")]),e._v(" "),a("p",[e._v("An ERC20 token contract created through the EthereumTaxDodgeball system contains a provision which allows it to be paused and hard forked.  When a hard fork takes place, a new contract is created which maintains references to the holders of the preexisting token and their respective balances.")]),e._v(" "),a("form",{attrs:{action:"javascript:void(0);"},on:{submit:e.hardFork}},[a("fieldset",{attrs:{disabled:e.disabled}},[a("div",{staticClass:"field"},[a("label",{staticClass:"label"},[e._v("New Token Name")]),e._v(" "),a("div",{staticClass:"control"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.hardForkName,expression:"hardForkName"}],attrs:{type:"text",required:""},domProps:{value:e.hardForkName},on:{input:function(t){t.target.composing||(e.hardForkName=t.target.value)}}})])]),e._v(" "),a("div",{staticClass:"field"},[a("label",{staticClass:"label"},[e._v("New Token Symbol")]),e._v(" "),a("div",{staticClass:"control"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.hardForkSymbol,expression:"hardForkSymbol"}],attrs:{type:"text",required:""},domProps:{value:e.hardForkSymbol},on:{input:function(t){t.target.composing||(e.hardForkSymbol=t.target.value)}}})])]),e._v(" "),a("div",{staticClass:"field"},[a("label",{staticClass:"label"},[e._v("Source Token Contract Address")]),e._v(" "),a("div",{staticClass:"control"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.sourceToken,expression:"sourceToken"}],attrs:{type:"text",placeholder:"Output of Step One",required:""},domProps:{value:e.sourceToken},on:{input:function(t){t.target.composing||(e.sourceToken=t.target.value)}}})])]),e._v(" "),e._m(2)])])]),e._v(" "),a("div",{staticClass:"content"},[a("h2",{staticClass:"subtitle is-3"},[e._v("\n          Step Three: Add Liquidity for New Token\n        ")]),e._v(" "),e._m(3),e._v(" "),e._m(4),e._v(" "),a("form",{attrs:{action:"javascript:void(0);"},on:{submit:e.addLiquidity}},[a("fieldset",{attrs:{disabled:e.disabled}},[a("div",{staticClass:"field"},[a("label",{staticClass:"label"},[e._v("Hard Fork Contract Address")]),e._v(" "),a("div",{staticClass:"control"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.hardForkToken,expression:"hardForkToken"}],attrs:{type:"text",placeholder:"Output of Step Two",required:""},domProps:{value:e.hardForkToken},on:{input:function(t){t.target.composing||(e.hardForkToken=t.target.value)}}})])]),e._v(" "),a("div",{staticClass:"field"},[a("label",{staticClass:"label"},[e._v("Volume")]),e._v(" "),a("div",{staticClass:"control"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.supplyPerTaxpayer,expression:"supplyPerTaxpayer"}],attrs:{type:"number",min:"1",step:"1",required:""},domProps:{value:e.supplyPerTaxpayer},on:{input:function(t){t.target.composing||(e.supplyPerTaxpayer=t.target.value)}}})])]),e._v(" "),a("div",{staticClass:"field"},[a("label",{staticClass:"label"},[e._v("Value (ether)")]),e._v(" "),a("div",{staticClass:"control"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.volumeEther,expression:"volumeEther"}],attrs:{type:"number",min:"0.01",step:"0.01",required:""},domProps:{value:e.volumeEther},on:{input:function(t){t.target.composing||(e.volumeEther=t.target.value)}}})])]),e._v(" "),e._m(5)])])]),e._v(" "),a("div",{staticClass:"content"},[a("h2",{staticClass:"subtitle is-3"},[e._v("\n          Step Four: Airdrop\n        ")]),e._v(" "),e._m(6),e._v(" "),a("form",{attrs:{action:"javascript:void(0);"},on:{submit:e.airdrop}},[a("fieldset",{attrs:{disabled:e.disabled}},[a("div",{staticClass:"field"},[a("label",{staticClass:"label"},[e._v("Hard Fork Contract Address")]),e._v(" "),a("div",{staticClass:"control"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.hardForkToken,expression:"hardForkToken"}],attrs:{type:"text",placeholder:"Output of Step Two",required:""},domProps:{value:e.hardForkToken},on:{input:function(t){t.target.composing||(e.hardForkToken=t.target.value)}}})])]),e._v(" "),e._m(7)])])]),e._v(" "),a("div",{staticClass:"content"},[a("h2",{staticClass:"subtitle is-3"},[e._v("\n          Step Five: Remove Liquidity (optional)\n        ")]),e._v(" "),e._m(8),e._v(" "),a("form",{attrs:{action:"javascript:void(0);"},on:{submit:e.removeLiquidity}},[a("fieldset",{attrs:{disabled:e.disabled}},[a("div",{staticClass:"field"},[a("label",{staticClass:"label"},[e._v("Hard Fork Contract Address")]),e._v(" "),a("div",{staticClass:"control"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.hardForkToken,expression:"hardForkToken"}],attrs:{type:"text",placeholder:"Output of Step Two",required:""},domProps:{value:e.hardForkToken},on:{input:function(t){t.target.composing||(e.hardForkToken=t.target.value)}}})])]),e._v(" "),e._m(9)])])]),e._v(" "),a("div",{staticClass:"modal",class:{"is-active":e.loading}},[a("div",{staticClass:"modal-background"}),e._v(" "),a("div",{staticClass:"modal-content"},[a("RippleLoader",{attrs:{size:360}})],1)])])])])}),[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"message-body"},[t("p",[this._v("The EthereumTaxDodgeball contract is not known to have been deployed on the current network.")]),this._v(" "),t("p",[this._v("Please connect to the Ethereum Main Network or the Ropsten Test Network.")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"control"},[t("button",{staticClass:"button is-info"},[this._v("\n                Proceed\n              ")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"control"},[t("button",{staticClass:"button is-info"},[this._v("\n                Proceed\n              ")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("One may, for whatever reason, exercise "),t("i",[this._v("dominion & control")]),this._v(" over one's ether by offering to buy a sum of newly hard-forked tokens.  This may affect the "),t("i",[this._v("fair market value")]),this._v(" of said tokens.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("A taxpayer who has gained, and is aware of having gained, "),t("i",[this._v("dominion & control")]),this._v(" of said tokens following an airdrop may accept said offer until it is rescinded.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"control"},[t("button",{staticClass:"button is-info"},[this._v("\n                Proceed\n              ")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("Token contracts which are created through a hard fork event via the EthereumTaxDodgeball system contain a provision to airdrop new tokens to holders of pre-hard-fork upstream tokens.  An airdrop effectively grants "),t("i",[this._v("dominion & control")]),this._v(" of tokens to taxpayers.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"control"},[t("button",{staticClass:"button is-info"},[this._v("\n                Proceed\n              ")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("One who has made an offer to buy a sum of newly hard-forked tokens may, for whatever reason, provided the offer has not yet been taken, rescind said offer.  This action may affect the "),t("i",[this._v("fair market value")]),this._v(" of said tokens.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"control"},[t("button",{staticClass:"button is-info"},[this._v("\n                Proceed\n              ")])])}],!1,null,"0fc0ddf2",null).exports,l={render:function(e){return e("layout-manager",{scopedSlots:{component:function(t){return e(i,{props:t})}}})}},c=function(e){var t,a,s,r=(s=void 0,(t={}).type=a="page",t.internal=s,t.contentType="vue",t.slug="blockchain_administrators",t.content=s,t.createdAt=new Date(1574738175089),t.updatedAt=new Date(1574738175089),t.layout=a,t.permalink="/blockchain_administrators.html",t.assets={},t.attributes=t,t),o=e.options.beforeCreate||[];e.options.beforeCreate=[function(){this.$page=r}].concat(o);["layout","transition"].forEach((function(t){var a=e.options.PageComponent;a&&(e.options[t]=a[t]),void 0===e.options[t]&&(e.options[t]=r[t])})),r.slug&&(e.options.name="page-wrapper-"+r.slug.replace(/[^0-9a-z\-]/i,"-"))},d=Object(n.a)(l,void 0,void 0,!1,null,null,null);"function"==typeof c&&c(d);t.default=d.exports}}]);