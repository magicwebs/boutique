/*!
 App Connect Tagify
 Version: 1.0.8
 (c) 2023 Wappler.io
 @build 2023-05-04 12:39:53
 */
dmx.Component("tagify",{extends:"form-element",initialData:{items:[],values:[]},attributes:{settings:{type:Object,default:{}},data:{type:Array,default:null},"tag-value":{type:String,default:"$value"},"tag-text":{type:String,default:"$value"},"tag-secondary":{type:String,default:null},"tag-image":{type:String,default:null},"tag-class":{type:String,default:null},"tag-count":{type:String,default:null},"tag-readonly":{type:String,default:null},nocustom:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},delimiters:{type:String,default:","},duplicates:{type:Boolean,default:!1},noinput:{type:Boolean,default:!1},"max-tags":{type:Number,default:1/0},loading:{type:Boolean,default:!1},mode:{type:String,default:null},notrim:{type:Boolean,default:!1},noautocomplete:{type:Boolean,default:!1},"keep-invalid":{type:Boolean,default:!1},"skip-invalid":{type:Boolean,default:!1},"min-chars":{type:Number,default:2},"case-sensitive":{type:Boolean,default:!1},"max-items":{type:Number,default:10},"no-fuzzy-search":{type:Boolean,default:!1},"no-accented-search":{type:Boolean,default:!1},"dropdown-position":{type:String,default:"all",enum:["all","text","input"]},"highlight-first":{type:Boolean,default:!1},"no-close-on-select":{type:Boolean,default:!1},pattern:{type:String,default:null}},methods:{addEmptyTag:function(){this.tagify.addEmptyTag()},addTags:function(t,e,a){this.tagify.addTags(t,e,a),this.onchange()},removeTags:function(t){this.tagify.removeTags(t),this.onchange()},removeAllTags:function(){this.tagify.removeAllTags(),this.onchange()}},events:{change:Event,add:Event,remove:Event,invalid:Event,input:Event,focus:Event,blur:Event,noresults:Event},onchange:function(t){var e=this.tagify.getCleanValue();this.set("items",e.map((t=>t.__item))),this.set("values",e.map((t=>t.value)))},getWhitelist:function(){return Array.isArray(this.props.data)?this.props.data.map((t=>{var e=dmx.DataScope(t,this),a={__dmx:!0,__item:t,value:dmx.parse(this.props["tag-value"],e),label:dmx.parse(this.props["tag-text"],e)};return t.style&&(a.style=t.style),this.props["tag-secondary"]&&(a.secondary=dmx.parse(this.props["tag-secondary"],e)),this.props["tag-image"]&&(a.image=dmx.parse(this.props["tag-image"],e)),this.props["tag-class"]&&(a.class=dmx.parse(this.props["tag-class"],e)),this.props["tag-count"]&&(a.count=dmx.parse(this.props["tag-count"],e)),this.props["tag-readonly"]&&(a.readonly=!!dmx.parse(this.props["tag-readonly"],e)),a})):[]},templates:{wrapper:function(t,e){return'<tags class="'+e.classNames.namespace+" "+(e.mode?e.classNames[e.mode+"Mode"]:"")+" "+t.className+'"'+(e.readonly?" readonly":"")+(e.disabled?" disabled":"")+(e.required?" required":"")+(t.hasAttribute("dmxDomId")?' dmxDomId="'+t.getAttribute("dmxDomId")+'"':"")+(t.hasAttribute("style")?' style="'+t.getAttribute("style")+'"':"")+' tabIndex="-1"><span'+(!e.readonly&&e.userInput?" contenteditable":"")+' tabIndex="0" data-placeholder="'+(e.placeholder||"&#8203;")+'" aria-placeholder="'+(e.placeholder||"")+'" class="'+e.classNames.input+'" role="textbox" aria-autocomplete="both" aria-multiline="'+("mix"==e.mode)+'"></span>&#8203;</tags>'},tag:function(t){var e=this.settings;return"<tag "+(t.readonly?" readonly":"")+' title="'+(t.title||t.value)+'" contenteditable="false" spellcheck="false" tabindex="'+(e.a11y.focusableTags?0:-1)+'" class="'+e.classNames.tag+" "+(t.class||"")+'" style="white-space:nowrap;'+(t.style||"")+'"><x title="" class="'+e.classNames.tagX+'" role="button" aria-label="remove tag"></x><div'+("select"!=e.mode?' style="display:flex;align-items:center;"':"")+">"+(t.image?'<img onerror="this.style.visibility=\'hidden\'" src="'+t.image+'" style="height:var(--tag-img-size, 1em);margin-right:.3em;pointer-events:none;">':"")+'<span class="'+e.classNames.tagText+'">'+(t[e.tagTextProp]||t.value)+"</span></div></tag>"},dropdownItem:function(t){var e=getComputedStyle(this.DOM.originalInput),a=e.getPropertyValue("--item-gap")||".3em",s=e.getPropertyValue("--item-img-size")||"1em",i=e.getPropertyValue("--item-text-color")||"inherit",l=e.getPropertyValue("--item-sec-color")||"inherit",o=e.getPropertyValue("--item-sec-size")||".75em",n=e.getPropertyValue("--item-count-color")||"inherit";return'<div  value="'+t.value+'" class="'+this.settings.classNames.dropdownItem+(t.class?" "+t.class:"")+'" style="display: flex; align-items: center; gap: var(--item-gap, '+a+')" tabindex="0" role="option">'+(t.image?'<img onerror="this.style.visibility=\'hidden\'" src="'+t.image+'" style="height:var(--item-img-size, '+s+');pointer-events:none;">':"")+'<div style="color: var(--item-text-color, '+i+')">'+(t.label||t.value)+(t.secondary?'<br><span style="color: var(--item-sec-color, '+l+"); font-size: "+o+'">'+t.secondary+"</span>":"")+"</div>"+(t.count?' <div style="color:var(--item-count-color, '+n+')"> ('+t.count+")</div>":"")+"</div>"}},render:function(t){if(dmx.Component("form-element").prototype.render.call(this,t),this.$node.form&&this.$node.name){var e=this.$node.name;this.$node.form.addEventListener("formdata",(t=>{var a=t.formData;if("select"!=this.props.mode&&"mix"!=this.props.mode&&(a.delete(e),Array.isArray(this.data.values))){var s=e;/\[\]$/.test(s)||(s+="[]"),this.data.values.forEach((t=>{a.append(s,t)}))}})),this.$node.form.addEventListener("reset",(t=>{this.tagify&&(this.$node.defaultValue?(this.setValue(this.$node.defaultValue),this.tagify.loadOriginalValues(this.$node.defaultValue)):this.tagify.removeAllTags(),this.onchange())}))}this.tagify=new Tagify(this.$node,dmx.extend({enforceWhitelist:this.props.nocustom,whitelist:this.getWhitelist(),blacklist:this.props.blacklist,tagTextProp:"label",delimiters:this.props.delimiters,duplicates:this.props.duplicates,userInput:!this.props.noinput,maxTags:this.props["max-tags"],mode:this.props.mode,trim:!this.props.notrim,keepInvalidTags:this.props["keep-invalid"],skipInvalid:this.props["skip-invalid"],pattern:this.props.pattern&&this.props.pattern.startsWith("/")?new RegExp(this.props.pattern.replace(/^\/|\/$/,"")):this.props.pattern,autoComplete:{enabled:!this.props.noautocomplete,rightKey:!this.props.noautocomplete},dropdown:{enabled:this.props["min-chars"]>=0&&this.props["min-chars"],searchKeys:["label"],caseSensitive:this.props["case-sensitive"],maxItems:this.props["max-items"],fuzzySearch:!this.props["no-fuzzy-search"],accentedSearch:!this.props["no-accented-search"],position:this.props["dropdown-position"],highlightFirst:this.props["highlight-first"],closeOnSelect:!this.props["no-close-on-select"]},originalInputValueFormat:t=>t.map((t=>t.value)).join(this.props.delimiters[0]),transformTag:t=>{delete t.class,delete t.count,delete t.image,delete t.__dmx,delete t.__item;var e=this.getWhitelist().find((e=>e.value==t.value||e.label==t.value));e&&Object.assign(t,e)},templates:this.templates},this.props.settings)),this.props.nocustom&&null==this.props.data?(this.tagify.loading(!0),this.tagify.setDisabled(!0)):this.tagify.loading(this.props.loading),this.tagify.setReadonly(this.props.readonly),this.tagify.on("change",this.onchange.bind(this)),this.tagify.on("change",this.dispatchEvent.bind(this,"change")),this.tagify.on("add",(t=>{this.dispatchEvent("add",null,{item:t.detail.data.__item,value:t.detail.data.value,isCustom:!t.detail.data.__item})})),this.tagify.on("remove",(t=>{this.dispatchEvent("remove",null,{item:t.detail.data.__item,value:t.detail.data.value,isCustom:!t.detail.data.__item})})),this.tagify.on("invalid",(t=>{this.dispatchEvent("invalid",null,{value:t.detail.data.value,message:t.detail.message})})),this.tagify.on("input",(t=>{this.dispatchEvent("input",null,{value:t.detail.value,isValid:t.detail.isValid})})),this.tagify.on("focus",this.dispatchEvent.bind(this,"focus")),this.tagify.on("blur",this.dispatchEvent.bind(this,"blur")),this.tagify.on("dropdown:noMatch",(t=>{this.dispatchEvent("noresults",null,{value:t.detail.value})})),this.update({},new Set(["data","value"]))},update:function(t,e){t.disabled!=this.props.disabled&&this.tagify.setDisabled(this.props.disabled),t.readonly!=this.props.readonly&&this.tagify.setReadonly(this.props.readonly),e.has("data")&&(this.tagify.whitelist=this.getWhitelist(),this.props.nocustom?(this.$node.defaultValue=this.props.value||"",this.setValue(this.props.value),this.tagify.loadOriginalValues(this.props.value),this.onchange(),this.tagify.loading(this.props.loading),this.tagify.setDisabled(this.props.disabled)):(dmx.array(this.tagify.getTagElms()).forEach((t=>{var e=this.tagify.getSetTagData(t);if(!e.__dmx){var a=this.getWhitelist().find((t=>t.value==e.value||t.label==e.value));a&&(Object.assign(e,a),this.tagify.replaceTag(t,e))}}),this),this.onchange())),e.has("value")&&(this.$node.defaultValue=this.props.value||"",this.setValue(this.props.value),this.tagify.loadOriginalValues(this.props.value),this.onchange()),t.loading!=this.props.loading&&this.tagify.loading(this.props.loading),this.updateData()},destroy:function(){this.tagify.destroy()}});
//# sourceMappingURL=../maps/dmxTagify.js.map